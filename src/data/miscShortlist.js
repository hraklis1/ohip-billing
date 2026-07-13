function row(code, value, description, sourceRef, info = {}) {
  return {
    code,
    value,
    description,
    sourceRef: info.sourceRef || sourceRef,
    notes: info.notes,
    paymentRules: info.paymentRules,
    commentary: info.commentary,
    medicalRecordRequirements: info.medicalRecordRequirements,
    claimsSubmissionInstructions: info.claimsSubmissionInstructions,
  };
}

const e023Info = {
  notes: [
    "E023C replaces the listed basic units and time units for anaesthesia for the listed ocular surgery, cystoscopy, and examination under anaesthesia procedures.",
    "Deep sedation, general anaesthesia or regional anaesthesia performed by an anaesthesiologist are examples of anaesthesia that may be rendered for E023C.",
    "Anaesthesia extra units listed on GP97 are eligible for payment with E023C.",
  ],
  paymentRules: [
    "Local infiltration or topical anaesthesia used as an anaesthetic for any procedure is not eligible for payment.",
  ],
};

const e013Info = {
  claimsSubmissionInstructions: [
    "When claims are submitted using E013C, no claims should be submitted using procedural C suffix codes for the same procedure.",
  ],
  notes: [
    "Replacement basic units when anaesthetic management is required for emergency relief of acute upper airway obstruction above the carina, excluding choanal atresia.",
  ],
};

const e003Info = {
  notes: [
    "Supportive care or monitoring includes constant attendance at a surgical procedure for monitoring and immediate availability to provide special supportive care.",
    "It also includes discussion with, and providing advice and information to, the patient or representative by telephone or otherwise about the service and, when appropriate, related results.",
    "The fee is calculated in the same manner as assistant and anaesthesia services.",
  ],
  paymentRules: [
    "For E003B, the assistants' premiums apply as for assistants' services.",
    "Anaesthesia extra units listed on GP97 are not eligible for payment with E003C.",
    "E003B is not eligible for payment for second assistant services.",
  ],
};

const phoneConsultInfo = {
  notes: [
    "Physician to physician telephone consultation - Consultant physician.",
    "User note: use for IV iron coverage in PAC.",
  ],
  paymentRules: [
    "A maximum of one K731 or K735 service is eligible for payment per patient per day.",
    "The service must include a minimum of 10 minutes of patient-related discussion for any given patient.",
    "The referring physician or nurse practitioner and consultant physician must be physically present in Ontario at the time of the service.",
  ],
  medicalRecordRequirements: [
    "The medical record must include the patient name and health number, start and stop times, names of the referring and consultant physicians, reason for consultation, and the consultant's opinion and recommendations.",
  ],
  claimsSubmissionInstructions: [
    "K731 and K735 are only eligible for payment if the consultant physician includes the referring physician's or nurse practitioner's provider number with the claim.",
  ],
};

const j021Info = {
  notes: [
    "By catheterization - abdominal, thoracic, cervical or cranial.",
    "User notes: angiography (not neuro); permanent catheter insertion.",
  ],
  paymentRules: [
    "J021 and J022 are not eligible for payment in addition to cardiac catheterization procedures Z439 to G288.",
  ],
};

const j058Info = {
  notes: [
    "User note: vascular stenting (not neuro).",
  ],
  paymentRules: [
    "J058 claimed for the same patient on the same day as G298 is payable at nil.",
  ],
};

const j007Info = {
  notes: [
    "Schedule description is Tomogram.",
    "User note: CT; E420 not applicable.",
  ],
};

const z437Info = {
  notes: [
    "Maximum of three sessions per patient, per day.",
  ],
};

const z430Info = {
  notes: [
    "Provision of anaesthetic services for patients undergoing magnetic resonance imaging.",
  ],
};

const r520Info = {
  notes: [
    "Schedule anaesthesia units are 15.",
    "User note listed this as mandibular advancement for retrognathia.",
  ],
};

const r433Info = {
  notes: [
    "Schedule description is Temporomandibular joint - unilateral under Arthroplasty.",
    "User note: TMJ arthroscopy code is actually for TMJ arthroplasty.",
  ],
};

export const miscShortlistGroups = [
  {
    title: "Miscellaneous",
    items: [
      row("E023", "6 units", "Anaesthesia service for listed ocular surgery, cystoscopy, and examination under anaesthesia codes", "GP100", e023Info),
      row("Z428", "7 units", "Pacemaker lead extraction, including extraction sheaths, with or without laser or similar technology", "Q4"),
      row("Z437", "6 units", "Cardioversion (electrical and/or chemical)", "J9", z437Info),
      row("Z423", "10 units", "Arrhythmia induction - electrophysiologic pacing, mapping and ablation with advanced mapping system and/or procedure duration over 4 hours", "J12"),
      row("G478", "6 units", "Psychiatry - electroconvulsive therapy (ECT) cerebral - single or multiple - in-patient", "J106"),
      row("J057", "7 units", "Transjugular intrahepatic portosystemic shunt (TIPS)", "E6"),
      row("Z561", "6 units", "Endoscopic retrograde cholangiopancreatography (ERCP) with cannulation of common bile duct and/or pancreatic duct", "S30"),
      row("Z457", "6 units", "Surgical removal or repair of tunneled central venous catheter", "J7"),
      row("Z630", "6 units", "Extracorporeal shock wave lithotripsy", "T2"),
      row("J021", "6 units", "Insertion of catheter, including cut down if necessary, and injection if given", "E2", j021Info),
      row("R852", "6 units", "Insertion of peritoneal cannula by laparotomy or laparoscopy", "J38"),
      row("R885", "6 units", "Removal of peritoneal cannula by laparotomy or laparoscopy", "J38"),
      row("J058", "6 units", "Vascular stenting", "E2", j058Info),
      row("Z430", "6 units", "Provision of anaesthetic services for patients undergoing magnetic resonance imaging", "J6", z430Info),
      row("J007", "7 units", "Tomogram", "E6", j007Info),
      row("E013", "10 units", "Anaesthetic management for emergency relief of acute upper airway obstruction above the carina", "GP99", e013Info),
      row("E003", "4 units", "Supportive care/Monitoring by surgical assistant or anaesthesiologist", "GP102", e003Info),
      row("K731", "$47.75", "Physician to physician telephone consultation - Consultant physician", "A42", phoneConsultInfo),
    ],
  },
  {
    title: "Procurement",
    items: [
      row("S274", "8 units", "Deceased donor, liver removal", "S29"),
      row("S436", "8 units", "Donor nephrectomy - unilateral or bilateral", "T3"),
      row("M157", "8 units", "Donor Heart - Lung removal", "P17/Q8"),
    ],
  },
  {
    title: "Transplant",
    items: [
      row("S294", "30 units", "Deceased donor, liver transplant", "S29"),
      row("S295", "40 units", "Repeat liver transplant", "S29"),
      row("S435", "13 units", "Kidney transplant", "T3"),
      row("R870", "28 units", "Orthotopic cardiac transplantation", "Q8"),
      row("S308", "30 units", "Pancreas transplant", "S32"),
    ],
  },
  {
    title: "Dental",
    items: [
      row("S900", "8 units", "Basic units for anaesthesia with any unlisted dental surgical procedure performed by dental or oral surgeon", "S1"),
      row("S023", "6 units", "Extraction of tooth (complete care) - single", "S1"),
      row("R520", "15 units", "Mandibular osteotomies for retrognathia, any technique - advancement up to 10 mm", "N29", r520Info),
      row("R379", "20 units", "Orthognathic Surgery - LeFort I advancement - in one segment", "N30"),
      row("R389", "20 units", "LeFort II maxillary osteotomy and advancement", "N30"),
      row("S032", "8 units", "Bone graft to palate", "S2"),
      row("Z506", "6 units", "Drainage of oral abscess or haematoma", "S1"),
      row("R433", "10 units", "Temporomandibular joint - unilateral", "N28", r433Info),
    ],
  },
];
