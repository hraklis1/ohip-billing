#!/usr/bin/env python3
import json
import re
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PDF = Path("/Users/takis/Downloads/moh-schedule-benefit-2026-03-27 (3).pdf")
OUTPUT = ROOT / "src" / "data" / "ohipAnesthesiaCodes.js"

CODE_RE = re.compile(r"^(?:#|\+)?\s*([A-Z]{1,3}\d{3}[A-Z]?)\s+(.*)")
FEE_RE = re.compile(r"(\d{1,4}(?:,\d{3})*\.\d{2})")
TRAILING_UNITS_RE = re.compile(r"(?:^|\s)(\d{1,2})\s*$")
REF_RE = re.compile(r"\b(GP|SP|AH|A|B|C|D|E|F|G|H|J|K|M|N|P|Q|R|S|T|U|V|W|X|Y|Z|AA|AB|AC|AD|AF|AG|AJ|AQ|NI)\d{1,3}\b")

STOP_PREFIXES = (
    "Note:",
    "Payment rules:",
    "Claims submission instructions:",
    "Medical record requirements:",
    "[Commentary",
    "Amd ",
    "March ",
)

COLUMN_HEADERS = {
    "Asst Surg Anae",
    "Fee Anae",
    "Fee",
    "SPECIFIC ELEMENTS",
    "PREAMBLE",
}

DEPENDENT_STARTS = {
    "by",
    "from",
    "into",
    "under",
    "with",
    "without",
}

MANUAL_CODES = [
    ("E400C", "Evenings (17:00h-24:00h) Monday to Friday or daytime/evenings on Saturdays, Sundays or Holidays - increase total anaesthetic fee", "General Preamble", "Anaesthesiologists' Services - after hours premiums", "premium_percent", None, "50%", "GP94"),
    ("E401C", "Nights (00:00h-07:00h) - increase total anaesthetic fee", "General Preamble", "Anaesthesiologists' Services - after hours premiums", "premium_percent", None, "75%", "GP94"),
    ("C998C", "Anaesthesia special visit premium - evenings weekdays or non-elective surgery with sacrifice of office hours", "General Preamble", "Anaesthesiologists' Services - special visit premiums", "fee", None, "60.00", "GP94"),
    ("C985C", "Anaesthesia special visit premium - Saturdays, Sundays or Holidays daytime and evenings", "General Preamble", "Anaesthesiologists' Services - special visit premiums", "fee", None, "75.00", "GP94"),
    ("C999C", "Anaesthesia special visit premium - nights", "General Preamble", "Anaesthesiologists' Services - special visit premiums", "fee", None, "100.00", "GP94"),
    ("E006C", "Anaesthetic begun but operation cancelled before surgery commences", "General Preamble", "Anaesthesiologists' Services - cancelled surgery", "base_units", 6, None, "GP95"),
    ("E001C", "Second anaesthesiologist when necessary in the interest of the patient", "General Preamble", "Anaesthesiologists' Services - second anaesthesiologist", "base_units", 6, None, "GP95"),
    ("E005C", "Replacement anaesthesiologist during a surgical procedure or delivery", "General Preamble", "Anaesthesiologists' Services - replacement anaesthesiologist", "base_units", 6, None, "GP95"),
    ("E021C", "Extra units - premature newborn less than 37 weeks gestational age", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 9, None, "GP97"),
    ("E014C", "Extra units - newborn to 28 days", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 5, None, "GP97"),
    ("E009C", "Extra units - infant from 29 days to 1 year of age", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 4, None, "GP97"),
    ("E019C", "Extra units - infant or child from 1 year to 8 years inclusive", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 2, None, "GP97"),
    ("E007C", "Extra units - adult aged 70 to 79 years inclusive", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 1, None, "GP97"),
    ("E018C", "Extra units - adult aged 80 years and older", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 3, None, "GP97"),
    ("E010C", "Extra units - patient with body mass index greater than 40", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 2, None, "GP97"),
    ("E011C", "Extra units - patient in prone position during surgery", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 4, None, "GP97"),
    ("E024C", "Extra units - patient in sitting position during surgery, greater than 60 degrees upright", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 4, None, "GP97"),
    ("E025C", "Extra units - unanticipated massive transfusion", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 10, None, "GP97"),
    ("E012C", "Extra units - malignant hyperthermia susceptibility requiring full setup and management", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 5, None, "GP97"),
    ("E022C", "Extra units - ASA III severe systemic disease limiting activity but not incapacitating", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 2, None, "GP97"),
    ("E017C", "Extra units - ASA IV incapacitating systemic disease that is a constant threat to life", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 10, None, "GP97"),
    ("E016C", "Extra units - ASA V moribund patient not expected to live 24 hours with or without operation", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 20, None, "GP97"),
    ("E020C", "Extra units - ASA E emergency surgery commencing within 24 hours of OR booking, with ASA III/IV/V", "General Preamble", "Anaesthesiologists' Services - extra units", "base_units", 4, None, "GP97"),
    ("E002C", "Replacement basic units - hypothermia used by anaesthesiologist where not specifically identified", "General Preamble", "Anaesthesiologists' Services - replacement of listed basic units", "base_units", 25, None, "GP99"),
    ("E013C", "Replacement basic units - emergency relief of acute upper airway obstruction above the carina", "General Preamble", "Anaesthesiologists' Services - replacement of listed basic units", "base_units", 10, None, "GP99"),
    ("E030C", "Anaesthesia for nerve block procedures - procedural sedation", "General Preamble", "Anaesthesiologists' Services - nerve block support", "base_units", 4, None, "GP99"),
    ("E031C", "Anaesthesia for nerve block procedures - general anaesthesia or deep sedation", "General Preamble", "Anaesthesiologists' Services - nerve block support", "base_units", 4, None, "GP99"),
    ("E023C", "Anaesthesia service for specified ocular surgery, cystoscopy, and examination under anaesthesia codes", "General Preamble", "Anaesthesiologists' Services - replaced basic units", "base_units", 6, None, "GP100"),
    ("E032C", "Anaesthesia service for specified colonoscopy and sigmoidoscopy codes", "General Preamble", "Anaesthesiologists' Services - replaced basic units", "base_units", 4, None, "GP100"),
    ("E003", "Supportive care/Monitoring by surgical assistant or anaesthesiologist", "General Preamble", "Supportive care/monitoring by surgical assistant or anaesthesiologist", "base_units", 4, None, "GP102"),
    ("C101", "For each patient seen on a visit to ICU or CCU", "General Preamble", "Other premiums - intensive or coronary care unit premium", "fee", None, "9.10", "GP103"),
    ("E402", "After-hours premium for management and supervision of continuous catheter infusions for analgesia - evenings/weekend/holiday", "General Preamble", "Other premiums - continuous catheter analgesia", "premium_percent", None, "40%", "GP107"),
    ("E403", "After-hours premium for management and supervision of continuous catheter infusions for analgesia - nights", "General Preamble", "Other premiums - continuous catheter analgesia", "premium_percent", None, "50%", "GP107"),
    ("E420", "Trauma premium (base + time units ONLY)", "General Preamble", "Other premiums - trauma premium", "premium_percent", None, "50%", "GP109"),
]

MANUAL_CODE_INFO = {
    "E003": {
        "paymentRules": [
            "For E003B, the assistants' premiums apply as for assistants' services.",
            "Anaesthesia extra units listed on GP97 are not eligible for payment with E003C.",
            "E003B is not eligible for payment for second assistant services.",
        ],
    },
    "C101": {
        "paymentRules": [
            "C101 is not eligible for payment with Supportive Care or with Critical Care, Ventilatory Care, Comprehensive Care, Acquired Brain Injury Management or Neonatal Intensive Care where team fees are claimed.",
        ],
        "commentary": [
            "C101 is also payable alone when no other separate fee is payable for the service provided in the ICU or CCU.",
        ],
    },
    "E420": {
        "notes": [
            "The trauma premium is payable when the service is rendered either on the day of the trauma or within 24 hours of the trauma, and for trauma patients age 16 or more who have an Injury Severity Score (ISS) greater than 15, or patients less than age 16 who have an ISS greater than 12.",
        ],
        "paymentRules": [
            "The premium is applicable to services listed in the Consultation and Visits section, Obstetrics section, Surgical Procedures section, specified resuscitative services, and basic and time units provided by surgical assistants or anaesthesiologists.",
            "The premium is payable only for the services for which the medical record lists the ISS score.",
        ],
        "claimsSubmissionInstructions": [
            "For claims payment purposes, the trauma premium and associated services must be submitted on the same claim record.",
        ],
        "commentary": [
            "Other special visit and after hours premiums are payable with services eligible for the trauma premium in accordance with the Schedule. However, the trauma premium is not applicable to these services.",
        ],
    },
}

NERVE_BLOCK_PAYMENT_INFO = {
    "G260": {
        "paymentRules": [
            "The G260 service is a block of one of the following: brachial plexus, lumbar plexus, sacral plexus, deep cervical plexus, or a combined 3-in-1 block which must include the femoral, obturator and lateral femoral cutaneous nerves.",
            "When a major plexus block is rendered, additional blocks of one or more nerves within the same nerve distribution are not eligible for payment.",
            "When 2 or more nerve blocks of major and/or minor peripheral nerves that are within the distribution of a major plexus are rendered individually, only G260 is eligible for payment.",
        ],
        "commentary": [
            "If a peripheral nerve block is performed that is not within the same nerve distribution of a major plexus block, then both blocks are eligible for payment. For example, a sciatic nerve block performed in addition to a combined 3-in-1 block.",
            "For example, if radial, median and ulnar nerve blocks are performed individually, only the brachial plexus block (i.e. major plexus block) is eligible for payment. If femoral, obturator and lateral femoral cutaneous blocks are performed individually, only the combined 3-in-1 (i.e. major plexus) block is eligible for payment.",
        ],
    },
    "G060": {
        "paymentRules": [
            "The G060 service must consist of one of the following: (a) a block of one of: radial, median, ulnar, musculocutaneous, femoral, sciatic, common peroneal and/or tibial, obturator, suprascapular, pudendal (uni or bilateral), trigeminal or facial nerve; (b) a paravertebral block - first injection only; (c) an ankle block (must include 2 or more of the following: deep peroneal, superficial peroneal, posterior tibial, saphenous or sural nerve); or (d) a fascia iliaca block.",
            "G060 is limited to a maximum of 4 services per patient per physician per day.",
            "When a major peripheral nerve block is rendered, additional blocks of one or more nerves within the same nerve distribution are not eligible for payment.",
        ],
    },
    "G061": {
        "paymentRules": [
            "The G061 service must consist of one of the following: (a) a block of one of: ilioinguinal and/or iliohypogastric, genitofemoral, lateral femoral cutaneous, saphenous, occipital, supraorbital, infraorbital or glossopharyngeal nerve; (b) an intercostal block; (c) a superficial cervical plexus block; (d) a transversus abdominis plane (TAP) block; or (e) a paravertebral block - additional injection.",
            "G061 is limited to a maximum of 4 services per patient per physician per day.",
            "When a minor peripheral nerve block is rendered, additional blocks of one or more nerves within the same nerve distribution are not eligible for payment.",
        ],
    },
    "G279": {
        "paymentRules": [
            "G279 is eligible for payment in addition to the applicable peripheral nerve or plexus block.",
            "G260 is not eligible for payment in addition to G279 when rendered for a continuous combined 3-in-1 block; G060 is eligible for payment in addition to G279 in this circumstance.",
            "No guidance (e.g. nerve stimulation, ultrasound) used for percutaneous nerve block catheter insertion is eligible for payment.",
        ],
    },
    "G247": {
        "paymentRules": [
            "G247 is only eligible for payment to the physician most responsible, or to a physician substituting for the physician most responsible, for providing management and supervision of a: (1) continuous catheter infusion for analgesia for a hospital in-patient; or (2) lumbar sub-arachnoid drainage catheter placed in association with a surgical procedure where there is increased risk of spinal cord ischemia.",
        ],
        "commentary": [
            "G247 is not for visits to patients solely receiving intravenous pain management, such as patient controlled analgesia alone; a continuous nerve/plexus block or epidural/spinal catheter must be present for G247 to be payable.",
        ],
    },
    "G064": {
        "paymentRules": [
            "G064 is only eligible for payment when: (a) rendered by the physician most responsible for the patient's care or by a physician substituting for that physician (the \"substitute physician\"); and (b) the clinical decision(s) pertaining to the medical advice, direction or information provided is formulated personally by the physician or substitute physician.",
            "G064 is only eligible for payment for a day when one or more components of element C are rendered in that day.",
            "G064 rendered on the same day as a consultation or visit by the same physician is not eligible for payment.",
            "G064 is limited to a maximum of 7 services per patient per G279 service.",
        ],
        "medicalRecordRequirements": [
            "A dated summary of each contact must be recorded in the patient's permanent medical record or the service is not eligible for payment.",
        ],
    },
}


def clean_description(text):
    text = re.sub(r"\s+\d{1,2}\s*[-–]?\s*$", "", text.strip())
    text = re.sub(r"\.{3,}", " ", text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s+\d{1,2}\s*[-–]?\s*$", "", text)
    text = text.strip(" .-")
    if text.startswith("- "):
        text = text[2:].strip()
    return text


def clean_heading(text):
    heading = clean_description(text)
    if heading.isupper():
        heading = heading.title()
    return heading


def source_ref(lines):
    footer = " ".join(lines[-3:])
    refs = list(re.finditer(REF_RE, footer))
    return refs[-1].group(0) if refs else ""


def page_headings(lines):
    primary = lines[0].title()
    subcategory = "Other"
    for line in lines[1:10]:
        if line in ("Asst Surg Anae", "Fee Anae", "Fee", "SPECIFIC ELEMENTS", "PREAMBLE"):
            continue
        if line.startswith("March ") or line.startswith("Amd "):
            continue
        if line.isupper():
            subcategory = line.title()
            break
    return primary, subcategory


def is_context_heading(line, primary, subcategory):
    if not line or line in COLUMN_HEADERS:
        return False
    if line[0].islower():
        return False
    if any(line.startswith(prefix) for prefix in STOP_PREFIXES):
        return False
    if CODE_RE.match(line):
        return False
    if line.startswith("[") or line.startswith("("):
        return False
    if "March " in line or "effective" in line or "Amd " in line:
        return False
    if "...." in line or FEE_RE.search(line) or REF_RE.search(line):
        return False

    heading = clean_heading(line)
    if not heading or heading in {primary, subcategory}:
        return False
    if len(heading) > 125 or heading.endswith((".", ";", ":")):
        return False
    if re.match(r"^\d+[\.\)]", heading):
        return False

    words = heading.split()
    if len(words) > 12:
        return False
    lower = heading.lower()
    sentence_terms = (" payable", " eligible", " include", " includes", " rendered", " patient", " physician", " maximum")
    if any(term in lower for term in sentence_terms):
        return False

    return any(char.isalpha() for char in heading)


def active_has_terminal_value(active):
    text = " ".join(active)
    if TRAILING_UNITS_RE.search(text):
        return bool(FEE_RE.search(text) or re.search(r"\bI\.?C\.?\s+\d{1,2}\s*$", text, flags=re.IGNORECASE))
    return bool(FEE_RE.search(text) and re.search(r"\badd\s+\d{1,4}(?:,\d{3})*\.\d{2}\s*$", text, flags=re.IGNORECASE))


def strip_non_anesthesia_columns(text):
    text = re.sub(r"\s+(?:\d{1,2}\s+)?I\.?C\.?\s*$", "", text, flags=re.IGNORECASE)
    return text


def append_context(context, heading):
    if context and context[-1] == heading:
        return context
    return (context + [heading])[-3:]


def row_blocks(lines, primary, subcategory):
    blocks = []
    active = None
    active_context = []
    active_context_index = -1
    active_start_index = -1
    context = []
    context_index = -1

    for index, line in enumerate(lines):
        if any(line.startswith(prefix) for prefix in STOP_PREFIXES):
            if active:
                blocks.append((active, active_context, active_context_index, active_start_index))
            active = None
            continue
        match = CODE_RE.match(line)
        if match:
            if active:
                blocks.append((active, active_context, active_context_index, active_start_index))
            active = [line]
            active_context = list(context)
            active_context_index = context_index
            active_start_index = index
            continue
        if active:
            if active_has_terminal_value(active):
                blocks.append((active, active_context, active_context_index, active_start_index))
                active = None
                if is_context_heading(line, primary, subcategory):
                    heading = clean_heading(line)
                    context = append_context(context, heading)
                    context_index = index
                continue
            if is_context_heading(line, primary, subcategory):
                blocks.append((active, active_context, active_context_index, active_start_index))
                active = None
                heading = clean_heading(line)
                context = []
                context = append_context(context, heading)
                context_index = index
            else:
                active.append(line)
            continue

        if is_context_heading(line, primary, subcategory):
            heading = clean_heading(line)
            if line.isupper():
                context = []
            context = append_context(context, heading)
            context_index = index

    if active:
        blocks.append((active, active_context, active_context_index, active_start_index))
    return blocks


DANGLING_END_WORDS = {
    "or", "and", "of", "the", "with", "to", "including", "may", "for",
}


def display_context(context, description):
    if not context:
        return None
    heading = clean_heading(context[-1])
    if not heading:
        return None
    if heading.lower() in description.lower():
        return None
    if heading.startswith(("See ", "For ")) or " see " in heading.lower():
        return None
    if heading.endswith((",", "-", "/")):
        return None
    if ". " in heading:
        return None
    if heading.count("(") != heading.count(")"):
        return None
    last_word = re.sub(r"[^A-Za-z]", "", heading.split()[-1]).lower()
    if last_word in DANGLING_END_WORDS:
        return None
    return heading


def is_context_dependent(description, rest):
    if rest.lstrip().startswith("-"):
        return True
    first_word = re.sub(r"[^A-Za-z-]", "", description.split(" ", 1)[0]).lower()
    return first_word in DEPENDENT_STARTS


def add_context(description, rest, context, parent_description, context_is_fresh):
    if not is_context_dependent(description, rest):
        return description

    prefixes = []
    if context and context_is_fresh:
        prefixes = context[-2:]
    elif parent_description:
        prefixes = [parent_description]
    elif context:
        prefixes = context[-2:]

    cleaned_prefixes = []
    for prefix in prefixes:
        prefix = clean_heading(prefix)
        if not prefix:
            continue
        if prefix.lower() in description.lower():
            continue
        cleaned_prefixes.append(prefix)

    if not cleaned_prefixes:
        return description
    return " - ".join(cleaned_prefixes + [description])


def parse_block(block, primary, subcategory, pdf_page, ref, context=None, parent_description=None, context_is_fresh=False, fee_only=False):
    text = " ".join(block)
    match = CODE_RE.match(text)
    if not match:
        return None

    code = match.group(1)
    rest = match.group(2)
    units_match = TRAILING_UNITS_RE.search(rest)
    fee_matches = list(FEE_RE.finditer(rest))

    if units_match:
        base_units = int(units_match.group(1))
        cut = fee_matches[-1].start() if fee_matches else units_match.start()
        description = clean_description(strip_non_anesthesia_columns(rest[:cut]))
        description = add_context(description, rest, context or [], parent_description, context_is_fresh)
        row = {
            "code": code,
            "description": description,
            "category": primary,
            "subcategory": subcategory,
            "valueType": "base_units",
            "baseUnits": base_units,
            "fee": None,
            "sourceRef": ref,
            "pdfPage": pdf_page,
        }
        heading = display_context(context, description)
        if heading:
            row["context"] = heading
        return row

    if fee_only and fee_matches:
        fee = fee_matches[-1].group(1).replace(",", "")
        description = clean_description(rest[: fee_matches[-1].start()])
        description = add_context(description, rest, context or [], parent_description, context_is_fresh)
        row = {
            "code": code,
            "description": description,
            "category": primary,
            "subcategory": subcategory,
            "valueType": "fee",
            "baseUnits": None,
            "fee": fee,
            "sourceRef": ref,
            "pdfPage": pdf_page,
        }
        heading = display_context(context, description)
        if heading:
            row["context"] = heading
        return row

    return None


def extract_rows(pdf_path):
    rows = []
    with pdfplumber.open(pdf_path) as pdf:
        for page_index in range(419, 804):
            page = pdf.pages[page_index]
            text = page.extract_text(x_tolerance=1, y_tolerance=3) or ""
            lines = [line.strip() for line in text.splitlines() if line.strip()]
            if not lines or "TABLE OF CONTENTS" in lines[0]:
                continue
            primary, subcategory = page_headings(lines)
            ref = source_ref(lines)
            fee_only = (
                (primary == "Diagnostic And Therapeutic Procedures" and subcategory in {"Anaesthesia", "Cardiovascular", "Nerve Blocks For Acute Pain Management"})
                or (primary == "Consultations And Visits" and "Anaesthesia" in subcategory)
            )
            last_independent_description = None
            last_independent_index = -1
            for block, context, context_index, block_index in row_blocks(lines, primary, subcategory):
                context_is_fresh = context_index > last_independent_index
                parsed = parse_block(
                    block,
                    primary,
                    subcategory,
                    page_index + 1,
                    ref,
                    context=context,
                    parent_description=last_independent_description,
                    context_is_fresh=context_is_fresh,
                    fee_only=fee_only,
                )
                if parsed:
                    rows.append(parsed)
                    text = " ".join(block)
                    rest_match = CODE_RE.match(text)
                    rest = rest_match.group(2) if rest_match else ""
                    if not is_context_dependent(parsed["description"], rest):
                        last_independent_description = parsed["description"]
                        last_independent_index = block_index

    for code, desc, category, subcategory, value_type, units, fee, ref in MANUAL_CODES:
        rows.append({
            "code": code,
            "description": desc,
            "category": category,
            "subcategory": subcategory,
            "valueType": value_type,
            "baseUnits": units,
            "fee": fee,
            "sourceRef": ref,
            "pdfPage": None,
        })

    for row in rows:
        if row["subcategory"] == "Nerve Blocks For Acute Pain Management" and row["code"] in NERVE_BLOCK_PAYMENT_INFO:
            row.update(NERVE_BLOCK_PAYMENT_INFO[row["code"]])
        if row["code"] in MANUAL_CODE_INFO:
            row.update(MANUAL_CODE_INFO[row["code"]])

    seen = set()
    deduped = []
    for row in rows:
        key = (row["code"], row["description"], row["category"], row["subcategory"], row["valueType"], row.get("baseUnits"), row.get("fee"))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(row)

    return sorted(deduped, key=lambda item: (item["category"], item["subcategory"], item["code"], item["description"]))


def main():
    pdf_path = DEFAULT_PDF
    rows = extract_rows(pdf_path)
    payload = {
        "metadata": {
            "source": pdf_path.name,
            "effectiveDate": "March 9, 2026 (effective April 1, 2026)",
            "generatedFrom": "OHIP Schedule of Benefits PDF",
            "rowCount": len(rows),
        },
        "codes": rows,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        "export const ohipAnesthesiaData = "
        + json.dumps(payload, indent=2, ensure_ascii=True)
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(rows)} rows to {OUTPUT}")


if __name__ == "__main__":
    main()
