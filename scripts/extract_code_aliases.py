#!/usr/bin/env python3
"""Extract department "common names" from the custom billing-guide workbook and
emit src/data/codeAliases.js — a { appCode: [commonName, ...] } map used to make
the plain-language names (e.g. "TURBT" -> Z632) searchable in the web app.

Re-run this whenever the department updates the billing guide:

    python3 scripts/extract_code_aliases.py [path/to/Billing guide.xlsx]

Uses only the Python standard library (parses the .xlsx zip/XML directly) so no
extra dependency is required.
"""
import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_XLSX = Path.home() / "Downloads" / "Billing guide (April 2026).xlsx"
OUTPUT = ROOT / "src" / "data" / "codeAliases.js"

# Sheets that hold code -> common-name rows (col A = code, col C = common name).
ALIAS_SHEETS = {
    "GenSurg", "Urology", "Ophtho", "Ortho", "ENT", "Spine", "Neuro",
    "Plastics", "Gyne", "Thorax", "Trauma", "CardioVasc", "OB",
    "Misc", "Procedure Fees", "General", "Missed Codes",
}

M = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
CODE_RE = re.compile(r"^[A-Z]\d{3}[A-Z]?$")


def col_row(ref):
    m = re.match(r"([A-Z]+)(\d+)", ref)
    col = 0
    for ch in m.group(1):
        col = col * 26 + (ord(ch) - 64)
    return col, int(m.group(2))


def read_workbook(xlsx_path):
    """Return {sheet_name: {row_index: {col_index: value}}} for alias sheets."""
    z = zipfile.ZipFile(xlsx_path)
    shared = []
    for si in ET.fromstring(z.read("xl/sharedStrings.xml")):
        shared.append("".join(t.text or "" for t in si.iter(M + "t")))
    rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    rid_to_file = {r.get("Id"): r.get("Target") for r in rels}
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    sheets = [(s.get("name"), rid_to_file[s.get(R)]) for s in wb.find(M + "sheets")]

    result = {}
    for name, target in sheets:
        if name not in ALIAS_SHEETS:
            continue
        sheet = ET.fromstring(z.read("xl/" + target))
        rows = {}
        for c in sheet.iter(M + "c"):
            ref, t = c.get("r"), c.get("t")
            v, inline = c.find(M + "v"), c.find(M + "is")
            val = ""
            if t == "s" and v is not None:
                val = shared[int(v.text)]
            elif inline is not None:
                val = "".join(x.text or "" for x in inline.iter(M + "t"))
            elif v is not None:
                val = v.text or ""
            if not val:
                continue
            col, row = col_row(ref)
            rows.setdefault(row, {})[col] = val
        result[name] = rows
    return result


def expand_codes(cell):
    """Split multi-code cells: 'P045/6' -> P045,P046; 'R109 / R108' -> both."""
    cell = cell.strip()
    m = re.match(r"^([A-Z]\d*?)(\d)/(\d+)$", cell)  # e.g. P045/6 -> P045, P046
    if m:
        prefix, last, alt = m.group(1), m.group(2), m.group(3)
        first = prefix + last
        second = prefix + alt if len(alt) == 1 else prefix[0] + alt
        return [c for c in (first, second) if CODE_RE.match(c)]
    out = []
    for part in re.split(r"[\/,]| or | and ", cell):
        part = part.strip()
        if CODE_RE.match(part):
            out.append(part)
    return out


def load_app_codes():
    """Reproduce the app's assembled code set (app.js line ~198) and DB descriptions."""
    db_text = (ROOT / "src" / "data" / "ohipAnesthesiaCodes.js").read_text(encoding="utf-8")
    db_json = json.loads(db_text[db_text.index("{"):db_text.rindex("}") + 1])
    db_codes = set()
    descriptions = {}
    for entry in db_json["codes"]:
        db_codes.add(entry["code"])
        # keep the first description seen per code for duplicate filtering
        descriptions.setdefault(entry["code"], entry.get("description", ""))

    shortlist_codes = set()
    for fname in ("procedureFees.js", "generalShortlist.js", "miscShortlist.js"):
        text = (ROOT / "src" / "data" / fname).read_text(encoding="utf-8")
        shortlist_codes.update(re.findall(r'row\(\s*"([A-Z0-9]+)"', text))

    return db_codes, shortlist_codes, descriptions


def resolve(code, app_codes):
    """Match a workbook code to an app code, handling the anesthesia 'C' suffix."""
    if code in app_codes:
        return code
    if code + "C" in app_codes:
        return code + "C"
    if code.endswith("C") and code[:-1] in app_codes:
        return code[:-1]
    return None


def main():
    xlsx_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_XLSX
    if not xlsx_path.exists():
        sys.exit(f"Workbook not found: {xlsx_path}")

    db_codes, shortlist_codes, descriptions = load_app_codes()
    app_codes = db_codes | shortlist_codes

    sheets = read_workbook(xlsx_path)
    alias_map = {}          # resolved app code -> {common name}
    unmatched = []          # (sheet, code, name)
    total_pairs = 0

    for sheet, rows in sheets.items():
        for r in sorted(rows):
            cells = rows[r]
            raw_code = cells.get(1, "").strip()
            name = cells.get(3, "").strip()
            if not raw_code or not name:
                continue
            codes = expand_codes(raw_code)
            if not codes:
                continue
            for code in codes:
                total_pairs += 1
                resolved = resolve(code, app_codes)
                if not resolved:
                    unmatched.append((sheet, code, name))
                    continue
                # Skip names that merely restate the official description verbatim.
                if name.strip().lower() == descriptions.get(resolved, "").strip().lower():
                    continue
                alias_map.setdefault(resolved, set()).add(name)

    payload = {code: sorted(names) for code, names in sorted(alias_map.items())}

    OUTPUT.write_text(
        "// Generated by scripts/extract_code_aliases.py — do not edit by hand.\n"
        "// Department common names for OHIP codes, made searchable in the app.\n"
        "export const codeAliases = "
        + json.dumps(payload, indent=2, ensure_ascii=True)
        + ";\n",
        encoding="utf-8",
    )

    print(f"Read {total_pairs} code/name pairs from {len(sheets)} sheets.")
    print(f"Wrote {len(payload)} codes with aliases to {OUTPUT}.")
    if unmatched:
        print(f"\n{len(unmatched)} workbook codes have no matching app code (skipped):")
        for sheet, code, name in unmatched:
            print(f"  {sheet:14} {code:6} {name[:50]}")


if __name__ == "__main__":
    main()
