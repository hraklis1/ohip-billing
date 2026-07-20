import { ohipAnesthesiaData } from "./data/ohipAnesthesiaCodes.js";
import { generalShortlistGroups } from "./data/generalShortlist.js";
import { procedureFeeGroups } from "./data/procedureFees.js";
import { miscShortlistGroups } from "./data/miscShortlist.js";

const state = {
  category: "All",
  subcategory: "All",
  query: "",
  view: "lookup",
  shortlistView: "general",
  displayLimit: 150,
  billingQuery: "",
  billingItems: [],
  billingNextId: 1,
  generalFilter: "All",
  procedureFilter: "All",
  miscFilter: "All",
  calculatorFilter: "All"
};

const els = {
  sourceMeta: document.querySelector("#sourceMeta"),
  viewTabs: document.querySelectorAll(".view-tab"),
  viewPanels: document.querySelectorAll("[data-view-panel]"),
  shortlistTabs: document.querySelectorAll(".shortlist-tab"),
  shortlistPanels: document.querySelectorAll("[data-shortlist-panel]"),
  searchInput: document.querySelector("#searchInput"),
  categorySelect: document.querySelector("#categorySelect"),
  subcategorySelect: document.querySelector("#subcategorySelect"),
  clearFilters: document.querySelector("#clearFilters"),
  resultCount: document.querySelector("#resultCount"),
  activeContext: document.querySelector("#activeContext"),
  codesBody: document.querySelector("#codesBody"),
  showMoreButton: document.querySelector("#showMoreButton"),
  emptyState: document.querySelector("#emptyState"),
  generalFilters: document.querySelector("#generalFilters"),
  generalGroups: document.querySelector("#generalGroups"),
  procedureFilters: document.querySelector("#procedureFilters"),
  procedureGroups: document.querySelector("#procedureGroups"),
  miscFilters: document.querySelector("#miscFilters"),
  miscGroups: document.querySelector("#miscGroups"),
  calculatorFilters: document.querySelector("#calculatorFilters"),
  calculatorCards: document.querySelectorAll("[data-calculator]"),
  calcMode: document.querySelector("#calcMode"),
  startTime: document.querySelector("#startTime"),
  endTime: document.querySelector("#endTime"),
  elapsedTime: document.querySelector("#elapsedTime"),
  timeUnits: document.querySelector("#timeUnits"),
  euUnits: document.querySelector("#euUnits"),
  calcNote: document.querySelector("#calcNote"),
  issScores: document.querySelectorAll(".iss-score-input"),
  issScore: document.querySelector("#issScore"),
  issE420: document.querySelector("#issE420"),
  issNote: document.querySelector("#issNote"),
  weightKg: document.querySelector("#weightKg"),
  weightLbs: document.querySelector("#weightLbs"),
  heightFeet: document.querySelector("#heightFeet"),
  heightInches: document.querySelector("#heightInches"),
  heightCm: document.querySelector("#heightCm"),
  bmiWeight: document.querySelector("#bmiWeight"),
  bmiHeight: document.querySelector("#bmiHeight"),
  bmiValue: document.querySelector("#bmiValue"),
  bmiE010: document.querySelector("#bmiE010"),
  bmiNote: document.querySelector("#bmiNote"),
  eblWeight: document.querySelector("#eblWeight"),
  eblSex: document.querySelector("#eblSex"),
  eblHgbStart: document.querySelector("#eblHgbStart"),
  eblHgbThreshold: document.querySelector("#eblHgbThreshold"),
  eblVolume: document.querySelector("#eblVolume"),
  eblResult: document.querySelector("#eblResult"),
  eblNote: document.querySelector("#eblNote"),
  billingStartTime: document.querySelector("#billingStartTime"),
  billingEndTime: document.querySelector("#billingEndTime"),
  billingUnitFee: document.querySelector("#billingUnitFee"),
  billingElapsedTime: document.querySelector("#billingElapsedTime"),
  billingTimeUnits: document.querySelector("#billingTimeUnits"),
  billingEuUnits: document.querySelector("#billingEuUnits"),
  billingHeaderEu: document.querySelector("#billingHeaderEu"),
  billingTimeNote: document.querySelector("#billingTimeNote"),
  billingTotalUnits: document.querySelector("#billingTotalUnits"),
  billingGrandTotal: document.querySelector("#billingGrandTotal"),
  billingStickyUnits: document.querySelector("#billingStickyUnits"),
  billingStickyTotal: document.querySelector("#billingStickyTotal"),
  billingCard: document.querySelector("#billingCard"),
  billingSheetToggle: document.querySelector("#billingSheetToggle"),
  billingSheetBackdrop: document.querySelector("#billingSheetBackdrop"),
  billingQuickAddOpen: document.querySelector("#billingQuickAddOpen"),
  billingQuickAddSummary: document.querySelector("#billingQuickAddSummary"),
  billingBundles: document.querySelector("#billingBundles"),
  quickAddDialog: document.querySelector("#quickAddDialog"),
  quickAddDialogBody: document.querySelector("#quickAddDialogBody"),
  quickAddDialogClose: document.querySelector("#quickAddDialogClose"),
  quickAddDialogDone: document.querySelector("#quickAddDialogDone"),
  billingSearchOpen: document.querySelector("#billingSearchOpen"),
  codeSearchDialog: document.querySelector("#codeSearchDialog"),
  codeSearchDialogClose: document.querySelector("#codeSearchDialogClose"),
  codeSearchDialogDone: document.querySelector("#codeSearchDialogDone"),
  billingCodeSearch: document.querySelector("#billingCodeSearch"),
  billingSearchResults: document.querySelector("#billingSearchResults"),
  billingCardBody: document.querySelector("#billingCardBody"),
  billingPaperStart: document.querySelector("#billingPaperStart"),
  billingPaperFinish: document.querySelector("#billingPaperFinish"),
  billingPaperTotalUnits: document.querySelector("#billingPaperTotalUnits"),
  billingPaperBasicUnits: document.querySelector("#billingPaperBasicUnits"),
  billingPaperTime: document.querySelector("#billingPaperTime"),
  billingPaperEu: document.querySelector("#billingPaperEu"),
  billingCardContext: document.querySelector("#billingCardContext"),
  billingEmptyState: document.querySelector("#billingEmptyState"),
  billingSummary: document.querySelector("#billingSummary"),
  clearBillingCard: document.querySelector("#clearBillingCard"),
  clearBillingCardTop: document.querySelector("#clearBillingCardTop"),
  billingTabBadge: document.querySelector("#billingTabBadge"),
  infoDialog: document.querySelector("#infoDialog"),
  infoDialogTitle: document.querySelector("#infoDialogTitle"),
  infoDialogBody: document.querySelector("#infoDialogBody"),
  infoDialogClose: document.querySelector("#infoDialogClose")
};

const generatedCodes = ohipAnesthesiaData.codes;
const generalItems = generalShortlistGroups.flatMap((group) => group.items);
const procedureItems = procedureFeeGroups.flatMap((group) => group.items);
const miscItems = miscShortlistGroups.flatMap((group) => group.items);
const generatedCodeKeys = new Set(generatedCodes.flatMap((item) => [
  item.code,
  item.code.endsWith("C") ? item.code.slice(0, -1) : `${item.code}C`
]));
const generalLookupSeen = new Set(generatedCodeKeys);
const generalLookupCodes = generalShortlistGroups.flatMap((group) => group.items.map((item) => ({ group, item })))
  .filter(({ item }) => {
    if (generalLookupSeen.has(item.code)) return false;
    generalLookupSeen.add(item.code);
    return true;
  })
  .map(({ group, item }) => {
    const value = String(item.value || "");
    const isUnits = value.includes("unit");
    const isPercent = value.includes("%");
    return {
      code: item.code,
      description: item.description,
      category: "General Preamble",
      subcategory: `General shortlist - ${group.title}`,
      valueType: isUnits ? "base_units" : isPercent ? "premium_percent" : "fee",
      baseUnits: isUnits ? Number.parseInt(value, 10) : null,
      fee: isUnits ? null : value.replace(/^\$/, ""),
      sourceRef: item.sourceRef,
      pdfPage: null,
      notes: item.notes,
      paymentRules: item.paymentRules,
      commentary: item.commentary,
      medicalRecordRequirements: item.medicalRecordRequirements,
      claimsSubmissionInstructions: item.claimsSubmissionInstructions
    };
  });
const procedureLookupCodes = procedureFeeGroups.flatMap((group) => group.items.map((item) => {
  const value = String(item.value || "");
  const isUnits = value.includes("unit");
  const isPercent = value.includes("%");
  return {
    code: item.code,
    description: item.description,
    category: "Procedure Fees",
    subcategory: group.title,
    valueType: isUnits ? "base_units" : isPercent ? "premium_percent" : "fee",
    baseUnits: isUnits ? Number.parseInt(value, 10) : null,
    fee: isUnits ? null : value.replace(/^\$/, ""),
    sourceRef: item.sourceRef,
    pdfPage: null,
    notes: item.notes,
    paymentRules: item.paymentRules,
    commentary: item.commentary,
    medicalRecordRequirements: item.medicalRecordRequirements,
    claimsSubmissionInstructions: item.claimsSubmissionInstructions
  };
}));
const miscLookupCodes = miscShortlistGroups.flatMap((group) => group.items.map((item) => {
  const value = String(item.value || "");
  const isUnits = value.includes("unit");
  const isPercent = value.includes("%");
  return {
    code: item.code,
    description: item.description,
    category: "Misc",
    subcategory: group.title,
    valueType: isUnits ? "base_units" : isPercent ? "premium_percent" : "fee",
    baseUnits: isUnits ? Number.parseInt(value, 10) : null,
    fee: isUnits ? null : value.replace(/^\$/, ""),
    sourceRef: item.sourceRef,
    pdfPage: null,
    notes: item.notes,
    paymentRules: item.paymentRules,
    commentary: item.commentary,
    medicalRecordRequirements: item.medicalRecordRequirements,
    claimsSubmissionInstructions: item.claimsSubmissionInstructions
  };
}));
const codes = [...generatedCodes, ...generalLookupCodes, ...procedureLookupCodes, ...miscLookupCodes];
const DISPLAY_STEP = 150;
const VIEWS = new Set(["lookup", "shortlist", "calculators", "billing"]);
const SHORTLIST_VIEWS = new Set(["general", "procedure", "misc"]);
const BILLING_SEARCH_LIMIT = 40;
const ANESTHESIOLOGIST_UNIT_FEE = 15.96;
const QUICK_ADD_GROUPS = [
  {
    title: "ASA Physical Status",
    exclusive: true,
    options: [
      { code: "E022C", label: "ASA III - severe systemic disease limiting activity" },
      { code: "E017C", label: "ASA IV - systemic disease that is a constant threat to life" },
      { code: "E016C", label: "ASA V - moribund patient not expected to live 24 hours" }
    ]
  },
  {
    title: "Extra Units",
    options: [
      { code: "E020C", label: "ASA E - anaesthesia for emergency surgery" },
      { code: "E010C", label: "Body Mass Index >= 40" },
      { code: "E011C", label: "Prone position during surgery" },
      { code: "E024C", label: "Sitting position, greater than 60 degrees upright" },
      { code: "E012C", label: "Known or suspected malignant hyperthermia" },
      { code: "E025C", label: "Unanticipated massive transfusion" }
    ]
  },
  {
    title: "After Hours Premium",
    exclusive: true,
    options: [
      { code: "E400C", label: "Evenings (17:00-24:00) Mon-Fri, or days/evenings Sat/Sun/Hol" },
      { code: "E401C", label: "Nights (00:00-07:00)" }
    ]
  },
  {
    title: "Additional Procedures",
    options: [
      { code: "G268", label: "Arterial cannulation" },
      { code: "G269", label: "Cannulation of central vein" },
      { code: "Z459", label: "Arterial puncture (ABGs)" },
      { code: "G322", label: "Nasogastric tube" },
      { code: "G489", label: "Venipuncture, adolescent or adult" }
    ]
  },
  {
    title: "Nerve Blocks",
    options: [
      { code: "G118", label: "Thoracic epidural with catheter" },
      { code: "G125", label: "Caudal/lumbar epidural with catheter" },
      { code: "G260", label: "Major plexus block" },
      { code: "G060", label: "Peripheral nerve block, major" },
      { code: "G061", label: "Peripheral nerve block, minor" }
    ]
  },
  {
    title: "Other Premiums",
    options: [
      { code: "E420", label: "Trauma premium - basic & time units (within 24 hr, ISS > 15)" },
      { code: "C101", label: "ICU premium - patient in ICU or CCU" }
    ]
  },
  {
    title: "Special Visit Premiums",
    options: [
      { code: "C998", label: "1st pt seen, anaesthesia travel, Mon-Fri, 17:00-24:00" },
      { code: "C985", label: "1st pt seen, anaesthesia travel, Sat/Sun/Hol, 07:00-24:00" },
      { code: "C999", label: "1st pt seen, anaesthesia travel, 24:00-07:00" },
      { code: "C994", label: "1st pt seen with C013, Mon-Fri, 17:00-24:00" },
      { code: "C995", label: "Next pts seen with C013, Mon-Fri, 17:00-24:00" },
      { code: "C986", label: "1st pt seen with C013, Sat/Sun/Hol, 07:00-24:00" },
      { code: "C987", label: "Next pts seen with C013, Sat/Sun/Hol, 07:00-24:00" },
      { code: "C996", label: "1st pt seen with C013, 24:00-07:00" },
      { code: "C997", label: "Next pts seen with C013, 24:00-07:00" }
    ]
  }
];
const CODE_BUNDLES = [
  { id: "thoracic", label: "Thoracic", codes: ["G268", "G489", "Z342", "Z459"] },
  { id: "artline-piv", label: "Art Line + Peripheral IV", codes: ["G268", "G489"] },
  { id: "artline-central", label: "Art Line + Central Line", codes: ["G268", "G269"] }
];
const AFTER_HOURS_PROCEDURE_PREMIUM_CODES = new Set([
  "K101", "K102", "K111", "K112",
  "G060", "G061", "G062", "G065", "G066", "G067", "G068", "G082", "G083", "G085", "G090", "G099",
  "G117", "G118", "G119", "G125", "G176", "G177", "G178", "G179", "G211", "G224", "G246", "G248",
  "G249", "G260", "G261", "G262", "G263", "G268", "G269", "G275", "G277", "G279", "G280", "G282",
  "G287", "G288", "G290", "G297", "G298", "G303", "G309", "G322", "G323", "G324", "G330", "G331",
  "G336", "G347", "G348", "G349", "G356", "G376", "G379", "G380", "G509", "X112", "Z459"
]);
const AFTER_HOURS_PROCEDURE_PREMIUM_RANGES = [
  { prefix: "J", start: 1, end: 68 }
];

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "Other";
    acc.set(value, (acc.get(value) || 0) + 1);
    return acc;
  }, new Map());
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("anaesthesiologist", "anesthesiologist")
    .replaceAll("anaesthesia", "anesthesia")
    .replaceAll("anaesthetic", "anesthetic");
}

function matchesItemQuery(item, query) {
  if (!query) return true;
  const haystack = [
    item.code,
    item.description,
    ...(item.paymentRules || []),
    ...(item.commentary || []),
    ...(item.medicalRecordRequirements || []),
    displayCode(item),
    item.category,
    item.subcategory,
    item.context,
    item.valueType,
    item.sourceRef
  ].map(normalize).join(" ");
  return normalize(query).split(/\s+/).every((part) => haystack.includes(part));
}

function matchesQuery(item) {
  return matchesItemQuery(item, state.query);
}

function isLookupIdle() {
  return state.query === "" && state.category === "All" && state.subcategory === "All";
}

function filteredCodes() {
  if (isLookupIdle()) return [];

  return codes
    .filter((item) => state.category === "All" || item.category === state.category)
    .filter((item) => state.subcategory === "All" || item.subcategory === state.subcategory)
    .filter(matchesQuery)
    .sort((a, b) => a.category.localeCompare(b.category) || a.subcategory.localeCompare(b.subcategory) || a.code.localeCompare(b.code));
}

function renderCategories() {
  const counts = countBy(codes, "category");
  const sortedCategories = Array.from(counts.keys()).sort((a, b) => {
    if (a === "General Preamble") return -1;
    if (b === "General Preamble") return 1;
    return a.localeCompare(b);
  });
  const categories = ["All", ...sortedCategories];
  els.categorySelect.innerHTML = categories.map((category) => {
    const count = category === "All" ? codes.length : counts.get(category);
    return `<option value="${escapeAttr(category)}">${escapeHtml(category)} (${count.toLocaleString()})</option>`;
  }).join("");
  els.categorySelect.value = state.category;
}

function renderSubcategories() {
  const available = codes
    .filter((item) => state.category === "All" || item.category === state.category)
    .map((item) => item.subcategory || "Other");
  const subcategories = ["All", ...Array.from(new Set(available)).sort((a, b) => a.localeCompare(b))];
  if (!subcategories.includes(state.subcategory)) state.subcategory = "All";
  els.subcategorySelect.innerHTML = subcategories
    .map((subcategory) => `<option value="${escapeAttr(subcategory)}">${escapeHtml(subcategory)}</option>`)
    .join("");
  els.subcategorySelect.value = state.subcategory;
}

function valueHtml(item) {
  if (item.valueType === "base_units") {
    return `<span class="value-badge units">${item.baseUnits} units</span>`;
  }
  if (item.valueType === "premium_percent") {
    return `<span class="value-badge fee">${escapeHtml(item.fee)}</span>`;
  }
  return `<span class="value-badge fee">$${escapeHtml(item.fee)}</span>`;
}

function displayCode(item) {
  const shouldUseCSuffix = item.valueType === "base_units"
    && item.category.includes("Surgical Procedures")
    && !item.code.endsWith("C");
  return shouldUseCSuffix ? `${item.code}C` : item.code;
}

function hasInfo(item) {
  return Boolean(
    item.notes?.length
    || item.paymentRules?.length
    || item.claimsSubmissionInstructions?.length
    || item.commentary?.length
    || item.medicalRecordRequirements?.length
  );
}

function descriptionHtml(item, codeIndex) {
  const infoButton = hasInfo(item)
    ? `<button class="info-button" type="button" data-code-index="${codeIndex}" aria-label="Show payment rules for ${escapeAttr(displayCode(item))}" title="Payment rules">i</button>`
    : "";
  return `${escapeHtml(item.description)}${infoButton}`;
}

function addCodeButtonHtml(item, source, index) {
  return `<button class="add-code-button" type="button" data-billing-source="${source}" data-billing-index="${index}" aria-label="Add ${escapeAttr(displayCode(item))} to billing card" title="Add to billing card">+</button>`;
}

function renderRows() {
  const idle = isLookupIdle();
  const visible = filteredCodes();
  const displayed = visible.slice(0, state.displayLimit);
  const capped = visible.length > displayed.length;
  if (idle) {
    els.resultCount.textContent = "Ready";
  } else if (capped) {
    els.resultCount.textContent = `${visible.length.toLocaleString()} codes - showing first ${displayed.length.toLocaleString()}`;
  } else {
    els.resultCount.textContent = `${visible.length.toLocaleString()} ${visible.length === 1 ? "code" : "codes"}`;
  }
  const context = [state.category, state.subcategory].filter((value) => value !== "All").join(" / ");
  if (idle) {
    els.activeContext.textContent = "No lookup filter selected";
  } else if (capped) {
    els.activeContext.textContent = `${context || "All anesthesia-related listings"} - search or refine filters for a shorter list`;
  } else {
    els.activeContext.textContent = context || "All anesthesia-related listings";
  }
  els.emptyState.hidden = visible.length > 0;
  els.emptyState.textContent = idle ? "No lookup filter selected." : "No matching anesthesia listings.";
  els.codesBody.innerHTML = displayed.map((item) => {
    const codeIndex = codes.indexOf(item);
    const rowContextParts = [
      state.category === "All" ? escapeHtml(item.category) : null,
      state.subcategory === "All" ? escapeHtml(item.subcategory) : null,
      item.context ? `<span class="context-em">${escapeHtml(item.context)}</span>` : null
    ].filter(Boolean);
    const rowContext = rowContextParts.length
      ? `<span class="row-context">${rowContextParts.join(" &middot; ")}</span>`
      : "";
    return `<tr>
    <td class="code-cell">${escapeHtml(displayCode(item))}</td>
    <td class="description-cell">${descriptionHtml(item, codeIndex)}${rowContext}</td>
    <td>${valueHtml(item)}</td>
    <td class="action-cell">${addCodeButtonHtml(item, "codes", codeIndex)}</td>
  </tr>`;
  }).join("");

  const remaining = visible.length - displayed.length;
  els.showMoreButton.hidden = remaining <= 0;
  if (remaining > 0) {
    els.showMoreButton.textContent = `Show ${Math.min(DISPLAY_STEP, remaining).toLocaleString()} more (${remaining.toLocaleString()} remaining)`;
  }
}

function generalValueClass(value) {
  if (String(value).includes("%")) return "fee";
  if (String(value).includes("unit")) return "units";
  return "fee";
}

function generalInfoButtonHtml(item, index) {
  if (!hasInfo(item)) return "";
  return `<button class="info-button" type="button" data-general-index="${index}" aria-label="Show additional information for ${escapeAttr(item.code)}" title="Additional information">i</button>`;
}

function renderGeneralFilters() {
  const filters = ["All", ...generalShortlistGroups.map((group) => group.title)];
  els.generalFilters.innerHTML = filters.map((filter) => {
    const isActive = state.generalFilter === filter;
    const count = filter === "All"
      ? generalItems.length
      : generalShortlistGroups.find((group) => group.title === filter)?.items.length;
    return `<button class="general-filter-button${isActive ? " active" : ""}" type="button" data-general-filter="${escapeAttr(filter)}" aria-pressed="${isActive}">
      ${escapeHtml(filter)} <span>${count}</span>
    </button>`;
  }).join("");
}

function renderGeneralPane() {
  let itemIndex = 0;
  els.generalGroups.innerHTML = generalShortlistGroups.map((group) => {
    const groupStartIndex = itemIndex;
    itemIndex += group.items.length;
    if (state.generalFilter !== "All" && state.generalFilter !== group.title) return "";

    const rows = group.items.map((item) => {
      const index = groupStartIndex + group.items.indexOf(item);
      return `<tr>
        <td class="code-cell">${escapeHtml(item.code)}</td>
        <td class="description-cell">${escapeHtml(item.description)}${generalInfoButtonHtml(item, index)}</td>
        <td><span class="value-badge ${generalValueClass(item.value)}">${escapeHtml(item.value)}</span></td>
        <td class="action-cell">${addCodeButtonHtml(item, "general", index)}</td>
      </tr>`;
    }).join("");

    return `<section class="general-group">
      <h3>${escapeHtml(group.title)}</h3>
      <div class="general-table-wrap">
        <table class="general-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;
  }).join("");
}

function procedureInfoButtonHtml(item, index) {
  if (!hasInfo(item)) return "";
  return `<button class="info-button" type="button" data-procedure-index="${index}" aria-label="Show additional information for ${escapeAttr(item.code)}" title="Additional information">i</button>`;
}

function renderProcedureFilters() {
  const filters = ["All", ...procedureFeeGroups.map((group) => group.title)];
  els.procedureFilters.innerHTML = filters.map((filter) => {
    const isActive = state.procedureFilter === filter;
    const count = filter === "All"
      ? procedureItems.length
      : procedureFeeGroups.find((group) => group.title === filter)?.items.length;
    return `<button class="general-filter-button${isActive ? " active" : ""}" type="button" data-procedure-filter="${escapeAttr(filter)}" aria-pressed="${isActive}">
      ${escapeHtml(filter)} <span>${count}</span>
    </button>`;
  }).join("");
}

function renderProcedurePane() {
  let itemIndex = 0;
  els.procedureGroups.innerHTML = procedureFeeGroups.map((group) => {
    const groupStartIndex = itemIndex;
    itemIndex += group.items.length;
    if (state.procedureFilter !== "All" && state.procedureFilter !== group.title) return "";

    const rows = group.items.map((item) => {
      const index = groupStartIndex + group.items.indexOf(item);
      return `<tr>
        <td class="code-cell">${escapeHtml(item.code)}</td>
        <td class="description-cell">${escapeHtml(item.description)}${procedureInfoButtonHtml(item, index)}</td>
        <td><span class="value-badge ${generalValueClass(item.value)}">${escapeHtml(item.value)}</span></td>
        <td class="action-cell">${addCodeButtonHtml(item, "procedure", index)}</td>
      </tr>`;
    }).join("");

    return `<section class="general-group">
      <h3>${escapeHtml(group.title)}</h3>
      <div class="general-table-wrap">
        <table class="general-table procedure-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;
  }).join("");
}

function miscInfoButtonHtml(item, index) {
  if (!hasInfo(item)) return "";
  return `<button class="info-button" type="button" data-misc-index="${index}" aria-label="Show additional information for ${escapeAttr(item.code)}" title="Additional information">i</button>`;
}

function renderMiscFilters() {
  const filters = ["All", ...miscShortlistGroups.map((group) => group.title)];
  els.miscFilters.innerHTML = filters.map((filter) => {
    const isActive = state.miscFilter === filter;
    const count = filter === "All"
      ? miscItems.length
      : miscShortlistGroups.find((group) => group.title === filter)?.items.length;
    return `<button class="general-filter-button${isActive ? " active" : ""}" type="button" data-misc-filter="${escapeAttr(filter)}" aria-pressed="${isActive}">
      ${escapeHtml(filter)} <span>${count}</span>
    </button>`;
  }).join("");
}

function renderMiscPane() {
  let itemIndex = 0;
  els.miscGroups.innerHTML = miscShortlistGroups.map((group) => {
    const groupStartIndex = itemIndex;
    itemIndex += group.items.length;
    if (state.miscFilter !== "All" && state.miscFilter !== group.title) return "";

    const rows = group.items.map((item) => {
      const index = groupStartIndex + group.items.indexOf(item);
      return `<tr>
        <td class="code-cell">${escapeHtml(item.code)}</td>
        <td class="description-cell">${escapeHtml(item.description)}${miscInfoButtonHtml(item, index)}</td>
        <td><span class="value-badge ${generalValueClass(item.value)}">${escapeHtml(item.value)}</span></td>
        <td class="action-cell">${addCodeButtonHtml(item, "misc", index)}</td>
      </tr>`;
    }).join("");

    return `<section class="general-group">
      <h3>${escapeHtml(group.title)}</h3>
      <div class="general-table-wrap">
        <table class="general-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;
  }).join("");
}

function infoSectionHtml(title, items) {
  if (!items?.length) return "";
  return `<section class="info-section">
    <h3>${escapeHtml(title)}</h3>
    <ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
  </section>`;
}

function openInfoDialog(item) {
  const codeLabel = item.valueType ? displayCode(item) : item.code;
  const code = codeLabel ? `${codeLabel} - ` : "";
  els.infoDialogTitle.textContent = `${code}${item.description}`;
  els.infoDialogBody.innerHTML = [
    infoSectionHtml("Notes", item.notes),
    infoSectionHtml("Payment rules", item.paymentRules),
    infoSectionHtml("Claims submission instructions", item.claimsSubmissionInstructions),
    infoSectionHtml("Commentary", item.commentary),
    infoSectionHtml("Medical record requirements", item.medicalRecordRequirements)
  ].join("");

  if (typeof els.infoDialog.showModal === "function") {
    els.infoDialog.showModal();
    return;
  }

  els.infoDialog.setAttribute("open", "");
}

function closeInfoDialog() {
  if (typeof els.infoDialog.close === "function") {
    els.infoDialog.close();
    return;
  }

  els.infoDialog.removeAttribute("open");
}

function setShortlistView(view, shouldUpdateHash = true) {
  state.shortlistView = SHORTLIST_VIEWS.has(view) ? view : "general";

  els.shortlistTabs.forEach((tab) => {
    const isActive = tab.dataset.shortlistView === state.shortlistView;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  els.shortlistPanels.forEach((panel) => {
    const isActive = panel.dataset.shortlistPanel === state.shortlistView;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  if (shouldUpdateHash && state.view === "shortlist") {
    history.replaceState(null, "", `#${state.shortlistView}`);
  }
}

function setBillingSheet(open) {
  els.billingCard.classList.toggle("expanded", open);
  els.billingSheetToggle.setAttribute("aria-expanded", String(open));
  els.billingSheetBackdrop.hidden = !open;
  document.body.classList.toggle("billing-sheet-open", open);
}

function setView(view, shouldUpdateHash = true) {
  const nextView = String(view || "").replace("#", "");
  setBillingSheet(false);
  const isShortlistView = SHORTLIST_VIEWS.has(nextView);
  state.view = isShortlistView ? "shortlist" : VIEWS.has(nextView) ? nextView : "lookup";
  if (isShortlistView) setShortlistView(nextView, false);

  els.viewTabs.forEach((tab) => {
    const isActive = tab.dataset.view === state.view;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  els.viewPanels.forEach((panel) => {
    const isActive = panel.dataset.viewPanel === state.view;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  if (shouldUpdateHash) {
    const hashView = state.view === "shortlist" ? state.shortlistView : state.view;
    history.replaceState(null, "", state.view === "lookup" ? location.pathname : `#${hashView}`);
  }
}

function renderAll() {
  renderCategories();
  renderSubcategories();
  renderRows();
}

function parseTime(value) {
  const cleaned = value.trim();
  const meridiem = /\s*([ap])\.?m?\.?$/i.exec(cleaned);
  if (meridiem) {
    const rest = cleaned.slice(0, meridiem.index);
    const match = /^(\d{1,2})(?::?([0-5]\d))?$/.exec(rest);
    if (!match) return null;
    const [, hours, minutes] = match;
    const hourValue = Number(hours);
    if (hourValue < 1 || hourValue > 12) return null;
    const isPm = meridiem[1].toLowerCase() === "p";
    const hour24 = (hourValue % 12) + (isPm ? 12 : 0);
    return hour24 * 60 + Number(minutes || 0);
  }
  const compact = /^(\d{1,2})([0-5]\d)$/.exec(cleaned);
  const match = /^(\d{1,2}):([0-5]\d)$/.exec(cleaned) || compact;
  if (!match) return null;
  const [, hours, minutes] = match;
  const hourValue = Number(hours);
  if (hourValue > 23) return null;
  return hourValue * 60 + Number(minutes);
}

function formatTimeInput(input) {
  const parsed = parseTime(input.value);
  if (parsed === null) return;
  const hours = Math.floor(parsed / 60);
  const minutes = parsed % 60;
  input.value = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function generalAnesthesiaUnits(minutes) {
  if (minutes <= 0) return 0;
  if (minutes <= 60) return Math.ceil(minutes / 15);
  if (minutes <= 75) return 6;
  if (minutes <= 90) return 8;
  if (minutes <= 1440) return 11 + (Math.ceil((minutes - 90) / 15) - 1) * 3;
  return null;
}

const POOL_CUTOFF_MINUTES = 15 * 60; // group billings pooled until 15:00

function extraUnitsAfterCutoff(start, elapsed) {
  if (start >= POOL_CUTOFF_MINUTES) return 0;
  const boundary = Math.ceil((POOL_CUTOFF_MINUTES - start) / 15) * 15;
  if (elapsed <= boundary) return 0;
  const total = generalAnesthesiaUnits(elapsed);
  if (total === null) return null;
  return total - generalAnesthesiaUnits(boundary);
}

function p016Units(minutes) {
  return Math.min(12, Math.ceil(minutes / 30));
}

function e100Units(minutes) {
  return 4 + Math.ceil(minutes / 15);
}

const CALCULATOR_FILTERS = [
  { key: "All", label: "All" },
  { key: "time", label: "Time Units" },
  { key: "iss", label: "ISS" },
  { key: "weight", label: "Weight" },
  { key: "height", label: "Height" },
  { key: "bmi", label: "BMI" },
  { key: "ebl", label: "Blood loss" }
];

function renderCalculatorFilters() {
  els.calculatorFilters.innerHTML = CALCULATOR_FILTERS.map(({ key, label }) => {
    const isActive = state.calculatorFilter === key;
    return `<button class="general-filter-button${isActive ? " active" : ""}" type="button" data-calculator-filter="${escapeAttr(key)}" aria-pressed="${isActive}">${escapeHtml(label)}</button>`;
  }).join("");
}

function applyCalculatorFilter() {
  els.calculatorCards.forEach((card) => {
    card.hidden = state.calculatorFilter !== "All" && card.dataset.calculator !== state.calculatorFilter;
  });
}

function updateCalculator() {
  const hasStartValue = els.startTime.value.trim() !== "";
  const hasEndValue = els.endTime.value.trim() !== "";
  const startInput = parseTime(els.startTime.value);
  const endInput = parseTime(els.endTime.value);
  const hasValidTimes = startInput !== null && endInput !== null;
  const startInvalid = hasStartValue && startInput === null;
  const endInvalid = hasEndValue && endInput === null;

  els.startTime.classList.toggle("invalid", startInvalid);
  els.endTime.classList.toggle("invalid", endInvalid);
  els.startTime.setAttribute("aria-invalid", String(startInvalid));
  els.endTime.setAttribute("aria-invalid", String(endInvalid));

  if (!hasValidTimes) {
    els.elapsedTime.textContent = "--";
    els.timeUnits.textContent = "--";
    els.euUnits.textContent = "--";
    els.calcNote.textContent = startInvalid || endInvalid
      ? "Enter times like 08:30, 0830, or 8:30am."
      : "Enter a start and end time to calculate anesthesia time units.";
    return;
  }

  let start = startInput;
  let end = endInput;
  if (end <= start) end += 24 * 60;
  const elapsed = end - start;
  const mode = els.calcMode.value;
  let units = 0;
  let eu = null;
  let note = "";

  if (mode === "general") {
    units = generalAnesthesiaUnits(elapsed);
    eu = extraUnitsAfterCutoff(start, elapsed);
    note = units === null
      ? "Review anesthesia time beyond 24 hours."
      : "Appendix H anesthesia time table, extended past 8h30m at 3 units per 15 min. EU counts time units after 15:00 for cases starting before 15:00.";
  } else if (mode === "p016") {
    units = p016Units(elapsed);
    note = "P016C: 1 unit for each half-hour, maximum 12 units per patient, per physician, per day.";
  } else {
    units = e100Units(elapsed);
    note = "E100C: 4 base units plus 1 unit for each quarter-hour of constant attendance at delivery.";
  }

  els.elapsedTime.textContent = `${elapsed} min`;
  els.timeUnits.textContent = units === null ? "Review" : String(units);
  els.euUnits.textContent = mode !== "general" ? "--" : eu === null ? "Review" : String(eu);
  els.calcNote.textContent = note;
}

function updateIssCalculator() {
  const regionScores = Array.from(els.issScores).map((input) => ({
    region: input.dataset.region,
    score: Number(input.value)
  }));

  const topRegions = regionScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.region.localeCompare(b.region))
    .slice(0, 3);
  const iss = topRegions.reduce((total, item) => total + item.score ** 2, 0);

  els.issScore.textContent = String(iss);
  els.issE420.textContent = iss > 15 ? "Yes" : "No";
  els.issE420.classList.toggle("eligible", iss > 15);
  els.issNote.textContent = iss > 15
    ? "E420 applies within 24 hr when ISS is greater than 15."
    : "ISS is the sum of squares of the three highest AIS body-region scores.";
}

const LBS_PER_KG = 2.20462;

function roundToTenth(value) {
  return Math.round(value * 10) / 10;
}

function convertWeight(source) {
  const from = source === "kg" ? els.weightKg : els.weightLbs;
  const to = source === "kg" ? els.weightLbs : els.weightKg;
  const value = Number.parseFloat(from.value);
  if (!Number.isFinite(value)) {
    to.value = "";
    return;
  }
  const factor = source === "kg" ? LBS_PER_KG : 1 / LBS_PER_KG;
  to.value = String(roundToTenth(value * factor));
}

function updateHeightConverter() {
  const feet = Number.parseFloat(els.heightFeet.value);
  const inches = Number.parseFloat(els.heightInches.value);
  const hasFeet = Number.isFinite(feet);
  const hasInches = Number.isFinite(inches);
  if (!hasFeet && !hasInches) {
    els.heightCm.textContent = "--";
    return;
  }
  const totalInches = (hasFeet ? feet * 12 : 0) + (hasInches ? inches : 0);
  els.heightCm.textContent = `${roundToTenth(totalInches * 2.54)} cm`;
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal weight";
  if (bmi < 30) return "overweight";
  return "obese";
}

function updateBmiCalculator() {
  const weight = Number.parseFloat(els.bmiWeight.value);
  const height = Number.parseFloat(els.bmiHeight.value);
  if (!(weight > 0) || !(height > 0)) {
    els.bmiValue.textContent = "--";
    els.bmiE010.textContent = "No";
    els.bmiE010.classList.remove("eligible");
    els.bmiNote.textContent = "BMI is weight (kg) divided by height (m) squared. E010: 2 units when BMI > 40.";
    return;
  }
  const bmi = weight / (height / 100) ** 2;
  const eligible = bmi > 40;
  els.bmiValue.textContent = String(roundToTenth(bmi));
  els.bmiE010.textContent = eligible ? "Yes" : "No";
  els.bmiE010.classList.toggle("eligible", eligible);
  els.bmiNote.textContent = eligible
    ? `BMI ${roundToTenth(bmi)} (${bmiCategory(bmi)}). E010 applies: 2 units when BMI is greater than 40.`
    : `BMI ${roundToTenth(bmi)} (${bmiCategory(bmi)}). E010: 2 units when BMI > 40.`;
}

const EBV_ML_PER_KG = { male: 75, female: 65 };
const EBL_DEFAULT_NOTE = "ABL = EBV × (start − threshold) ÷ average Hgb. EBV: 75 mL/kg male, 65 mL/kg female.";

function updateEblCalculator() {
  const weight = Number.parseFloat(els.eblWeight.value);
  const hgbStart = Number.parseFloat(els.eblHgbStart.value);
  const hgbThreshold = Number.parseFloat(els.eblHgbThreshold.value);
  const perKg = EBV_ML_PER_KG[els.eblSex.value] ?? EBV_ML_PER_KG.male;

  const hasWeight = weight > 0;
  const ebv = weight * perKg;
  els.eblVolume.textContent = hasWeight ? `${Math.round(ebv)} mL` : "--";

  if (!hasWeight || !(hgbStart > 0) || !(hgbThreshold > 0)) {
    els.eblResult.textContent = "--";
    els.eblNote.textContent = EBL_DEFAULT_NOTE;
    return;
  }
  if (hgbStart <= hgbThreshold) {
    els.eblResult.textContent = "--";
    els.eblNote.textContent = "Starting Hgb must be above the threshold to estimate allowable blood loss.";
    return;
  }
  const abl = (ebv * (hgbStart - hgbThreshold)) / ((hgbStart + hgbThreshold) / 2);
  els.eblResult.textContent = `${Math.round(abl)} mL`;
  els.eblNote.textContent = EBL_DEFAULT_NOTE;
}

function normalizedCode(value) {
  return String(value || "").toUpperCase().replace(/\s+/g, "");
}

function billingCodeBase(value) {
  return normalizedCode(value).replace(/C$/, "");
}

function codeVariants(value) {
  const code = normalizedCode(value);
  return code.endsWith("C") ? [code, code.slice(0, -1)] : [code, `${code}C`];
}

function findCodeItem(value) {
  const variants = codeVariants(value);
  return codes.find((item) => variants.includes(normalizedCode(item.code)))
    || codes.find((item) => variants.includes(normalizedCode(displayCode(item))));
}

function shortlistItemToCode(item, category, subcategory) {
  const value = String(item.value || "");
  const isUnits = value.includes("unit");
  const isPercent = value.includes("%");
  return {
    code: item.code,
    description: item.description,
    category,
    subcategory,
    valueType: isUnits ? "base_units" : isPercent ? "premium_percent" : "fee",
    baseUnits: isUnits ? Number.parseInt(value, 10) : null,
    fee: isUnits ? null : value.replace(/^\$/, ""),
    sourceRef: item.sourceRef,
    notes: item.notes,
    paymentRules: item.paymentRules,
    commentary: item.commentary,
    medicalRecordRequirements: item.medicalRecordRequirements,
    claimsSubmissionInstructions: item.claimsSubmissionInstructions
  };
}

function billingSourceItem(source, index) {
  if (source === "codes") return codes[index];
  if (source === "general") {
    const item = generalItems[index];
    return item ? findCodeItem(item.code) || shortlistItemToCode(item, "General Preamble", "General shortlist") : null;
  }
  if (source === "procedure") {
    const item = procedureItems[index];
    return item ? findCodeItem(item.code) || shortlistItemToCode(item, "Procedure Fees", "Procedure Fees") : null;
  }
  if (source === "misc") {
    const item = miscItems[index];
    return item ? findCodeItem(item.code) || shortlistItemToCode(item, "Misc", "Misc") : null;
  }
  return null;
}

function addBillingItem(item) {
  if (!item) return;
  state.billingItems.push({
    id: state.billingNextId,
    item
  });
  state.billingNextId += 1;
  syncBillingQuickControls();
  renderBillingCard();
  return true;
}

function addBillingCode(code) {
  addBillingItem(findCodeItem(code));
}

function showAddFeedback(target, item) {
  if (!target || !item) return;
  const button = target.matches?.(".add-code-button") ? target : target.querySelector?.(".add-code-button");
  const row = target.closest?.("tr") || target.closest?.(".billing-search-row");

  if (button) {
    window.clearTimeout(button.feedbackTimer);
    button.classList.add("added");
    button.textContent = "OK";
    button.setAttribute("aria-label", `Added ${displayCode(item)} to billing card`);
    button.feedbackTimer = window.setTimeout(() => {
      button.classList.remove("added");
      button.textContent = "+";
      button.setAttribute("aria-label", `Add ${displayCode(item)} to billing card`);
    }, 1000);
  }

  if (row) {
    window.clearTimeout(row.feedbackTimer);
    row.classList.add("just-added");
    row.feedbackTimer = window.setTimeout(() => {
      row.classList.remove("just-added");
    }, 1000);
  }
}

function addBillingItemFromControl(control) {
  const item = billingSourceItem(control.dataset.billingSource, Number(control.dataset.billingIndex));
  if (!addBillingItem(item)) return;
  showAddFeedback(control, item);
}

function removeBillingItem(id) {
  state.billingItems = state.billingItems.filter((entry) => entry.id !== id);
  syncBillingQuickControls();
  renderBillingCard();
}

function removeBillingCodes(codeList) {
  const removals = new Set(codeList.flatMap(codeVariants));
  state.billingItems = state.billingItems.filter(({ item }) => !removals.has(normalizedCode(displayCode(item))) && !removals.has(normalizedCode(item.code)));
}

function setExclusiveBillingCode(codeList, selectedCode) {
  removeBillingCodes(codeList);
  if (selectedCode) addBillingCode(selectedCode);
  syncBillingQuickControls();
  renderBillingCard();
}

function setToggleBillingCode(code, isChecked) {
  removeBillingCodes([code]);
  if (isChecked) addBillingCode(code);
  syncBillingQuickControls();
  renderBillingCard();
}

function hasBillingCode(code) {
  const variants = new Set(codeVariants(code));
  return state.billingItems.some(({ item }) => variants.has(normalizedCode(displayCode(item))) || variants.has(normalizedCode(item.code)));
}

function isBundleActive(bundle) {
  return bundle.codes.every((code) => hasBillingCode(code));
}

function renderBundleButtons() {
  els.billingBundles.innerHTML = CODE_BUNDLES
    .filter((bundle) => bundle.codes.every((code) => findCodeItem(code)))
    .map((bundle) => {
      const active = isBundleActive(bundle);
      return `<button type="button" class="quick-add-button bundle-button${active ? " bundle-button-active" : ""}" data-bundle-id="${escapeAttr(bundle.id)}" aria-pressed="${active}">${escapeHtml(bundle.label)}</button>`;
    }).join("");
}

function toggleBundle(bundleId) {
  const bundle = CODE_BUNDLES.find((entry) => entry.id === bundleId);
  if (!bundle) return;
  if (isBundleActive(bundle)) {
    removeBillingCodes(bundle.codes);
  } else {
    bundle.codes.forEach((code) => {
      removeBillingCodes([code]);
      addBillingCode(code);
    });
  }
  syncBillingQuickControls();
  renderBillingCard();
}

function renderQuickAddDialog() {
  els.quickAddDialogBody.innerHTML = QUICK_ADD_GROUPS.map((group, groupIndex) => `
    <section class="quick-add-group">
      <h3>${escapeHtml(group.title)}${group.exclusive ? ` <span class="quick-add-hint">select one</span>` : ""}</h3>
      <div class="quick-add-options">
        ${group.options.map((option) => {
          const item = findCodeItem(option.code);
          return `<label class="check-row quick-add-option">
            <input type="checkbox" data-quick-code="${escapeAttr(option.code)}" data-quick-group="${groupIndex}" />
            <span class="quick-add-text"><strong>${escapeHtml(item ? displayCode(item) : option.code)}</strong><span class="quick-add-desc">${escapeHtml(option.label)}</span></span>
            ${item ? valueHtml(item) : ""}
          </label>`;
        }).join("")}
      </div>
    </section>`).join("");
}

function syncBillingQuickControls() {
  const selected = [];
  els.quickAddDialogBody.querySelectorAll("[data-quick-code]").forEach((input) => {
    const checked = hasBillingCode(input.dataset.quickCode);
    input.checked = checked;
    if (checked) {
      const item = findCodeItem(input.dataset.quickCode);
      selected.push(item ? displayCode(item) : input.dataset.quickCode);
    }
  });
  els.billingQuickAddSummary.innerHTML = selected.length
    ? selected.map((code) => `<span class="quick-add-chip">${escapeHtml(code)}</span>`).join("")
    : `<p class="calc-note">No common codes selected.</p>`;
  renderBundleButtons();
}

function openQuickAddDialog() {
  syncBillingQuickControls();
  if (typeof els.quickAddDialog.showModal === "function") {
    els.quickAddDialog.showModal();
    return;
  }
  els.quickAddDialog.setAttribute("open", "");
}

function closeQuickAddDialog() {
  if (typeof els.quickAddDialog.close === "function") {
    els.quickAddDialog.close();
    return;
  }
  els.quickAddDialog.removeAttribute("open");
}

function openCodeSearchDialog() {
  if (typeof els.codeSearchDialog.showModal === "function") {
    els.codeSearchDialog.showModal();
  } else {
    els.codeSearchDialog.setAttribute("open", "");
  }
  els.billingCodeSearch.focus();
  els.billingCodeSearch.select();
}

function closeCodeSearchDialog() {
  if (typeof els.codeSearchDialog.close === "function") {
    els.codeSearchDialog.close();
    return;
  }
  els.codeSearchDialog.removeAttribute("open");
}

function parseCurrency(value) {
  const amount = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function parsePercent(value) {
  const percent = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(percent) ? percent / 100 : 0;
}

function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function money(value) {
  return `$${roundCurrency(value).toFixed(2)}`;
}

function getBillingTime() {
  const hasStartValue = els.billingStartTime.value.trim() !== "";
  const hasEndValue = els.billingEndTime.value.trim() !== "";
  const startInput = parseTime(els.billingStartTime.value);
  const endInput = parseTime(els.billingEndTime.value);
  const startInvalid = hasStartValue && startInput === null;
  const endInvalid = hasEndValue && endInput === null;

  els.billingStartTime.classList.toggle("invalid", startInvalid);
  els.billingEndTime.classList.toggle("invalid", endInvalid);
  els.billingStartTime.setAttribute("aria-invalid", String(startInvalid));
  els.billingEndTime.setAttribute("aria-invalid", String(endInvalid));

  if (startInput === null || endInput === null) {
    return {
      elapsed: null,
      units: null,
      eu: null,
      note: startInvalid || endInvalid
        ? "Enter times like 09:00, 0900, or 9am."
        : "Enter start and stop times to add time units to the card."
    };
  }

  let start = startInput;
  let end = endInput;
  if (end <= start) end += 24 * 60;
  const elapsed = end - start;
  const units = generalAnesthesiaUnits(elapsed);
  return {
    elapsed,
    units,
    eu: extraUnitsAfterCutoff(startInput, elapsed),
    note: units === null
      ? "Review anesthesia time beyond 24 hours."
      : "Time units use the general anesthesia time-unit table. EU counts time units after 15:00 for cases starting before 15:00."
  };
}

function isExtraUnitItem(item) {
  const code = normalizedCode(displayCode(item));
  return item.subcategory?.toLowerCase().includes("extra units")
    || ["E007C", "E009C", "E010C", "E011C", "E012C", "E014C", "E016C", "E017C", "E018C", "E019C", "E020C", "E021C", "E022C", "E024C", "E025C"].includes(code);
}

function isAfterHoursProcedurePremiumEligibleCode(value) {
  const code = billingCodeBase(value);
  if (AFTER_HOURS_PROCEDURE_PREMIUM_CODES.has(code)) return true;

  return AFTER_HOURS_PROCEDURE_PREMIUM_RANGES.some(({ prefix, start, end }) => {
    if (!code.startsWith(prefix)) return false;
    const number = Number(code.slice(prefix.length));
    return Number.isInteger(number) && number >= start && number <= end;
  });
}

function premiumBaseFor(item, totals) {
  const code = normalizedCode(displayCode(item));
  if (code === "E420C" || code === "E420") {
    return {
      amount: totals.basicTimeSubtotal,
      label: "Primary procedure basic units + time units"
    };
  }
  if (code === "E400C" || code === "E400" || code === "E401C" || code === "E401") {
    // Deliberate simplification: strictly, E400/E401 (GP94) cover only the
    // anaesthetic fee and eligible procedure fees take E409/E410 (GP104) at the
    // same rates. Since both premiums share the same after-hours windows, this
    // app folds the procedural premium into E400/E401 rather than requiring a
    // separate E409/E410 line.
    return {
      amount: totals.anesthesiaSubtotal + totals.afterHoursProcedureSubtotal,
      label: "Total anaesthetic fee + eligible procedure fees"
    };
  }
  if (["E409", "E410", "E412", "E413"].includes(code.replace(/C$/, ""))) {
    return {
      amount: totals.afterHoursProcedureSubtotal,
      label: "Eligible after-hours procedure fees"
    };
  }
  return {
    amount: 0,
    label: "Review base"
  };
}

function billingSearchResults() {
  const query = state.billingQuery;
  if (!query) return [];
  return codes
    .filter((item) => matchesItemQuery(item, query))
    .sort((a, b) => {
      const aCode = normalizedCode(displayCode(a));
      const bCode = normalizedCode(displayCode(b));
      const queryCode = normalizedCode(query);
      const exact = Number(bCode === queryCode) - Number(aCode === queryCode);
      if (exact) return exact;
      return aCode.localeCompare(bCode);
    })
    .slice(0, BILLING_SEARCH_LIMIT);
}

function renderBillingSearch() {
  const results = billingSearchResults();
  if (!state.billingQuery) {
    els.billingSearchResults.innerHTML = "";
    return;
  }
  if (!results.length) {
    els.billingSearchResults.innerHTML = `<p class="billing-search-empty">No matching codes.</p>`;
    return;
  }

  els.billingSearchResults.innerHTML = results.map((item) => {
    const index = codes.indexOf(item);
    const contextParts = [
      item.subcategory ? escapeHtml(item.subcategory) : null,
      item.context ? `<span class="context-em">${escapeHtml(item.context)}</span>` : null
    ].filter(Boolean);
    const contextLine = contextParts.length
      ? `<span class="billing-search-context">${contextParts.join(" &middot; ")}</span>`
      : "";
    return `<button class="billing-search-row" type="button" data-billing-source="codes" data-billing-index="${index}" title="${escapeAttr(item.description)}">
      <span class="billing-search-code">${escapeHtml(displayCode(item))}</span>
      <span class="billing-search-description">${escapeHtml(item.description)}</span>
      <span>${valueHtml(item)}</span>
      ${contextLine}
    </button>`;
  }).join("");
}

function billingCardDescriptor(item) {
  if (isExtraUnitItem(item)) {
    return item.description.replace(/^Extra units\s*-\s*/i, "");
  }
  return item.description;
}

// Mirrors premiumBaseFor(): returns the ids of the rows whose fees make up
// the base that a percent premium is applied to.
function getContributorRowIds(premiumCode, rows) {
  const code = premiumCode.replace(/C$/, "");
  if (code === "E420") {
    const primary = rows
      .filter((row) => row.unitCount !== undefined && row.id !== "time" && !row.isExtra && normalizedCode(row.code).endsWith("C"))
      .reduce((best, row) => (best && best.unitCount >= row.unitCount ? best : row), null);
    return rows
      .filter((row) => row.id === "time" || (primary && row.id === primary.id))
      .map((row) => row.id);
  }
  if (code === "E400" || code === "E401") {
    return rows
      .filter((row) => row.unitCount !== undefined || row.afterHoursProcedurePremiumEligible)
      .map((row) => row.id);
  }
  if (["E409", "E410", "E412", "E413"].includes(code)) {
    return rows
      .filter((row) => row.afterHoursProcedurePremiumEligible)
      .map((row) => row.id);
  }
  return [];
}

function renderBillingCard() {
  const unitFee = ANESTHESIOLOGIST_UNIT_FEE;
  const time = getBillingTime();
  const rows = [];
  const unitRows = [];
  const feeRows = [];
  const percentRows = [];

  els.billingElapsedTime.textContent = time.elapsed === null ? "--" : `${time.elapsed} min`;
  els.billingTimeUnits.textContent = time.units === null ? "--" : String(time.units);
  els.billingEuUnits.textContent = time.eu === null ? "--" : String(time.eu);
  els.billingHeaderEu.textContent = time.eu === null ? "--" : String(time.eu);
  els.billingTimeNote.textContent = time.note;

  if (time.units !== null && time.units > 0) {
    const amount = time.units * unitFee;
    const row = {
      id: "time",
      code: "TIME",
      description: "Anesthesia time",
      value: `${time.units} units`,
      amount,
      removable: false,
      unitCount: time.units,
      isExtra: false
    };
    rows.push(row);
    unitRows.push(row);
  }

  state.billingItems.forEach(({ id, item }) => {
    if (item.valueType === "base_units") {
      const units = Number(item.baseUnits || 0);
      const row = {
        id,
        code: displayCode(item),
        description: billingCardDescriptor(item),
        value: `${units} units`,
        amount: units * unitFee,
        removable: true,
        unitCount: units,
        isExtra: isExtraUnitItem(item)
      };
      rows.push(row);
      unitRows.push(row);
      return;
    }

    if (item.valueType === "premium_percent") {
      percentRows.push({ id, item });
      return;
    }

    const amount = parseCurrency(item.fee);
    const row = {
      id,
      code: displayCode(item),
      description: billingCardDescriptor(item),
      value: money(amount),
      amount,
      removable: true,
      category: item.category,
      afterHoursProcedurePremiumEligible: isAfterHoursProcedurePremiumEligibleCode(displayCode(item))
    };
    rows.push(row);
    feeRows.push(row);
  });

  const timeUnitsSubtotal = unitRows
    .filter((row) => row.id === "time")
    .reduce((total, row) => total + row.amount, 0);
  const primaryProcedureRow = unitRows
    .filter((row) => !row.isExtra && row.id !== "time" && normalizedCode(row.code).endsWith("C"))
    .reduce((best, row) => (best && best.unitCount >= row.unitCount ? best : row), null);

  const totals = {
    anesthesiaSubtotal: unitRows.reduce((total, row) => total + row.amount, 0),
    basicTimeSubtotal: (primaryProcedureRow ? primaryProcedureRow.amount : 0) + timeUnitsSubtotal,
    procedureSubtotal: feeRows.reduce((total, row) => total + row.amount, 0),
    afterHoursProcedureSubtotal: feeRows
      .filter((row) => row.afterHoursProcedurePremiumEligible)
      .reduce((total, row) => total + row.amount, 0)
  };

  percentRows.forEach(({ id, item }) => {
    const percent = parsePercent(item.fee);
    const base = premiumBaseFor(item, totals);
    const code = displayCode(item);
    rows.push({
      id,
      code,
      description: billingCardDescriptor(item),
      value: `${Math.round(percent * 100)}%`,
      amount: roundCurrency(base.amount * percent),
      removable: true,
      contributorIds: getContributorRowIds(normalizedCode(code), rows)
    });
  });

  const totalUnits = unitRows.reduce((total, row) => total + row.unitCount, 0);
  const grandTotal = rows.reduce((total, row) => total + row.amount, 0);

  els.billingTotalUnits.textContent = String(totalUnits);
  els.billingGrandTotal.textContent = money(grandTotal);
  els.billingStickyUnits.textContent = String(totalUnits);
  els.billingStickyTotal.textContent = money(grandTotal);
  els.billingTabBadge.textContent = String(state.billingItems.length);
  els.billingTabBadge.hidden = state.billingItems.length === 0;
  const ledgerRows = rows;
  els.billingCardContext.textContent = ledgerRows.length
    ? `${ledgerRows.length} ${ledgerRows.length === 1 ? "line" : "lines"} ready for transfer`
    : "No codes added yet";
  els.billingEmptyState.hidden = rows.length > 0;
  els.billingPaperStart.textContent = els.billingStartTime.value.trim() || " ";
  els.billingPaperFinish.textContent = els.billingEndTime.value.trim() || " ";
  const timeUnitCount = time.units !== null && time.units > 0 ? time.units : 0;
  const surgeryTimeUnitCount = (primaryProcedureRow ? primaryProcedureRow.unitCount : 0) + timeUnitCount;
  els.billingPaperTotalUnits.textContent = totalUnits > 0 ? String(totalUnits) : " ";
  els.billingPaperBasicUnits.textContent = surgeryTimeUnitCount > 0 ? String(surgeryTimeUnitCount) : " ";
  els.billingPaperTime.textContent = time.units === null ? " " : String(time.units);
  els.billingPaperEu.textContent = time.eu === null ? " " : String(time.eu);
  const MIN_LEDGER_ROWS = 6;
  const blankLedgerRows = Array.from(
    { length: Math.max(0, MIN_LEDGER_ROWS - ledgerRows.length) },
    () => `<div class="paper-row paper-row-blank"><div class="paper-cell-code"></div><div class="paper-cell-units"></div><div class="paper-cell-action"></div></div>`
  ).join("");
  els.billingCardBody.innerHTML = ledgerRows.map((row) => `<div class="paper-row" data-row-id="${row.id}"${row.contributorIds && row.contributorIds.length ? ` data-contributors="${row.contributorIds.join(",")}"` : ""}>
    <div class="paper-cell-code">
      <strong class="paper-code">${escapeHtml(row.code)}</strong>
      <span class="paper-desc" title="${escapeAttr(row.description)}">${escapeHtml(row.description)}</span>
    </div>
    <div class="paper-cell-units">
      <strong class="paper-value">${escapeHtml(row.value)}</strong>
      ${row.value === money(row.amount) ? "" : `<span class="paper-amount">${money(row.amount)}</span>`}
    </div>
    <div class="paper-cell-action">${row.removable ? `<button class="remove-code-button" type="button" data-billing-remove="${row.id}" aria-label="Remove ${escapeAttr(row.code)}" title="Remove">x</button>` : ""}</div>
  </div>`).join("") + blankLedgerRows;
  els.billingSummary.innerHTML = rows.length === 0
    ? ""
    : `<div class="paper-total-fee"><span class="paper-label">Total Fee</span><strong class="paper-value">${money(grandTotal)}</strong></div>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

els.sourceMeta.textContent = ohipAnesthesiaData.metadata.effectiveDate;

els.viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setView(tab.dataset.view);
  });
});

els.shortlistTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setShortlistView(tab.dataset.shortlistView);
  });
});

window.addEventListener("hashchange", () => {
  setView(location.hash.replace("#", ""), false);
});

els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  state.displayLimit = DISPLAY_STEP;
  renderRows();
});

els.categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;
  state.subcategory = "All";
  state.displayLimit = DISPLAY_STEP;
  renderAll();
});

els.subcategorySelect.addEventListener("change", (event) => {
  state.subcategory = event.target.value;
  state.displayLimit = DISPLAY_STEP;
  renderRows();
});

els.clearFilters.addEventListener("click", () => {
  state.category = "All";
  state.subcategory = "All";
  state.query = "";
  state.displayLimit = DISPLAY_STEP;
  els.searchInput.value = "";
  renderAll();
});

els.showMoreButton.addEventListener("click", () => {
  state.displayLimit += DISPLAY_STEP;
  renderRows();
});

els.codesBody.addEventListener("click", (event) => {
  const infoButton = event.target.closest(".info-button");
  if (infoButton) {
    const item = codes[Number(infoButton.dataset.codeIndex)];
    if (item) openInfoDialog(item);
    return;
  }

  const addButton = event.target.closest(".add-code-button");
  if (!addButton) return;
  addBillingItemFromControl(addButton);
});

els.generalGroups.addEventListener("click", (event) => {
  const infoButton = event.target.closest(".info-button");
  if (infoButton) {
    const item = generalItems[Number(infoButton.dataset.generalIndex)];
    if (item) openInfoDialog(item);
    return;
  }

  const addButton = event.target.closest(".add-code-button");
  if (!addButton) return;
  addBillingItemFromControl(addButton);
});

els.generalFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".general-filter-button");
  if (!button) return;
  state.generalFilter = button.dataset.generalFilter;
  renderGeneralFilters();
  renderGeneralPane();
});

els.procedureGroups.addEventListener("click", (event) => {
  const infoButton = event.target.closest(".info-button");
  if (infoButton) {
    const item = procedureItems[Number(infoButton.dataset.procedureIndex)];
    if (item) openInfoDialog(item);
    return;
  }

  const addButton = event.target.closest(".add-code-button");
  if (!addButton) return;
  addBillingItemFromControl(addButton);
});

els.procedureFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".general-filter-button");
  if (!button) return;
  state.procedureFilter = button.dataset.procedureFilter;
  renderProcedureFilters();
  renderProcedurePane();
});

els.miscGroups.addEventListener("click", (event) => {
  const infoButton = event.target.closest(".info-button");
  if (infoButton) {
    const item = miscItems[Number(infoButton.dataset.miscIndex)];
    if (item) openInfoDialog(item);
    return;
  }

  const addButton = event.target.closest(".add-code-button");
  if (!addButton) return;
  addBillingItemFromControl(addButton);
});

els.calculatorFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".general-filter-button");
  if (!button) return;
  state.calculatorFilter = button.dataset.calculatorFilter;
  renderCalculatorFilters();
  applyCalculatorFilter();
});

els.miscFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".general-filter-button");
  if (!button) return;
  state.miscFilter = button.dataset.miscFilter;
  renderMiscFilters();
  renderMiscPane();
});

els.infoDialogClose.addEventListener("click", closeInfoDialog);

els.infoDialog.addEventListener("click", (event) => {
  if (event.target === els.infoDialog) closeInfoDialog();
});

[els.calcMode, els.startTime, els.endTime].forEach((el) => {
  el.addEventListener("input", updateCalculator);
  el.addEventListener("change", updateCalculator);
});

[els.startTime, els.endTime].forEach((el) => {
  el.addEventListener("blur", () => {
    formatTimeInput(el);
    updateCalculator();
  });
});

els.issScores.forEach((el) => {
  el.addEventListener("change", updateIssCalculator);
});

els.weightKg.addEventListener("input", () => convertWeight("kg"));
els.weightLbs.addEventListener("input", () => convertWeight("lbs"));

[els.heightFeet, els.heightInches].forEach((el) => {
  el.addEventListener("input", updateHeightConverter);
});

[els.bmiWeight, els.bmiHeight].forEach((el) => {
  el.addEventListener("input", updateBmiCalculator);
});

[els.eblWeight, els.eblHgbStart, els.eblHgbThreshold].forEach((el) => {
  el.addEventListener("input", updateEblCalculator);
});
els.eblSex.addEventListener("change", updateEblCalculator);

els.billingCodeSearch.addEventListener("input", (event) => {
  state.billingQuery = event.target.value.trim().toLowerCase();
  renderBillingSearch();
});

els.billingSearchResults.addEventListener("click", (event) => {
  const row = event.target.closest("[data-billing-source]");
  if (!row) return;
  addBillingItemFromControl(row);
});

els.billingSheetToggle.addEventListener("click", () => {
  setBillingSheet(!els.billingCard.classList.contains("expanded"));
});

els.billingSheetBackdrop.addEventListener("click", () => setBillingSheet(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.billingCard.classList.contains("expanded")) setBillingSheet(false);
});

els.billingCardBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-billing-remove]");
  if (!button) return;
  removeBillingItem(Number(button.dataset.billingRemove));
});

els.billingCardBody.addEventListener("mouseover", (event) => {
  const premiumRow = event.target.closest(".paper-row[data-contributors]");
  if (!premiumRow || premiumRow.classList.contains("paper-row-premium-hover")) return;
  const ids = premiumRow.dataset.contributors.split(",");
  els.billingCardBody.querySelectorAll(".paper-row[data-row-id]").forEach((row) => {
    row.classList.toggle("paper-row-contributor-highlighted", ids.includes(row.dataset.rowId));
  });
  premiumRow.classList.add("paper-row-premium-hover");
});

els.billingCardBody.addEventListener("mouseout", (event) => {
  const premiumRow = event.target.closest(".paper-row[data-contributors]");
  if (!premiumRow || premiumRow.contains(event.relatedTarget)) return;
  premiumRow.classList.remove("paper-row-premium-hover");
  els.billingCardBody.querySelectorAll(".paper-row-contributor-highlighted").forEach((row) => {
    row.classList.remove("paper-row-contributor-highlighted");
  });
});

function resetBillingCard() {
  state.billingItems = [];
  els.billingStartTime.value = "";
  els.billingEndTime.value = "";
  syncBillingQuickControls();
  renderBillingCard();
}

els.clearBillingCard.addEventListener("click", resetBillingCard);
els.clearBillingCardTop.addEventListener("click", resetBillingCard);

els.billingQuickAddOpen.addEventListener("click", openQuickAddDialog);
els.quickAddDialogClose.addEventListener("click", closeQuickAddDialog);
els.quickAddDialogDone.addEventListener("click", closeQuickAddDialog);

els.quickAddDialog.addEventListener("click", (event) => {
  if (event.target === els.quickAddDialog) closeQuickAddDialog();
});

els.billingSearchOpen.addEventListener("click", openCodeSearchDialog);
els.codeSearchDialogClose.addEventListener("click", closeCodeSearchDialog);
els.codeSearchDialogDone.addEventListener("click", closeCodeSearchDialog);

els.codeSearchDialog.addEventListener("click", (event) => {
  if (event.target === els.codeSearchDialog) closeCodeSearchDialog();
});

els.billingBundles.addEventListener("click", (event) => {
  const button = event.target.closest("[data-bundle-id]");
  if (button) toggleBundle(button.dataset.bundleId);
});

els.quickAddDialogBody.addEventListener("change", (event) => {
  const input = event.target.closest("[data-quick-code]");
  if (!input) return;
  const group = QUICK_ADD_GROUPS[Number(input.dataset.quickGroup)];
  if (input.checked && group?.exclusive) {
    setExclusiveBillingCode(group.options.map((option) => option.code), input.dataset.quickCode);
    return;
  }
  setToggleBillingCode(input.dataset.quickCode, input.checked);
});

[els.billingStartTime, els.billingEndTime].forEach((el) => {
  el.addEventListener("input", renderBillingCard);
  el.addEventListener("change", renderBillingCard);
});

[els.billingStartTime, els.billingEndTime].forEach((el) => {
  el.addEventListener("blur", () => {
    formatTimeInput(el);
    renderBillingCard();
  });
});

renderAll();
renderGeneralFilters();
renderGeneralPane();
renderProcedureFilters();
renderProcedurePane();
renderMiscFilters();
renderMiscPane();
renderCalculatorFilters();
applyCalculatorFilter();
setView(location.hash.replace("#", ""), false);
updateCalculator();
updateIssCalculator();
updateHeightConverter();
updateBmiCalculator();
updateEblCalculator();
renderBillingSearch();
renderQuickAddDialog();
syncBillingQuickControls();
renderBillingCard();
