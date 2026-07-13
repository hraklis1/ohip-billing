# OHIP Anesthesia Code Lookup

Static web applet for looking up anesthesia-related OHIP Schedule of Benefits listings.

## Run

```bash
python3 -m http.server 3001
```

Then open `http://localhost:3001`.

## Regenerate Data

The extractor expects the schedule PDF at:

```text
/Users/takis/Downloads/moh-schedule-benefit-2026-03-27 (3).pdf
```

Run:

```bash
npm run extract
```
