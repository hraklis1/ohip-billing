const anesthesiaAfterHoursInfo = {
  notes: [
    "These premiums are payable when a case commences during the listed after-hours period."
  ],
  sourceRef: "GP94"
};

const anesthesiaSpecialVisitInfo = {
  paymentRules: [
    "C998C, C985C and C999C are eligible for payment only for the first patient seen on each special visit."
  ],
  commentary: [
    "The specific requirements for special visits are found in pages GP65 to GP77.",
    "These premiums are payable in addition to the E400 and E401 premiums."
  ],
  sourceRef: "GP94"
};

const emergencyDepartmentTravelInfo = {
  notes: [
    "Special Visit Premium Table I - Emergency Department. Not eligible for payment to Emergency Department Physicians."
  ],
  sourceRef: "GP70"
};

const hospitalInpatientSpecialVisitInfo = {
  notes: [
    "Special Visit Premium Table III - Hospital In-Patient."
  ],
  sourceRef: "GP72"
};

const asaExtraInfo = {
  paymentRules: [
    "In the description of E022C, E016C, E017C and E020C, reference to ASA level for Physical Status Classification means the level determined by the anaesthesiologist at the time of the pre-operative anaesthesia assessment.",
    "E016C, E017C and E020C are not eligible for payment when anaesthesia is rendered to a brain dead patient for organ donations."
  ],
  commentary: [
    "The level determined above does not vary, for example, when complications arise during surgery."
  ],
  sourceRef: "GP98"
};

const bmiInfo = {
  commentary: [
    "For E010, BMI is calculated by dividing the patient's weight (in kilograms) by the square of the patient's height (in metres)."
  ],
  sourceRef: "GP98"
};

const massiveTransfusionInfo = {
  notes: [
    "E025C is only eligible for payment for an unanticipated transfusion of blood during a surgical procedure where greater than 70 ml/kg of red blood cells are transfused for a patient with a weight up to 50 kg, or 10 or more units of red blood cells are transfused for a patient with a weight exceeding 50 kg."
  ],
  commentary: [
    "E025C is defined by the amount of blood transfused rather than the amount of blood loss.",
    "The volume of blood transfused does not include blood collected from a cell saver, hemodilution techniques or non-red blood cell components."
  ],
  sourceRef: "GP98"
};

const cancelledSurgeryInfo = {
  paymentRules: [
    "If an anaesthesiologist examines a patient prior to surgery and the surgery is cancelled prior to the induction of anaesthesia, the service rendered constitutes a hospital subsequent visit.",
    "When an anaesthetic has begun but the operation is cancelled prior to commencement of surgery, the service constitutes E006C with the actual number of time units added to 6 basic units for this service."
  ],
  commentary: [
    "If the operation is cancelled after surgery has commenced, the amount payable is calculated by adding the listed procedural basic units plus time units and multiplying the total by the unit fee."
  ],
  sourceRef: "GP95"
};

const secondAnesthesiologistInfo = {
  notes: [
    "Unless otherwise specified in the Schedule, when the anaesthetic services of more than one anaesthesiologist are necessary in the interest of the patient, the service provided by the second anaesthesiologist constitutes E001C with the actual number of time units (based on the actual time assisting the first anaesthesiologist) added to 6 basic units."
  ],
  sourceRef: "GP95"
};

const replacementAnesthesiologistInfo = {
  notes: [
    "When one anaesthesiologist starts a procedure and is replaced by another anaesthesiologist during a surgical procedure or delivery, the service provided by the replacement anaesthesiologist constitutes E005C based on the actual number of time units and 6 basic units, except in the case of continuous conduction anaesthesia.",
    "E005C qualifies for the premiums E400C or E401C only if the case commences after hours."
  ],
  commentary: [
    "Each anaesthesiologist must indicate, as part of the medical record, his/her starting and finishing times.",
    "For continuous conduction anaesthesia, the replacement anaesthesiologist submits claims using the applicable continuous conduction anaesthesia fee code."
  ],
  sourceRef: "GP95"
};

const supportiveCareInfo = {
  notes: [
    "Supportive care or monitoring includes constant attendance at a surgical procedure for the sole purpose of monitoring the condition of the patient and being immediately available to provide special supportive care."
  ],
  paymentRules: [
    "For E003B, the assistants' premiums apply as for assistants' services.",
    "Anaesthesia extra units listed on GP97 are not eligible for payment with E003C.",
    "E003B is not eligible for payment for second assistant services."
  ],
  sourceRef: "GP102"
};

const c101Info = {
  paymentRules: [
    "C101 is not eligible for payment with Supportive Care or with Critical Care, Ventilatory Care, Comprehensive Care, Acquired Brain Injury Management or Neonatal Intensive Care where team fees are claimed."
  ],
  commentary: [
    "C101 is also payable alone when no other separate fee is payable for the service provided in the ICU or CCU."
  ],
  sourceRef: "GP103"
};

const apsPremiumInfo = {
  notes: [
    "These premiums are payable for providing management and supervision of continuous catheter infusions for analgesia for a hospital in-patient (G247) rendered during the listed time periods."
  ],
  commentary: [
    "For additional information, refer to the Nerve Blocks for Acute Pain Management section of the Schedule."
  ],
  sourceRef: "GP107"
};

const traumaPremiumInfo = {
  notes: [
    "The trauma premium is payable when the service is rendered either on the day of the trauma or within 24 hours of the trauma, and for trauma patients age 16 or more who have an Injury Severity Score (ISS) greater than 15, or patients less than age 16 who have an ISS greater than 12."
  ],
  paymentRules: [
    "The premium is applicable to services listed in the Consultation and Visits section, Obstetrics section, Surgical Procedures section, specified resuscitative services, and basic and time units provided by surgical assistants or anaesthesiologists.",
    "The premium is payable only for the services for which the medical record lists the ISS score."
  ],
  claimsSubmissionInstructions: [
    "For claims payment purposes, the trauma premium and associated services must be submitted on the same claim record."
  ],
  commentary: [
    "Other special visit and after hours premiums are payable with services eligible for the trauma premium in accordance with the Schedule. However, the trauma premium is not applicable to these services."
  ],
  sourceRef: "GP109"
};

const consultationInfo = {
  paymentRules: [
    "The routine pre-anaesthetic evaluation of the patient required by Reg 965 of the Public Hospitals Act does not constitute a consultation, regardless of where and when this evaluation is performed."
  ],
  commentary: [
    "The general anaesthesia service includes a pre-anaesthetic evaluation, with specific elements as for assessments, which does not constitute a consultation."
  ],
  sourceRef: "A76"
};

const specialAnaestheticConsultInfo = {
  notes: [
    "A special anaesthetic consultation is rendered when an anaesthesia specialist provides all the appropriate elements of a regular consultation and is required to devote at least fifty (50) minutes of direct contact with the patient, exclusive of time spent rendering any other separately billable intervention to the patient."
  ],
  paymentRules: [
    "The routine pre-anaesthetic evaluation of the patient required by Reg 965 of the Public Hospitals Act does not constitute a consultation, regardless of where and when this evaluation is performed.",
    "For A210 the start and stop time of the service must be recorded in the patient's permanent medical record."
  ],
  commentary: [
    "Unless otherwise specified in the Schedule, the calculation of time excludes time devoted to any other separately payable service or procedure and non-patient-facing time such as chart review, imaging review, or documentation."
  ],
  sourceRef: "A76"
};

const limitedApsConsultInfo = {
  notes: [
    "A limited consultation for acute pain management is a consultation which takes place when a physician is requested by another physician to see a hospital in-patient because of the complexity or severity of the acute pain condition."
  ],
  paymentRules: [
    "A215 is not eligible for payment with P014C, for management of routine post-operative pain, or for referrals from another anaesthesiologist."
  ],
  commentary: [
    "P014C is an anaesthesia service, therefore the pre-anaesthetic evaluation is included in the service and is not payable as a limited consultation for acute pain management or as any other consultation or assessment."
  ],
  sourceRef: "A76"
};

const mamraaInfo = {
  notes: [
    "MAMRAA is an assessment of a mother or newborn provided by an anaesthesiologist upon the written request of a midwife or aboriginal midwife because of the complex, obscure or serious nature of the patient's problem.",
    "Maximum one MAMRAA per patient per anaesthesiologist per pregnancy."
  ],
  claimsSubmissionInstructions: [
    "When providing this service to a hospital in-patient in association with a special visit premium, submit claim using A215 and the appropriate special visit premium beginning with a C prefix."
  ],
  sourceRef: "A77"
};

const virtualCareInfo = {
  claimsSubmissionInstructions: [
    "Comprehensive Virtual Care Services rendered within an Existing/Ongoing Patient-Physician Relationship must include the modality indicator that identifies the technology used to deliver the service.",
    "K300A identifies Video technology used during the service.",
    "K301A identifies Telephone technology (audio only) used during the service."
  ],
  paymentRules: [
    "Comprehensive Virtual Care Services rendered by Video are payable at fees equivalent to the corresponding in-person fees.",
    "The amount payable for Comprehensive Virtual Care Services rendered by Telephone is 85% of the corresponding in-person fee except for K007, K005, K197 and K198, which are payable at 95%."
  ],
  sourceRef: "A70"
};

const phoneConsultInfo = {
  notes: [
    "Physician to physician telephone consultation is a service where the referring physician or nurse practitioner requests the opinion of a consultant physician by telephone because of the complexity, seriousness, or obscurity of the case.",
    "The consultant physician must provide an opinion and/or recommendations for patient treatment and/or management."
  ],
  paymentRules: [
    "A maximum of one K731 or K735 service is eligible for payment per patient per day.",
    "The service must include a minimum of 10 minutes of patient-related discussion for any given patient.",
    "The referring physician/nurse practitioner and consultant physician must be physically present in Ontario at the time of the service.",
    "This service is not eligible when the purpose is to arrange transfer of care, arrange another service or investigation, discuss diagnostic investigation results, or when the consultant renders a consultation, assessment, visit, or K-prefix time-based service on the same day or next day for the same patient."
  ],
  medicalRecordRequirements: [
    "The medical record must include the patient's name and health number, start and stop times, names of the referring and consultant physicians, reason for the consultation, and the consultant's opinion and recommendations."
  ],
  claimsSubmissionInstructions: [
    "K731 and K735 are only eligible for payment if the consultant physician includes the referring physician's or nurse practitioner's provider number with the claim."
  ],
  commentary: [
    "Referring and consultant physicians participating in physician to physician telephone consultations while on duty in an emergency department or a hospital urgent care clinic should submit claims using K734 and K735. K730 and K731 should not be claimed in these circumstances.",
    "In calculating the minimum time requirement, time does not need to be continuous."
  ],
  sourceRef: "A42"
};

const g247Info = {
  paymentRules: [
    "G247 is only eligible for payment to the physician most responsible, or to a physician substituting for the physician most responsible, for providing management and supervision of a continuous catheter infusion for analgesia for a hospital in-patient, or a lumbar sub-arachnoid drainage catheter placed in association with a surgical procedure where there is increased risk of spinal cord ischemia."
  ],
  commentary: [
    "G247 is not for visits to patients solely receiving intravenous pain management, such as patient controlled analgesia alone; a continuous nerve/plexus block or epidural/spinal catheter must be present for G247 to be payable."
  ],
  sourceRef: "J72"
};

const g387Info = {
  paymentRules: [
    "G387 is only insured for patients with central neuropathic pain who have first undertaken but not responded to generally accepted medical therapy.",
    "The physician submitting the claim for this service must remain in constant attendance during the infusion and no part of the procedure may be delegated or G387 is not payable.",
    "G387 is limited to a maximum of 6 per patient per 12 month period."
  ],
  medicalRecordRequirements: [
    "The medical record for the service must document the prior medical therapy that the patient did not respond to or G387 is not eligible for payment."
  ],
  commentary: [
    "Central neuropathic pain is pain caused by a primary lesion or dysfunction that affects the central nervous system.",
    "Generally accepted medical therapy required prior to G387 is treatment with both a tricyclic antidepressant and at least one anticonvulsant."
  ],
  sourceRef: "J55"
};

function row(code, value, description, sourceRef, info = {}) {
  const notes = [
    ...(info.quickReference ? [`Quick reference: ${info.quickReference}`] : []),
    ...(info.notes || []),
  ];

  return {
    code,
    value,
    description,
    sourceRef: info.sourceRef || sourceRef,
    notes: notes.length ? notes : undefined,
    paymentRules: info.paymentRules,
    commentary: info.commentary,
    medicalRecordRequirements: info.medicalRecordRequirements,
    claimsSubmissionInstructions: info.claimsSubmissionInstructions,
  };
}

function withQuickReference(info, quickReference) {
  return { ...info, quickReference };
}

export const generalShortlistGroups = [
  {
    title: "Premiums",
    items: [
      row("E400", "50%", "Evenings (17:00h - 24:00h) Monday to Friday or daytime and evenings on Saturdays, Sundays or Holidays - increase the total anaesthetic fee by", "GP94", withQuickReference(anesthesiaAfterHoursInfo, "1700-2400 hrs or S/S/H.")),
      row("E401", "75%", "Nights (00:00h - 07:00h) - increase the total anaesthetic fee by", "GP94", withQuickReference(anesthesiaAfterHoursInfo, "2400-0700 hrs.")),
      row("E420", "50%", "Trauma premium (base + time units ONLY)", "GP109", withQuickReference(traumaPremiumInfo, "Trauma premium within 24 hrs, ISS > 15; apply to basic/time units and consults/assessments.")),
    ],
  },
  {
    title: "Travel Fees",
    items: [
      row("C998", "$60.00", "Evenings (17:00h - 24:00h) Monday to Friday; or for non-elective surgery with sacrifice of office hours - Weekdays", "GP94", withQuickReference(anesthesiaSpecialVisitInfo, "Travel premium: Mon-Fri, 1700-2400 hrs.")),
      row("C985", "$75.00", "Saturdays, Sundays or Holidays daytime and evenings (07:00h - 24:00h)", "GP94", withQuickReference(anesthesiaSpecialVisitInfo, "Travel premium: S/S/H, 0700-2400 hrs.")),
      row("C999", "$100.00", "Nights (00:00h - 07:00h)", "GP94", withQuickReference(anesthesiaSpecialVisitInfo, "Travel premium: any day, 2400-0700 hrs.")),
      row("K960", "$37.40", "Travel premium - Emergency Department, weekdays daytime (07:00 - 17:00)", "GP70", { ...emergencyDepartmentTravelInfo, quickReference: "ED drive-in fee: Mon-Fri, 0700-1700 hrs.", notes: [...emergencyDepartmentTravelInfo.notes, "Maximum 2 per time period."] }),
      row("K962", "$37.40", "Travel premium - Emergency Department, weekdays evenings (17:00 - 24:00) Monday through Friday", "GP70", { ...emergencyDepartmentTravelInfo, quickReference: "ED drive-in fee: Mon-Fri, 1700-2400 hrs.", notes: [...emergencyDepartmentTravelInfo.notes, "Maximum 2 per time period."] }),
      row("K963", "$37.40", "Travel premium - Emergency Department, Saturdays, Sundays and Holidays (07:00 - 24:00)", "GP70", { ...emergencyDepartmentTravelInfo, quickReference: "ED drive-in fee: S/S/H, 0700-2400 hrs.", notes: [...emergencyDepartmentTravelInfo.notes, "Maximum 6 per time period."] }),
      row("K964", "$37.40", "Travel premium - Emergency Department, nights (00:00 - 07:00)", "GP70", { ...emergencyDepartmentTravelInfo, quickReference: "ED drive-in fee: any day, 2400-0700 hrs.", notes: [...emergencyDepartmentTravelInfo.notes, "No maximum per time period."] }),
    ],
  },
  {
    title: "Extras",
    items: [
      row("E020", "4 units", "ASA E - patient undergoing anaesthesia for emergency surgery which commences within 24 hours of operating room booking, to E022C, E017C or E016C", "GP97", withQuickReference(asaExtraInfo, "Emergency procedure less than 24 hrs from booking in an ASA 3/4/5 patient.")),
      row("E022", "2 units", "ASA III - patient with severe systemic disease limiting activity but not incapacitating", "GP97", withQuickReference(asaExtraInfo, "ASA 3.")),
      row("E017", "10 units", "ASA IV - patient with incapacitating systemic disease that is a constant threat to life", "GP97", withQuickReference(asaExtraInfo, "ASA 4.")),
      row("E016", "20 units", "ASA V - moribund patient not expected to live 24 hours with or without operation", "GP97", withQuickReference(asaExtraInfo, "ASA 5.")),
      row("E011", "4 units", "Patient in prone position during surgery", "GP97", { quickReference: "Prone." }),
      row("E024", "4 units", "Patient in sitting position during surgery, greater than 60 degrees upright", "GP97", { quickReference: "Sitting, greater than 60 degrees." }),
      row("E010", "2 units", "Patient with body mass index (BMI) > 40", "GP97", withQuickReference(bmiInfo, "BMI > 40.")),
      row("E025", "10 units", "Unanticipated massive transfusion - transfusion of at least one blood volume of red blood cells", "GP97", withQuickReference(massiveTransfusionInfo, "Massive transfusion: unanticipated transfusion of more than 1 blood volume of RBCs.")),
      row("E012", "5 units", "Patient who is known to have malignant hyperthermia or there is a strong suspicion of susceptibility, and the anaesthetic requires full malignant hyperthermia set up and management", "GP97", { quickReference: "Malignant hyperthermia precautions." }),
      row("E005", "6 units", "Replacement anaesthesiologist during a surgical procedure or delivery", "GP95", withQuickReference(replacementAnesthesiologistInfo, "Replacement anesthetist plus time units from start of case; no extras or premiums.")),
      row("E001", "6 units", "Second anaesthesiologist when necessary in the interest of the patient", "GP95", withQuickReference(secondAnesthesiologistInfo, "Second anesthetist plus time units starting at 0; can include extras and premiums.")),
      row("E006", "6 units", "Anaesthetic has begun but operation cancelled prior to commencement of surgery", "GP95", withQuickReference(cancelledSurgeryInfo, "Cancelled after start of anesthetic but before start of surgery.")),
      row("E003", "4 units", "Supportive care/Monitoring", "GP102", withQuickReference(supportiveCareInfo, "Supportive care/standby plus time units; includes advice, information, and results provided by phone.")),
    ],
  },
  {
    title: "Specific Assessments",
    items: [
      row("A013", "$64.65", "Specific assessment", "A78", { quickReference: "Specific assessment - outpatient; may bill special visit premiums." }),
      row("C013", "$64.65", "Specific assessment", "A78", { quickReference: "Specific assessment - inpatient; no special visit premiums." }),
      row("C994", "$61.70", "First person seen - Hospital In-Patient, weekdays evenings (17:00 - 24:00) Monday through Friday", "GP72", { ...hospitalInpatientSpecialVisitInfo, quickReference: "First patient seen with C013, Mon-Fri, 1700-2400 hrs.", notes: [...hospitalInpatientSpecialVisitInfo.notes, "Maximum 10, total of first and additional person seen, per time period."] }),
      row("C995", "$61.70", "Additional person(s) seen - Hospital In-Patient, weekdays evenings (17:00 - 24:00) Monday through Friday", "GP72", { ...hospitalInpatientSpecialVisitInfo, quickReference: "Next patients seen with C013, Mon-Fri, 1700-2400 hrs.", notes: [...hospitalInpatientSpecialVisitInfo.notes, "Maximum 10, total of first and additional person seen, per time period."] }),
      row("C986", "$77.10", "First person seen - Hospital In-Patient, Saturdays, Sundays and Holidays (07:00 - 24:00)", "GP72", { ...hospitalInpatientSpecialVisitInfo, quickReference: "First patient seen with C013, S/S/H, 0700-2400 hrs.", notes: [...hospitalInpatientSpecialVisitInfo.notes, "Maximum 20, total of first and additional person seen, per time period."] }),
      row("C987", "$77.10", "Additional person(s) seen - Hospital In-Patient, Saturdays, Sundays and Holidays (07:00 - 24:00)", "GP72", { ...hospitalInpatientSpecialVisitInfo, quickReference: "Next patients seen with C013, S/S/H, 0700-2400 hrs.", notes: [...hospitalInpatientSpecialVisitInfo.notes, "Maximum 20, total of first and additional person seen, per time period."] }),
      row("C996", "$102.80", "First person seen - Hospital In-Patient, nights (00:00 - 07:00)", "GP72", { ...hospitalInpatientSpecialVisitInfo, quickReference: "First patient seen with C013, 2400-0700 hrs.", notes: [...hospitalInpatientSpecialVisitInfo.notes, "No maximum per time period."] }),
      row("C997", "$102.80", "Additional person(s) seen - Hospital In-Patient, nights (00:00 - 07:00)", "GP72", { ...hospitalInpatientSpecialVisitInfo, quickReference: "Next patients seen with C013, 2400-0700 hrs.", notes: [...hospitalInpatientSpecialVisitInfo.notes, "No maximum per time period."] }),
      row("C101", "$9.10", "For each patient seen on a visit to ICU or CCU (subject to the exceptions set out below)", "GP103", withQuickReference(c101Info, "For patient seen in ICU / CCU; add to C215, C012, G247.")),
      row("C012", "$31.70", "Subsequent visits - first five weeks", "A78", { quickReference: "Subsequent visit." }),
    ],
  },
  {
    title: "APS",
    items: [
      row("E402", "40%", "Evenings (17:00h - 24:00h) Monday to Friday or daytime and evenings on Saturday, Sunday or Holidays", "GP107", withQuickReference(apsPremiumInfo, "APS visit premium, 1700-2400 hrs or S/S/H.")),
      row("E403", "50%", "Nights (00:00h - 07:00h)", "GP107", withQuickReference(apsPremiumInfo, "APS visit premium, 2400-0700 hrs.")),
      row("C101", "$9.10", "For each patient seen on a visit to ICU or CCU (subject to the exceptions set out below)", "GP103", withQuickReference(c101Info, "For patient seen in ICU / CCU; add to C215, C012, G247.")),
      row("C215", "$69.75", "Limited consultation for acute pain management - subject to the same conditions as A215", "A77", withQuickReference(limitedApsConsultInfo, "APS consult.")),
      row("C012", "$31.70", "Subsequent visits - first five weeks", "A78", { quickReference: "APS visit without catheter; E402 not applicable." }),
      row("G247", "$30.10", "Hospital visits, to a maximum of 3 per patient per day", "J72", withQuickReference(g247Info, "APS visit with catheter; may use E402.")),
      row("G387", "$125.00", "Intravenous local anaesthetic infusion for central neuropathic pain", "J55", withQuickReference(g387Info, "Lidocaine infusion; meant for chronic pain, only bill once per patient on APS.")),
    ],
  },
  {
    title: "Consults / Preadmit",
    items: [
      row("A015", "$109.70", "Consultation", "A77", withQuickReference(consultationInfo, "Consultation - outpatient.")),
      row("C015", "$109.70", "Consultation - subject to the same conditions as A015", "A78", withQuickReference(consultationInfo, "Consultation - inpatient.")),
      row("A816", "$106.80", "Midwife or Aboriginal Midwife-Requested Anaesthesia Assessment (MAMRAA)", "A77", withQuickReference(mamraaInfo, "Midwife-requested anesthesia consult - outpatient.")),
      row("C816", "$106.80", "Midwife or Aboriginal Midwife-Requested Anaesthesiologist Assessment (MAMRAA) - subject to the same conditions as A816", "A78", withQuickReference(mamraaInfo, "Midwife-requested anesthesia consult - inpatient.")),
      row("A210", "$163.20", "Special anaesthetic consultation", "A77", withQuickReference(specialAnaestheticConsultInfo, "Consultation - outpatient; more than 50 minutes of direct contact with patient.")),
      row("C210", "$163.20", "Special anaesthetic consultation - subject to same conditions as A210", "A78", withQuickReference(specialAnaestheticConsultInfo, "Consultation - inpatient; more than 50 minutes of direct contact with patient.")),
      row("C101", "$9.10", "For each patient seen on a visit to ICU or CCU (subject to the exceptions set out below)", "GP103", withQuickReference(c101Info, "For patient seen in ICU / CCU; add to C015.")),
      row("K300", "$0.00", "Video technology used during the service", "A70", withQuickReference(virtualCareInfo, "Video modality indicator; add to A015.")),
      row("K301", "$0.00", "Telephone technology (audio only) used during the service", "A70", withQuickReference(virtualCareInfo, "Telephone modality indicator; not eligible with A015.")),
      row("K731", "$47.75", "Physician to physician telephone consultation - Consultant physician", "A42", withQuickReference(phoneConsultInfo, "Physician-to-physician phone consult; use for IV iron coverage in PAC.")),
    ],
  },
];
