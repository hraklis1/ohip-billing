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

const procedurePremiumInfo = {
  notes: [
    "For physicians other than Emergency Department Physicians.",
    "Applies to eligible non-elective procedures, delayed elective procedures, and listed major invasive procedures when the procedure commences during the listed after-hours period.",
  ],
  paymentRules: [
    "E409/E410 is not payable for a procedure rendered by an Emergency Department Physician.",
    "E412/E413 is only payable for a procedure rendered by an Emergency Department Physician who is required to submit claims using H-prefix emergency services.",
  ],
  sourceRef: "GP104",
};

const nerveBlockSedationInfo = {
  notes: [
    "Anaesthesia service in support of services performed by another physician listed in the nerve block sections of the Schedule.",
    "Extra units listed on GP97 are not payable with E030C.",
  ],
  commentary: [
    "Z432C is not eligible for payment for an anaesthesia service in support of a nerve block.",
  ],
  sourceRef: "GP99",
};

const g260Info = {
  paymentRules: [
    "The G260 service is a block of one of the following: brachial plexus, lumbar plexus, sacral plexus, deep cervical plexus, or a combined 3-in-1 block which must include the femoral, obturator and lateral femoral cutaneous nerves.",
    "When a major plexus block is rendered, additional blocks of one or more nerves within the same nerve distribution are not eligible for payment.",
    "When 2 or more nerve blocks of major and/or minor peripheral nerves that are within the distribution of a major plexus are rendered individually, only G260 is eligible for payment.",
  ],
  commentary: [
    "If a peripheral nerve block is performed that is not within the same nerve distribution of a major plexus block, then both blocks are eligible for payment.",
  ],
};

const g060Info = {
  paymentRules: [
    "The G060 service must consist of a listed major peripheral nerve block, paravertebral block first injection, ankle block, or fascia iliaca block.",
    "G060 is limited to a maximum of 4 services per patient per physician per day.",
    "When a major peripheral nerve block is rendered, additional blocks of one or more nerves within the same nerve distribution are not eligible for payment.",
  ],
  notes: [
    "Schedule examples include radial, median, ulnar, musculocutaneous, femoral, sciatic, common peroneal and/or tibial, obturator, suprascapular, pudendal, trigeminal or facial nerve.",
  ],
};

const g061Info = {
  paymentRules: [
    "The G061 service must consist of a listed minor peripheral nerve block, intercostal block, superficial cervical plexus block, transversus abdominis plane block, or paravertebral block additional injection.",
    "G061 is limited to a maximum of 4 services per patient per physician per day.",
    "When a minor peripheral nerve block is rendered, additional blocks of one or more nerves within the same nerve distribution are not eligible for payment.",
  ],
  notes: [
    "Schedule examples include ilioinguinal and/or iliohypogastric, genitofemoral, lateral femoral cutaneous, saphenous, occipital, supraorbital, infraorbital or glossopharyngeal nerve.",
  ],
};

const g279Info = {
  paymentRules: [
    "G279 is eligible for payment in addition to the applicable peripheral nerve or plexus block.",
    "G260 is not eligible for payment in addition to G279 when rendered for a continuous combined 3-in-1 block; G060 is eligible for payment in addition to G279 in this circumstance.",
    "No guidance such as nerve stimulation or ultrasound used for percutaneous nerve block catheter insertion is eligible for payment.",
  ],
};

const premiumEligibleInfo = {
  notes: [
    "E409/E410 procedural premiums apply when the Schedule conditions for eligible after-hours procedures are met.",
  ],
  sourceRef: "GP104",
};

const g268Info = {
  ...premiumEligibleInfo,
  paymentRules: [
    "G268 is not eligible for payment with G249, G259, G261, G176, G177, G178, G288, Z443 or Z440.",
  ],
};

const g269Info = {
  ...premiumEligibleInfo,
  notes: [
    ...premiumEligibleInfo.notes,
    "Not to be billed with right heart catheterization (Z439) or with Swan-Ganz catheter insertion.",
  ],
};

const swanGanzInfo = {
  notes: [
    "Anaesthesia basic units: 6.",
    "Swan-Ganz catheter insertion is included in the anaesthesia basic units of any surgical service where anaesthesia basic units are listed.",
    "User note: after-hours procedural premiums apply.",
  ],
  commentary: [
    "Z438 includes dye dilution densitometry and/or thermal dilution studies when rendered, except in a cardiac catheterization laboratory.",
  ],
  sourceRef: "J7",
};

const g489Info = {
  notes: [
    "Not insured when rendered for monitoring adverse effects from a calorie restricted weight loss program.",
  ],
};

const z459Info = {
  notes: [
    "User note: can bill multiple.",
    "User note: eligible for the E400/E401 after-hours anaesthesia premiums.",
  ],
};

const g256Info = {
  notes: [
    "User note: per side.",
  ],
};

const z327Info = {
  notes: [
    "Anaesthesia basic units: 6.",
    "Surgical assistant column lists nil.",
  ],
  sourceRef: "P9",
};

const z944Info = {
  notes: [
    "Lumbar sub-arachnoid drainage of CSF.",
  ],
  sourceRef: "Z15",
};

const completeEchoInfo = {
  medicalRecordRequirements: [
    "Required components and findings of a complete study must be documented.",
    "There must be a permanent recording on appropriate dynamic medium of the constituent images and measurements.",
    "If applicable, document why circumstances beyond the physician's control prevented one or more components from being rendered.",
  ],
  commentary: [
    "If a single component of cardiac structure and function is imaged, see focused study codes G574/G575.",
  ],
};

const focusedEchoInfo = {
  notes: [
    "Focused Study - examination limited to a single component of the cardiac assessment.",
  ],
  medicalRecordRequirements: [
    "The component of the cardiac assessment and findings must be documented.",
    "There must be a permanent recording on appropriate dynamic medium of the constituent images and measurements.",
  ],
};

const teeInfo = {
  notes: [
    "Transoesophageal echocardiography.",
  ],
};

const lifeThreateningCriticalCareInfo = {
  notes: [
    "Life Threatening Critical Care: critical illness or injury acutely impairing one or more vital organ systems causing vital organ system failure, where imminent life-threatening deterioration is highly probable.",
  ],
  paymentRules: [
    "The time unit is physician time spent fully devoted to the care of the patient and excludes time spent on separately billable interventions.",
    "During reported time for these codes, the physician cannot provide services to other patients.",
    "G521, G522, G523, or G391 are not eligible for payment with A384 or K181.",
  ],
  commentary: [
    "Examples include central nervous system failure, circulatory failure, shock, renal, hepatic, metabolic and/or respiratory failure.",
    "Intravenous lines, arterial/venous catheters, CVP lines, endotracheal intubation, blood gases, nasogastric intubation, urinary catheters, defibrillation and cardioversion are not separately payable to the same physician on the same day as life-threatening critical care.",
  ],
  medicalRecordRequirements: [
    "Start and stop times must be recorded in the patient's permanent medical record.",
  ],
  sourceRef: "J26",
};

const otherCriticalCareInfo = {
  notes: [
    "Other Critical Care: resuscitation assessment and procedures in an emergency other than life-threatening critical care, where there is a potential threat to life or limb.",
  ],
  paymentRules: [
    "G395 is not eligible for payment with G521, G522 or G523 for services rendered to the same patient by the same physician on the same day.",
    "The time unit is physician time spent fully devoted to the care of the patient and excludes time spent on separately billable interventions.",
    "During reported time for these codes, the physician cannot provide services to other patients.",
  ],
  commentary: [
    "Intravenous lines, arterial/venous catheters, CVP lines, endotracheal intubation, blood gases, nasogastric intubation and urinary catheters are not separately payable to the same physician on the same day as other critical care.",
  ],
  sourceRef: "J28",
};

export const procedureFeeGroups = [
  {
    title: "Premiums",
    items: [
      row("E409", "50%", "Evenings (17:00h - 24:00h) Monday to Friday or daytime/evenings on Saturdays, Sundays or Holidays - increase the procedural fee(s) by", "GP104", procedurePremiumInfo),
      row("E410", "75%", "Nights (00:00h - 07:00h) - increase the procedural fee(s) by", "GP104", procedurePremiumInfo),
    ],
  },
  {
    title: "Nerve Blocks",
    items: [
      row("E030", "4 units", "Procedural sedation for anaesthesia service in support of nerve block procedures", "GP99", nerveBlockSedationInfo),
      row("G125", "$100.00", "Caudal/lumbar epidural with catheter", "J71"),
      row("G118", "$130.00", "Thoracic epidural with catheter", "J71"),
      row("G260", "$80.00", "Major plexus block", "J71", g260Info),
      row("G060", "$55.00", "Peripheral nerve block, major", "J71", g060Info),
      row("G061", "$30.00", "Peripheral nerve block, minor", "J72", g061Info),
      row("G279", "$80.00", "Percutaneous nerve block catheter insertion", "J72", g279Info),
      row("G068", "$125.00", "Epidural blood patch", "J72"),
      row("G065", "$62.50", "Epidural blood patch injected through existing epidural catheter", "J72"),
    ],
  },
  {
    title: "Other",
    items: [
      row("G268", "$31.25", "Cannulation of artery for pressure measurements including cut down as necessary", "J7", g268Info),
      row("G269", "$31.25", "Cannulation of central vein for pressure measurements or for feeding line", "J7", g269Info),
      row("Z438", "$162.50", "Insertion of Swan-Ganz catheter (not included in respiratory or critical care benefits)", "J7", swanGanzInfo),
      row("G489", "$3.54", "Venipuncture - adolescent or adult", "J7", g489Info),
      row("G322", "$9.60", "Nasogastric intubation under general anaesthesia", "J45", premiumEligibleInfo),
      row("G256", "$34.10", "Superior laryngeal nerve", "J82", g256Info),
      row("Z327", "$124.90", "Bronchoscopy - flexible or rigid, with or without bronchial biopsy, suction or injection of contrast material", "P9", z327Info),
      row("Z342", "$112.55", "Limited bronchoscopy with placement of endobronchial blocker and/or double lumen tube", "P10"),
      row("Z459", "$10.20", "Arterial puncture", "J7", z459Info),
      row("Z944", "$89.75", "Lumbar sub-arachnoid drainage of CSF", "Z15", z944Info),
      row("G580", "$45.00", "Insertion of oesophageal transducer", "J25", teeInfo),
      row("G581", "$25.00", "Transoesophageal echocardiography - professional component", "J24", teeInfo),
      row("G570", "$130.80", "Complete echocardiography study - technical component", "J21", completeEchoInfo),
      row("G571", "$96.20", "Complete echocardiography study - professional component", "J21", completeEchoInfo),
      row("G574", "$18.65", "Focused echocardiography study - technical component", "J23", focusedEchoInfo),
      row("G575", "$13.95", "Focused echocardiography study - professional component", "J23", focusedEchoInfo),
    ],
  },
  {
    title: "Resus",
    items: [
      row("G521", "$125.10", "Life Threatening Critical Care - first 1/4 hour or part thereof", "J26", lifeThreateningCriticalCareInfo),
      row("G523", "$64.50", "Life Threatening Critical Care - second 1/4 hour or part thereof", "J26", lifeThreateningCriticalCareInfo),
      row("G522", "$42.50", "Life Threatening Critical Care - after first 1/2 hour, per 1/4 hour or part thereof", "J26", lifeThreateningCriticalCareInfo),
      row("G391", "$34.35", "Life Threatening Critical Care - fourth and subsequent physicians, per 1/4 hour or part thereof", "J26", lifeThreateningCriticalCareInfo),
      row("G395", "$64.70", "Other Critical Care - first 1/4 hour or part thereof", "J28", otherCriticalCareInfo),
      row("G391", "$34.35", "Other Critical Care - after first 1/4 hour, per 1/4 hour or part thereof", "J28", otherCriticalCareInfo),
    ],
  },
];
