const STORAGE_KEY = "agbs-office-portal-v1";
const SESSION_KEY = "agbs-office-session-v1";
const DEFAULT_USERS = [
  { username: "agbsindia2020@gmail.com", name: "AGBS Office", role: "Super Admin" },
];

const STATUSES = ["Applicant", "Admitted", "Active Student", "Alumni", "Withdrawn", "Archived"];
const GRADE_RESULTS = ["Pass", "Fail", "Incomplete", "Pending"];
const FEE_STATUSES = ["Paid", "Partial", "Pending", "Waived"];
const PAYMENT_METHODS = ["Cash", "Bank Transfer", "UPI", "Online", "Cheque", "Other"];
const FEE_TYPES = ["Monthly Fee", "Admission Fee", "Examination Fee", "Graduation Fee", "Certificate Fee", "Other"];
const CHRONICLE_SEED = [
  {
    id: "chronicle-1997-call",
    year: "1997",
    date: "1997",
    title: "Initial Ministry Commitment And Call",
    category: "Calling",
    body: "Initial ministry commitment and call into the ministry.",
  },
  {
    id: "chronicle-2000-name",
    year: "2000",
    date: "2000",
    title: "Amazing Grace Name Given",
    category: "Identity",
    body: "The name Amazing Grace was given.",
  },
  {
    id: "chronicle-2013-initiation",
    year: "2013",
    date: "2013",
    title: "First Initiation Of Amazing Grace Ministry",
    category: "Ministry",
    body: "The first initiation of the ministry began for Amazing Grace.",
  },
  {
    id: "chronicle-2020-trust",
    year: "2020",
    date: "2020",
    title: "Amazing Grace Ministries India Trust Registered",
    category: "Registration",
    body: "Amazing Grace Ministries India Religious And Charitable Trust was registered.",
  },
  {
    id: "chronicle-2021-serampore",
    year: "2021",
    date: "2021",
    title: "Senate Of Serampore College Affiliation",
    category: "Affiliation",
    body: "Senate of Serampore College (University) affiliation was given.",
  },
  {
    id: "chronicle-2021-ata",
    year: "2021",
    date: "2021",
    title: "ATA Candidacy Membership",
    category: "Accreditation",
    body: "ATA candidacy membership was given.",
  },
];

const PROGRAMS = [
  {
    name: "Bachelor of Theology",
    code: "BTH",
    duration: "3 Years",
    languages: "English / Malayalam",
    departments: ["Bilingual (Malayalam And English)", "English"],
    authority: "ATA Candidacy",
    admission: "10+2 qualification or 10+ Diploma in Theology from an accredited seminary.",
    focus: "Biblical studies, church history, theology, ethics, pastoral care, and practical ministry.",
    monthlyFee: "Rs. 2,000/-",
  },
  {
    name: "Master of Divinity",
    code: "MDIV",
    duration: "3 Years",
    languages: "English",
    departments: ["General"],
    authority: "ATA Candidacy",
    admission: "BTh with minimum B grade or a three-year university graduate degree.",
    focus: "Biblical interpretation, pastoral counselling, homiletics, church administration, and missions.",
    monthlyFee: "Rs. 3,000/-",
  },
  {
    name: "Master of Theology",
    code: "MTH",
    duration: "2 Years",
    languages: "English",
    departments: ["New Testament", "History Of Christianity", "Pastoral Care And Counseling", "Missiology"],
    authority: "ATA process",
    admission: "B.D. or M.Div. from an accredited seminary with minimum B grade.",
    focus: "New Testament, Pastoral Care And Counseling, Missiology, And History Of Christianity.",
    monthlyFee: "Rs. 4,000/-",
  },
  {
    name: "Diploma in Biblical Studies",
    code: "DIPBS",
    duration: "1 Year",
    languages: "English / Malayalam",
    departments: ["Biblical Studies"],
    authority: "College Program",
    admission: "Foundational biblical studies admission through seminary office review.",
    focus: "Foundational biblical knowledge and practical ministry preparation.",
    monthlyFee: "Rs. 2,000/-",
  },
  {
    name: "Diploma in Worship and Music",
    code: "DWM",
    duration: "1 Year",
    languages: "English / Malayalam",
    departments: ["Worship And Music"],
    authority: "Senate of Serampore Affiliated",
    admission: "Application and interview through the seminary office.",
    focus: "Worship leadership, music training, performance, and ministry formation.",
    monthlyFee: "Office confirmation",
  },
];

const HANDBOOK = [
  {
    title: "Admission Process",
    body: "Applicants submit the seminary application form, personal statement, references, official transcripts, English proficiency proof, application fee, and complete an admission interview.",
  },
  {
    title: "Required Documents",
    body: "10th certificate, Plus Two certificate, theological degree if applicable, secular degree if applicable, identity proof, and three recent passport-size photographs.",
  },
  {
    title: "Class Schedule",
    body: "Monday to Wednesday, 6:00 PM to 10:00 PM through Zoom. Reading hour, chapel, class time, and final reading hour are tracked by the office.",
  },
  {
    title: "Attendance",
    body: "Attendance is mandatory. Students may take a maximum of four leaves per subject with permission. Absence without permission receives a Red Letter and Rs. 25 fine.",
  },
  {
    title: "Recorded Classes",
    body: "Recorded classes may be requested from the office with name, course, date, subject, and teacher name.",
  },
  {
    title: "Fees",
    body: "Monthly fees are due before the 5th. DipBS and BTh: Rs. 2,000; MDiv: Rs. 3,000; MTh: Rs. 4,000.",
  },
  {
    title: "Payment Details",
    body: "Account: THE PRINCIPAL, AMAZING GRACE BIBLICAL SEMINARY. SBI Kizhakkambalam. Account No: 39813370072. IFSC: SBIN0070425.",
  },
  {
    title: "Open Book Examinations",
    body: "Exams are OBE. Students submit scanned answers within 24 hours, email agbsobe@gmail.com, forward to Telegram, and post physical copies to the office.",
  },
  {
    title: "Code of Conduct",
    body: "Students uphold Christian life, moral and ethical standards, respect, equality, gender justice, and zero tolerance toward abuse or harassment.",
  },
  {
    title: "Contact",
    body: "Amazing Grace Biblical Seminary, Erumelikkara, Kumarapuram PO, Aluva via, Ernakulam District, Kerala 683565. Office: 8547473926. Hours: 10:00 AM to 10:00 PM IST, Monday to Saturday.",
  },
];

const NAV_ITEMS = [
  ["dashboard", "Dashboard"],
  ["students", "Students"],
  ["admissions", "Admissions"],
  ["grades", "Grades"],
  ["fees", "Fees"],
  ["chronicles", "Chronicles"],
  ["programs", "Programs & Batches"],
  ["graduation", "Graduation"],
  ["alumni", "Alumni"],
  ["reports", "Reports"],
  ["handbook", "Handbook"],
  ["settings", "Settings"],
];

let state = null;
let currentView = "dashboard";
let filters = { search: "", program: "All", status: "All", batch: "All", language: "All" };
let gradeFilters = { search: "", program: "All", subject: "All", term: "All", result: "All", academicYear: "All" };
let feeFilters = { search: "", program: "All", status: "All", academicYear: "All" };
let editingGradeId = null;
let editingChronicleId = null;

const loginScreen = document.getElementById("login-screen");
const appShell = document.getElementById("app");
const nav = document.getElementById("nav");
const view = document.getElementById("view");
const title = document.getElementById("section-title");
const kicker = document.getElementById("section-kicker");
const profileDialog = document.getElementById("profile-dialog");
const profileContent = document.getElementById("profile-content");

document.getElementById("login-form").addEventListener("submit", handleLogin);
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("backup-button").addEventListener("click", downloadBackup);
document.getElementById("print-button").addEventListener("click", () => window.print());

init();

function init() {
  renderNav();
  if (sessionStorage.getItem(SESSION_KEY)) {
    state = loadSavedState();
    if (state) showApp();
    else showLogin();
  } else {
    showLogin();
  }
}

function loadSavedState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = normalizeState(JSON.parse(saved));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return null;
}

async function loadStateFromPassword(password) {
  const seedStudents = normalizeStudents(await decryptSeed(password));
  const saved = loadSavedState();
  if (saved) return saved;
  return {
    students: seedStudents.map((student) => ({
      ...student,
      contactPhone: "",
      email: "",
      ministry: "",
      address: "",
      documents: [],
      updatedAt: new Date().toISOString(),
    })),
    users: DEFAULT_USERS,
    grades: [],
    feePayments: [],
    chronicles: defaultChronicles(),
    auditLogs: [
      {
        at: new Date().toISOString(),
        actor: "System",
        action: "Seeded register records from Register_and_Admission_numbers2026.doc",
      },
      {
        at: new Date().toISOString(),
        actor: "System",
        action: "Loaded Student Handbook reference for office policies",
      },
    ],
  };
}

function normalizeState(nextState) {
  return {
    ...nextState,
    students: normalizeStudents(nextState.students || []),
    grades: nextState.grades || [],
    feePayments: nextState.feePayments || [],
    chronicles: normalizeChronicles(nextState.chronicles || defaultChronicles()),
  };
}

function defaultChronicles() {
  return CHRONICLE_SEED.map((entry) => ({ ...entry }));
}

function normalizeChronicles(chronicles) {
  return [...chronicles].sort((a, b) => String(a.date || a.year).localeCompare(String(b.date || b.year)));
}

function normalizeStudents(students) {
  return students.map((student) => ({
    ...student,
    status: normalizeStatus(student.status),
  }));
}

function normalizeStatus(status) {
  return status === "Graduated" ? "Alumni" : (STATUSES.includes(status) ? status : "Admitted");
}

async function decryptSeed(password) {
  const seed = window.AGBS_ENCRYPTED_SEED;
  if (!seed) throw new Error("Missing encrypted register seed.");
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(seed.salt),
      iterations: seed.iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const encrypted = concatBytes(base64ToBytes(seed.data), base64ToBytes(seed.tag));
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64ToBytes(seed.iv) }, key, encrypted);
  return JSON.parse(new TextDecoder().decode(plain));
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

function concatBytes(left, right) {
  const out = new Uint8Array(left.length + right.length);
  out.set(left, 0);
  out.set(right, left.length);
  return out;
}

function saveState(action) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (action) {
    addAudit(action);
  }
}

function addAudit(action) {
  const session = getSession();
  state.auditLogs.unshift({
    at: new Date().toISOString(),
    actor: session?.name || "Office",
    action,
  });
  state.auditLogs = state.auditLogs.slice(0, 100);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const match = DEFAULT_USERS.find((user) => user.username === username);
  if (!match) {
    document.getElementById("login-error").textContent = "Please check the username and password.";
    return;
  }
  try {
    state = await loadStateFromPassword(password);
  } catch {
    document.getElementById("login-error").textContent = "Please check the username and password.";
    return;
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: match.username, name: match.name, role: match.role }));
  addAudit(`${match.name} signed in`);
  showApp();
}

function logout() {
  const session = getSession();
  if (session) addAudit(`${session.name} signed out`);
  sessionStorage.removeItem(SESSION_KEY);
  showLogin();
}

function showLogin() {
  loginScreen.classList.remove("hidden");
  appShell.classList.add("hidden");
}

function showApp() {
  loginScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
  route(currentView);
}

function renderNav() {
  nav.innerHTML = NAV_ITEMS.map(([id, label]) => `<button class="tab-button" data-view="${id}">${label}</button>`).join("");
  nav.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-view]");
    if (button) route(button.dataset.view);
  });
}

function route(viewId) {
  currentView = viewId;
  const label = NAV_ITEMS.find(([id]) => id === viewId)?.[1] || "Dashboard";
  title.textContent = label === "Dashboard" ? "Office Dashboard" : label;
  kicker.textContent = "Amazing Grace Biblical Seminary";
  document.querySelectorAll(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  const renderer = {
    dashboard: renderDashboard,
    students: renderStudents,
    admissions: renderAdmissions,
    grades: renderGrades,
    fees: renderFees,
    chronicles: renderChronicles,
    programs: renderPrograms,
    graduation: renderGraduation,
    alumni: renderAlumni,
    reports: renderReports,
    handbook: renderHandbook,
    settings: renderSettings,
  }[viewId];
  renderer();
}

function renderDashboard() {
  const stats = getStats();
  const gradeStats = getGradeStats();
  const feeStats = getFeeStats();
  const chronicleStats = getChronicleStats();
  view.innerHTML = `
    <section class="hero-band">
      <div class="hero-copy">
        <p class="eyebrow">Private Office Records</p>
        <h2>Admission To Graduation, With Alumni History In One Place.</h2>
        <p>Search student records, register numbers, program lists, graduation movement, and alumni history from a single office dashboard.</p>
        <div class="hero-points" aria-label="Portal highlights">
          <span>2026 Register Seed</span>
          <span>Student Handbook Rules</span>
          <span>Admissions, Fees, Exams, Conduct</span>
        </div>
      </div>
      <figure class="hero-media">
        <img src="assets/campus.jpg" alt="AGBS campus" />
      </figure>
    </section>
    <section class="grid stats">
      ${statCard(stats.total, "Total Records", "all")}
      ${statCard(stats.active, "Active Students", "active")}
      ${statCard(stats.alumni, "Alumni", "alumni")}
      ${statCard(stats.programs, "Programs", "programs")}
    </section>
    <section class="card grade-dashboard-card">
      <div>
        <p class="eyebrow">Grade Dashboard</p>
        <h3>Student Academic Records</h3>
        <p class="muted">Track subject marks, terms, academic years, pass status, pending results, and exportable grade reports.</p>
      </div>
      <div class="mini-stat-grid">
        <div><strong>${gradeStats.entries}</strong><span>Grade Entries</span></div>
        <div><strong>${gradeStats.passed}</strong><span>Passed</span></div>
        <div><strong>${gradeStats.pending}</strong><span>Pending</span></div>
        <div><strong>${gradeStats.average}%</strong><span>Average</span></div>
      </div>
      <button class="primary" type="button" id="open-grade-dashboard">Open Grade Dashboard</button>
    </section>
    <section class="card fee-dashboard-card">
      <div>
        <p class="eyebrow">Fee Dashboard</p>
        <h3>Student Payment Records</h3>
        <p class="muted">Enter monthly fees, admission fees, examination fees, receipt numbers, payment method, and pending balances.</p>
      </div>
      <div class="mini-stat-grid">
        <div><strong>${feeStats.entries}</strong><span>Payments</span></div>
        <div><strong>${formatCurrency(feeStats.collected)}</strong><span>Collected</span></div>
        <div><strong>${formatCurrency(feeStats.balance)}</strong><span>Balance</span></div>
        <div><strong>${feeStats.pending}</strong><span>Pending</span></div>
      </div>
      <button class="primary" type="button" id="open-fee-dashboard">Open Fee Dashboard</button>
    </section>
    <section class="card chronicle-dashboard-card">
      <div>
        <p class="eyebrow">AGBS Chronicles</p>
        <h3>Tree Of Days</h3>
        <p class="muted">Keep the ministry journey from 1997 onward in one editable office history, with uploaded details for each day and milestone.</p>
      </div>
      <div class="mini-stat-grid">
        <div><strong>${chronicleStats.entries}</strong><span>Entries</span></div>
        <div><strong>${chronicleStats.firstYear}</strong><span>Beginning</span></div>
        <div><strong>${chronicleStats.latestYear}</strong><span>Latest</span></div>
        <div><strong>${chronicleStats.categories}</strong><span>Categories</span></div>
      </div>
      <button class="primary" type="button" id="open-chronicles-dashboard">Open Chronicles</button>
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="card">
        <h3>Program Register Summary</h3>
        ${summaryTable()}
        <p class="muted">Use The View Students Link To Open The Program List On The Students Page.</p>
      </div>
      <div class="card">
        <h3>Office Priorities</h3>
        <div class="notice-list">
          <div class="notice"><strong>Register numbers:</strong> Keep one unique number per enrollment.</div>
          <div class="notice"><strong>Graduation:</strong> Move completed students directly to Alumni after office confirmation.</div>
          <div class="notice"><strong>Backup:</strong> Use Backup JSON daily until cloud database backup is connected.</div>
        </div>
      </div>
    </section>
  `;
  bindDashboardStatCards();
  bindDashboardProgramLinks();
  document.getElementById("open-grade-dashboard").addEventListener("click", () => route("grades"));
  document.getElementById("open-fee-dashboard").addEventListener("click", () => route("fees"));
  document.getElementById("open-chronicles-dashboard").addEventListener("click", () => route("chronicles"));
}

function renderStudents() {
  view.innerHTML = `
    ${renderToolbar()}
    ${filters.program !== "All" ? programStudentList(filters.program) : ""}
    <div id="student-results" class="table-wrap">${studentTable(getFilteredStudents())}</div>
  `;
  bindToolbar();
  bindProgramStudentListActions();
  bindStudentRows();
}

function renderAdmissions() {
  view.innerHTML = `
    <section class="grid two-col">
      <form id="admission-form" class="card stack">
        <div>
          <p class="eyebrow">New record</p>
          <h3>Add admitted student</h3>
        </div>
        <div class="form-grid">
          <label>Name<input name="name" required /></label>
          <label>Program${programSelect("program", "Bachelor of Theology")}</label>
          <label>Specialization<input name="specialization" placeholder="For M.Th if applicable" /></label>
          <label>Language<select name="language"><option>English</option><option>Malayalam</option><option>English / Malayalam</option></select></label>
          <label>Admission year<input name="batchStart" type="number" min="2020" max="2100" value="2026" required /></label>
          <label>Expected graduation year<input name="batchEnd" type="number" min="2020" max="2100" value="2029" required /></label>
          <label>Status${statusSelect("status", "Admitted")}</label>
          <label>Register number<input name="registerNumber" placeholder="Leave blank to generate" /></label>
          <label class="full">Notes<textarea name="notes" placeholder="Office notes"></textarea></label>
        </div>
        <button class="primary" type="submit">Add student record</button>
      </form>
      <div class="card">
        <h3>Register Number Format</h3>
        <p class="muted">The portal follows the existing style from the register document.</p>
        <div class="notice-list">
          <div class="notice">B.Th English: AGBS-BTH-ENG-2026-XX001</div>
          <div class="notice">B.Th Malayalam: AGBS-BTH-MAL-2026-XX001</div>
          <div class="notice">M.Div: AGBS-MDIV-2026-XX001</div>
          <div class="notice">M.Th NT/PCC/HC/MIS: AGBS-MTH-NT-2026-XX001</div>
          <div class="notice">Dip.BS: AGBS-DIPBS-2026-XX001</div>
          <div class="notice">DWM: AGBS-DWM-2026-XX001</div>
        </div>
      </div>
    </section>
  `;
  document.getElementById("admission-form").addEventListener("submit", addStudent);
}

function renderGrades() {
  const stats = getGradeStats();
  const editingGrade = editingGradeId ? state.grades.find((grade) => grade.id === editingGradeId) : null;
  const filteredGrades = getFilteredGrades();
  view.innerHTML = `
    <section class="grid stats">
      ${statCard(stats.entries, "Grade Entries")}
      ${statCard(stats.passed, "Passed")}
      ${statCard(stats.pending, "Pending")}
      ${statCard(stats.average, "Average %")}
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <form id="grade-form" class="card stack">
        <div>
          <p class="eyebrow">Grade Entry</p>
          <h3>${editingGrade ? "Edit Student Grade" : "Add Student Grade"}</h3>
        </div>
        <div class="form-grid">
          <label class="full">Student${studentSelect("studentRegisterNumber", editingGrade?.registerNumber || "")}</label>
          <label>Subject<input name="subject" placeholder="Example: New Testament Survey" value="${escapeHtml(editingGrade?.subject || "")}" required /></label>
          <label>Term / Semester<input name="term" placeholder="Example: Semester 1" value="${escapeHtml(editingGrade?.term || "")}" required /></label>
          <label>Academic Year<input name="academicYear" value="${escapeHtml(editingGrade?.academicYear || new Date().getFullYear())}" required /></label>
          <label>Marks Obtained<input name="marks" type="number" min="0" step="0.01" value="${escapeHtml(editingGrade?.marks ?? "")}" required /></label>
          <label>Maximum Marks<input name="maxMarks" type="number" min="1" step="0.01" value="${escapeHtml(editingGrade?.maxMarks ?? 100)}" required /></label>
          <label>Grade<input name="grade" placeholder="A, B+, Pass, etc." value="${escapeHtml(editingGrade?.grade || "")}" required /></label>
          <label>Result${resultSelect("result", editingGrade?.result || "Pass")}</label>
          <label class="full">Office Notes<textarea name="notes" placeholder="Exam notes, moderation notes, revaluation notes">${escapeHtml(editingGrade?.notes || "")}</textarea></label>
        </div>
        <div class="button-row">
          <button class="primary" type="submit">${editingGrade ? "Update Grade" : "Save Grade"}</button>
          ${editingGrade ? `<button class="secondary" type="button" id="cancel-grade-edit">Cancel Edit</button>` : ""}
        </div>
      </form>
      <div class="card stack">
        <div>
          <p class="eyebrow">Grade Dashboard</p>
          <h3>Academic Progress Snapshot</h3>
        </div>
        <div class="notice-list">
          <div class="notice"><strong>Student-linked:</strong> Every grade is connected to one existing register number.</div>
          <div class="notice"><strong>Office-ready:</strong> Filter by course/program, semester, subject, result, academic year, or student name.</div>
          <div class="notice"><strong>Export:</strong> Download the exact filtered grade list for review, reports, or backup.</div>
        </div>
        <button id="export-grades" class="secondary">Export Grades CSV</button>
      </div>
    </section>
    <section class="card import-panel" style="margin-top:16px">
      <div>
        <p class="eyebrow">Bulk Grade Upload</p>
        <h3>Import Grades From Word Or CSV</h3>
        <p class="muted">Upload a .docx Word table, .csv, or .txt table. Columns can include Register Number, Student Name, Program, Subject, Semester, Academic Year, Marks, Max Marks, Grade, Result, and Notes.</p>
      </div>
      <div class="import-actions">
        <input id="grade-import-file" type="file" accept=".docx,.csv,.txt,.doc,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
        <button class="primary" id="run-grade-import" type="button">Import Grade File</button>
        <button class="secondary" id="download-grade-template" type="button">Download Grade Template</button>
      </div>
      <div id="grade-import-status" class="notice">For older .doc files, open the file in Word and use Save As .docx before upload.</div>
    </section>
    <section class="card" style="margin-top:16px">
      <div class="grade-toolbar">
        <input id="grade-search" placeholder="Search student, register number, subject, grade" value="${escapeHtml(gradeFilters.search)}" />
        ${selectHtml("grade-program", ["All", ...unique(state.students.map((student) => student.program))], gradeFilters.program)}
        ${selectHtml("grade-subject", ["All", ...unique(state.grades.map((grade) => grade.subject)).sort()], gradeFilters.subject)}
        ${selectHtml("grade-term", ["All", ...unique(state.grades.map((grade) => grade.term)).sort()], gradeFilters.term)}
        ${selectHtml("grade-result", ["All", ...GRADE_RESULTS], gradeFilters.result)}
        ${selectHtml("grade-year", ["All", ...unique(state.grades.map((grade) => String(grade.academicYear))).sort()], gradeFilters.academicYear)}
      </div>
      <div class="table-summary">
        <strong>${filteredGrades.length}</strong>
        <span>grade record${filteredGrades.length === 1 ? "" : "s"} in this view</span>
      </div>
      <div id="grade-results" class="table-wrap">${gradeTable(filteredGrades)}</div>
    </section>
  `;
  document.getElementById("grade-form").addEventListener("submit", addGrade);
  document.getElementById("export-grades").addEventListener("click", () => exportGradesCsv("agbs-grade-report.csv", getFilteredGrades()));
  document.getElementById("run-grade-import").addEventListener("click", importGradeFile);
  document.getElementById("download-grade-template").addEventListener("click", downloadGradeTemplate);
  document.getElementById("cancel-grade-edit")?.addEventListener("click", () => {
    editingGradeId = null;
    renderGrades();
  });
  bindGradeToolbar();
  bindGradeActions();
}

function renderFees() {
  const stats = getFeeStats();
  view.innerHTML = `
    <section class="grid stats">
      ${statCard(stats.entries, "Payment Entries")}
      ${statCard(formatCurrency(stats.collected), "Collected")}
      ${statCard(formatCurrency(stats.balance), "Balance")}
      ${statCard(stats.pending, "Pending")}
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <form id="fee-form" class="card stack">
        <div>
          <p class="eyebrow">Fee Entry</p>
          <h3>Add Fee Payment</h3>
        </div>
        <div class="form-grid">
          <label class="full">Student${studentSelect("studentRegisterNumber")}</label>
          <label>Fee Type${simpleSelect("feeType", FEE_TYPES, "Monthly Fee")}</label>
          <label>Fee Period<input name="feePeriod" placeholder="Example: May 2026" required /></label>
          <label>Academic Year<input name="academicYear" value="${new Date().getFullYear()}" required /></label>
          <label>Total Fee<input name="totalFee" type="number" min="0" step="0.01" required /></label>
          <label>Amount Paid<input name="amountPaid" type="number" min="0" step="0.01" required /></label>
          <label>Payment Date<input name="paymentDate" type="date" value="${new Date().toISOString().slice(0, 10)}" required /></label>
          <label>Receipt Number<input name="receiptNumber" placeholder="Office receipt number" /></label>
          <label>Payment Method${simpleSelect("paymentMethod", PAYMENT_METHODS, "Bank Transfer")}</label>
          <label>Status${simpleSelect("status", FEE_STATUSES, "Paid")}</label>
          <label class="full">Office Notes<textarea name="notes" placeholder="Bank reference, concession, scholarship, balance remarks"></textarea></label>
        </div>
        <button class="primary" type="submit">Save Payment</button>
      </form>
      <div class="card stack">
        <div>
          <p class="eyebrow">Payment Dashboard</p>
          <h3>Fee Collection Snapshot</h3>
        </div>
        <div class="notice-list">
          <div class="notice"><strong>Student-linked:</strong> Every payment is connected to one register number.</div>
          <div class="notice"><strong>Balance-aware:</strong> The portal calculates the remaining balance from total fee and amount paid.</div>
          <div class="notice"><strong>Office-ready:</strong> Export fee payment records for accounts, follow-up, and backup.</div>
        </div>
        <button id="export-fees" class="secondary">Export Fees CSV</button>
      </div>
    </section>
    <section class="card" style="margin-top:16px">
      <div class="fee-toolbar">
        <input id="fee-search" placeholder="Search student, register number, receipt, period" value="${escapeHtml(feeFilters.search)}" />
        ${selectHtml("fee-program", ["All", ...unique(state.students.map((student) => student.program))], feeFilters.program)}
        ${selectHtml("fee-status", ["All", ...FEE_STATUSES], feeFilters.status)}
        ${selectHtml("fee-year", ["All", ...unique(state.feePayments.map((payment) => String(payment.academicYear))).sort()], feeFilters.academicYear)}
      </div>
      <div id="fee-results" class="table-wrap">${feeTable(getFilteredFeePayments())}</div>
    </section>
  `;
  document.getElementById("fee-form").addEventListener("submit", addFeePayment);
  document.getElementById("export-fees").addEventListener("click", () => exportFeesCsv("agbs-fee-payment-report.csv", getFilteredFeePayments()));
  bindFeeToolbar();
}

function renderChronicles() {
  const editingEntry = editingChronicleId ? state.chronicles.find((entry) => entry.id === editingChronicleId) : null;
  const stats = getChronicleStats();
  view.innerHTML = `
    <section class="grid stats">
      ${statCard(stats.entries, "Chronicle Entries")}
      ${statCard(stats.firstYear, "Beginning")}
      ${statCard(stats.latestYear, "Latest")}
      ${statCard(stats.categories, "Categories")}
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <form id="chronicle-form" class="card stack">
        <div>
          <p class="eyebrow">Tree Of Days</p>
          <h3>${editingEntry ? "Edit Chronicle Entry" : "Add Chronicle Entry"}</h3>
        </div>
        <div class="form-grid">
          <label>Year<input name="year" value="${escapeHtml(editingEntry?.year || new Date().getFullYear())}" required /></label>
          <label>Date Or Season<input name="date" placeholder="Example: 2021 or 12 May 2026" value="${escapeHtml(editingEntry?.date || "")}" required /></label>
          <label class="full">Title<input name="title" placeholder="Chronicle title" value="${escapeHtml(editingEntry?.title || "")}" required /></label>
          <label>Category<input name="category" placeholder="Calling, Ministry, Affiliation..." value="${escapeHtml(editingEntry?.category || "Ministry")}" /></label>
          <label>Upload Details<input name="chronicleFile" type="file" accept=".docx,.txt,.csv,.doc,text/plain,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label>
          <label class="full">Details<textarea name="body" placeholder="Write or upload the details of this day">${escapeHtml(editingEntry?.body || "")}</textarea></label>
        </div>
        <div class="button-row">
          <button class="primary" type="submit">${editingEntry ? "Update Chronicle" : "Save Chronicle"}</button>
          ${editingEntry ? `<button class="secondary" type="button" id="cancel-chronicle-edit">Cancel Edit</button>` : ""}
        </div>
        <div class="notice">Upload .docx, .txt, or .csv details for each day. For older .doc files, save as .docx first.</div>
      </form>
      <div class="card stack">
        <div>
          <p class="eyebrow">Starting Milestones</p>
          <h3>AGBS History Foundation</h3>
        </div>
        <div class="notice-list">
          <div class="notice"><strong>1997:</strong> Initial ministry commitment and call into the ministry.</div>
          <div class="notice"><strong>2000:</strong> The name Amazing Grace was given.</div>
          <div class="notice"><strong>2013:</strong> First initiation of Amazing Grace ministry.</div>
          <div class="notice"><strong>2020:</strong> Amazing Grace Ministries India Religious And Charitable Trust registered.</div>
          <div class="notice"><strong>2021:</strong> Senate of Serampore affiliation and ATA candidacy membership.</div>
        </div>
        <button id="export-chronicles" class="secondary">Export Chronicles CSV</button>
      </div>
    </section>
    <section class="card" style="margin-top:16px">
      <div class="chronicle-tree">
        ${chronicleTree()}
      </div>
    </section>
  `;
  document.getElementById("chronicle-form").addEventListener("submit", saveChronicle);
  document.getElementById("export-chronicles").addEventListener("click", () => exportChroniclesCsv("agbs-chronicles.csv", state.chronicles));
  document.getElementById("cancel-chronicle-edit")?.addEventListener("click", () => {
    editingChronicleId = null;
    renderChronicles();
  });
  bindChronicleActions();
}

function renderPrograms() {
  const counts = groupBy(state.students, "program");
  view.innerHTML = `
    <section class="grid three-col">
      ${PROGRAMS.map((program) => `
        <article class="card">
          <p class="eyebrow">${program.code} / ${program.duration}</p>
          <h3>${toTitleCase(program.name)}</h3>
          <p class="muted">${program.authority}</p>
          <div class="detail-list">
            <div><span>Records</span><strong>${counts[program.name] || 0}</strong></div>
            <div><span>Language</span><strong>${program.languages}</strong></div>
            <div><span>Monthly fee</span><strong>${program.monthlyFee}</strong></div>
            <div><span>Departments</span><strong>${program.departments.join(", ")}</strong></div>
          </div>
          <p><strong>Focus:</strong> ${program.focus}</p>
          <p><strong>Admission:</strong> ${program.admission}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function renderGraduation() {
  const list = state.students
    .filter((student) => ["Active Student", "Alumni"].includes(student.status))
    .sort((a, b) => (a.batchEnd || 9999) - (b.batchEnd || 9999));
  view.innerHTML = `
    <section class="card">
      <h3>Graduation Tracking</h3>
      <p class="muted">Use This Page To Move Completed Students From Active Student Directly To Alumni.</p>
      <div class="table-wrap">${studentTable(list, true)}</div>
    </section>
  `;
  bindStudentRows();
  document.querySelectorAll("[data-mark]").forEach((button) => {
    button.addEventListener("click", () => {
      const student = findStudent(button.dataset.mark);
      if (!student) return;
      student.status = button.dataset.status;
      student.graduationYear = Number(button.dataset.year || new Date().getFullYear());
      student.updatedAt = new Date().toISOString();
      saveState(`${student.name} marked as ${student.status}`);
      renderGraduation();
    });
  });
}

function renderAlumni() {
  const alumni = state.students.filter((student) => student.status === "Alumni");
  view.innerHTML = `
    <section class="card">
      <h3>Alumni Register</h3>
      <p class="muted">All Graduates Are Listed As Alumni For Ministry Follow-Up And Certificate Reference.</p>
      <div class="table-wrap">${studentTable(alumni)}</div>
    </section>
  `;
  bindStudentRows();
}

function renderReports() {
  const stats = getStats();
  view.innerHTML = `
    <section class="grid two-col">
      <div class="card stack">
        <div>
          <p class="eyebrow">Export</p>
          <h3>Office reports</h3>
        </div>
        <button class="primary" id="export-filtered">Export current student report CSV</button>
        <button class="secondary" id="export-active">Export active students CSV</button>
        <button class="secondary" id="export-alumni">Export Alumni CSV</button>
        <button class="secondary" id="export-programs">Export program summary CSV</button>
        <button class="secondary" id="export-all-grades">Export Grades CSV</button>
        <button class="secondary" id="export-all-fees">Export Fees CSV</button>
        <button class="secondary" id="export-all-chronicles">Export Chronicles CSV</button>
        <div class="notice">Reports include register number, program, batch, language, status, graduation year, and notes.</div>
      </div>
      <div class="card stack">
        <div>
          <p class="eyebrow">Import</p>
          <h3>Import CSV</h3>
        </div>
        <p class="muted">CSV columns: name, registerNumber, program, status, batchStart, batchEnd, language, specialization, notes.</p>
        <input id="csv-import" type="file" accept=".csv,text/csv" />
        <button class="primary" id="run-import">Import records</button>
      </div>
    </section>
    <section class="grid stats" style="margin-top:16px">
      ${statCard(stats.total, "All Records")}
      ${statCard(stats.active, "Active Students")}
      ${statCard(stats.alumni, "Alumni")}
      ${statCard(stats.programs, "Programs")}
    </section>
  `;
  document.getElementById("export-filtered").addEventListener("click", () => exportCsv("agbs-student-report.csv", getFilteredStudents()));
  document.getElementById("export-active").addEventListener("click", () => exportCsv("agbs-active-students.csv", state.students.filter((s) => s.status === "Active Student")));
  document.getElementById("export-alumni").addEventListener("click", () => exportCsv("agbs-alumni-graduates.csv", state.students.filter((s) => s.status === "Alumni")));
  document.getElementById("export-programs").addEventListener("click", exportProgramSummary);
  document.getElementById("export-all-grades").addEventListener("click", () => exportGradesCsv("agbs-grade-report.csv", state.grades));
  document.getElementById("export-all-fees").addEventListener("click", () => exportFeesCsv("agbs-fee-payment-report.csv", state.feePayments));
  document.getElementById("export-all-chronicles").addEventListener("click", () => exportChroniclesCsv("agbs-chronicles.csv", state.chronicles));
  document.getElementById("run-import").addEventListener("click", importCsv);
}

function renderHandbook() {
  view.innerHTML = `
    <section class="grid three-col">
      ${HANDBOOK.map((item) => `
        <article class="card">
          <p class="eyebrow">Student Handbook</p>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function renderSettings() {
  const session = getSession();
  view.innerHTML = `
    <section class="grid two-col">
      <div class="card stack">
        <div>
          <p class="eyebrow">Access</p>
          <h3>Roles and cloud readiness</h3>
        </div>
        <div class="detail-list">
          <div><span>Signed in</span><strong>${session.name}</strong></div>
          <div><span>Role</span><strong>${session.role}</strong></div>
        <div><span>Office account</span><strong>agbsindia2020@gmail.com</strong></div>
          <div><span>Backup</span><strong>Daily cloud backup ready</strong></div>
        </div>
        <div class="notice">This version is connected to the office email login and encrypted register seed. For long-term live use, add hosted authentication and a private cloud database.</div>
        <button id="reset-demo" class="secondary">Reset to original register data</button>
      </div>
      <div class="card">
        <h3>Audit Log</h3>
        <div class="audit-log">
          ${state.auditLogs.map((log) => `<p><strong>${formatDateTime(log.at)}</strong><br>${log.actor}: ${log.action}</p>`).join("")}
        </div>
      </div>
    </section>
  `;
  document.getElementById("reset-demo").addEventListener("click", () => {
    if (!confirm("Reset local changes and reload the original register data?")) return;
    const session = getSession();
    localStorage.removeItem(STORAGE_KEY);
    state = null;
    if (session) {
      sessionStorage.removeItem(SESSION_KEY);
    }
    logout();
  });
}

function renderToolbar() {
  const programs = unique(state.students.map((student) => student.program));
  const batches = unique(state.students.map((student) => String(student.batchStart))).sort();
  const languages = unique(state.students.map((student) => student.language));
  return `
    <div class="toolbar">
      <input id="filter-search" placeholder="Search name, register number, notes" value="${escapeHtml(filters.search)}" />
      ${selectHtml("filter-program", ["All", ...programs], filters.program)}
      ${selectHtml("filter-status", ["All", "Active Records", ...STATUSES], filters.status)}
      ${selectHtml("filter-batch", ["All", ...batches], filters.batch)}
      ${selectHtml("filter-language", ["All", ...languages], filters.language)}
    </div>
  `;
}

function bindToolbar() {
  const ids = ["search", "program", "status", "batch", "language"];
  ids.forEach((name) => {
    const el = document.getElementById(`filter-${name}`);
    el.addEventListener(name === "search" ? "input" : "change", () => {
      filters[name] = el.value;
      refreshStudentResults();
    });
  });
}

function refreshStudentResults() {
  const results = document.getElementById("student-results");
  if (!results) return;
  results.innerHTML = studentTable(getFilteredStudents());
  bindStudentRows();
}

function getFilteredStudents() {
  const query = filters.search.toLowerCase();
  return state.students.filter((student) => {
    const text = `${student.name} ${student.registerNumber} ${student.program} ${student.specialization} ${student.notes}`.toLowerCase();
    return (!query || text.includes(query))
      && (filters.program === "All" || student.program === filters.program)
      && (filters.status === "All" || statusMatchesFilter(student, filters.status))
      && (filters.batch === "All" || String(student.batchStart) === filters.batch)
      && (filters.language === "All" || student.language === filters.language);
  });
}

function statusMatchesFilter(student, status) {
  if (status === "Active Records") return ["Active Student", "Admitted"].includes(student.status);
  return student.status === status;
}

function studentTable(students, graduationActions = false) {
  if (!students.length) {
    return `<div class="card"><p>No records found.</p></div>`;
  }
  return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Register Number</th>
          <th>Program</th>
          <th>Batch</th>
          <th>Status</th>
          <th>Graduation</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${students.map((student) => `
          <tr>
          <td><strong>${escapeHtml(toTitleCase(student.name))}</strong><br><span class="muted">${escapeHtml(student.language || "")}</span></td>
            <td>${escapeHtml(student.registerNumber)}</td>
            <td>${escapeHtml(toTitleCase(student.program))}${student.specialization ? `<br><span class="muted">${escapeHtml(toTitleCase(student.specialization))}</span>` : ""}</td>
            <td>${student.batchStart || ""}-${student.batchEnd || ""}</td>
            <td>${statusBadge(student.status)}</td>
            <td>${student.graduationYear || "Pending"}</td>
            <td>
              <button class="small-button" data-student="${student.id}">Open</button>
              ${graduationActions ? graduationButtons(student) : ""}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function graduationButtons(student) {
  if (student.status === "Active Student") {
    return `<button class="secondary" data-mark="${student.id}" data-status="Alumni" data-year="${student.batchEnd || new Date().getFullYear()}">Move To Alumni</button>`;
  }
  return "";
}

function bindStudentRows() {
  document.querySelectorAll("[data-student]").forEach((button) => {
    button.addEventListener("click", () => openProfile(button.dataset.student));
  });
}

function openProfile(id) {
  const student = findStudent(id);
  if (!student) return;
  profileContent.innerHTML = `
    <div class="stack">
      <div>
        <p class="eyebrow">Student profile</p>
        <h2>${escapeHtml(toTitleCase(student.name))}</h2>
        <p class="muted">${escapeHtml(student.registerNumber)}</p>
      </div>
      <div class="detail-list">
        <div><span>Program</span><strong>${escapeHtml(toTitleCase(student.program))}</strong></div>
        <div><span>Specialization</span><strong>${escapeHtml(student.specialization ? toTitleCase(student.specialization) : "Not Applicable")}</strong></div>
        <div><span>Batch</span><strong>${student.batchStart || ""}-${student.batchEnd || ""}</strong></div>
        <div><span>Status</span><strong>${student.status}</strong></div>
        <div><span>Graduation year</span><strong>${student.graduationYear || "Pending"}</strong></div>
        <div><span>Source</span><strong>${escapeHtml(student.source || "Office entry")}</strong></div>
      </div>
      <form id="profile-form" class="form-grid">
        <label>Status${statusSelect("status", student.status)}</label>
        <label>Graduation year<input name="graduationYear" type="number" value="${student.graduationYear || ""}" /></label>
        <label>Phone<input name="contactPhone" value="${escapeHtml(student.contactPhone || "")}" /></label>
        <label>Email<input name="email" type="email" value="${escapeHtml(student.email || "")}" /></label>
        <label>Current ministry / placement<input name="ministry" value="${escapeHtml(student.ministry || "")}" /></label>
        <label>Address<input name="address" value="${escapeHtml(student.address || "")}" /></label>
        <label class="full">Office notes<textarea name="notes">${escapeHtml(student.notes || "")}</textarea></label>
        <button class="primary full" type="submit">Save profile</button>
      </form>
    </div>
  `;
  document.getElementById("profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    student.status = data.get("status");
    student.graduationYear = data.get("graduationYear") ? Number(data.get("graduationYear")) : null;
    student.contactPhone = data.get("contactPhone").trim();
    student.email = data.get("email").trim();
    student.ministry = data.get("ministry").trim();
    student.address = data.get("address").trim();
    student.notes = data.get("notes").trim();
    student.updatedAt = new Date().toISOString();
    saveState(`Updated profile for ${student.name}`);
    profileDialog.close();
    route(currentView);
  });
  profileDialog.showModal();
}

function addStudent(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("name").trim();
  const program = data.get("program");
  const specialization = data.get("specialization").trim();
  const language = data.get("language");
  const batchStart = Number(data.get("batchStart"));
  const batchEnd = Number(data.get("batchEnd"));
  const registerNumber = data.get("registerNumber").trim() || generateRegisterNumber(name, program, specialization, language, batchStart);
  if (state.students.some((student) => student.registerNumber.toUpperCase() === registerNumber.toUpperCase())) {
    alert("That register number already exists.");
    return;
  }
  const student = {
    id: registerNumber.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    registerNumber,
    program,
    specialization,
    language,
    batchStart,
    batchEnd,
    admissionYear: batchStart,
    status: data.get("status"),
    graduationYear: null,
    source: "Office entry",
    notes: data.get("notes").trim(),
    contactPhone: "",
    email: "",
    ministry: "",
    address: "",
    documents: [],
    updatedAt: new Date().toISOString(),
  };
  state.students.push(student);
  saveState(`Added student ${student.name} (${student.registerNumber})`);
  event.currentTarget.reset();
  route("students");
}

function addGrade(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const student = state.students.find((item) => item.registerNumber === data.get("studentRegisterNumber"));
  if (!student) {
    alert("Please choose a student.");
    return;
  }
  const marks = Number(data.get("marks"));
  const maxMarks = Number(data.get("maxMarks"));
  const percent = maxMarks > 0 ? Math.round((marks / maxMarks) * 10000) / 100 : 0;
  const grade = {
    id: `grade-${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    registerNumber: student.registerNumber,
    program: student.program,
    specialization: student.specialization || "",
    subject: data.get("subject").trim(),
    term: data.get("term").trim(),
    academicYear: data.get("academicYear").trim(),
    marks,
    maxMarks,
    percent,
    grade: data.get("grade").trim(),
    result: data.get("result"),
    notes: data.get("notes").trim(),
  };
  if (editingGradeId) {
    const index = state.grades.findIndex((item) => item.id === editingGradeId);
    if (index >= 0) {
      state.grades[index] = {
        ...state.grades[index],
        ...grade,
        id: editingGradeId,
        updatedAt: new Date().toISOString(),
      };
      saveState(`Updated grade for ${student.name} - ${grade.subject}`);
    }
    editingGradeId = null;
  } else {
    state.grades.unshift({
      ...grade,
      id: `grade-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
    saveState(`Added grade for ${student.name} - ${grade.subject}`);
  }
  event.currentTarget.reset();
  route("grades");
}

function getGradeStats() {
  const entries = state.grades.length;
  const passed = state.grades.filter((grade) => grade.result === "Pass").length;
  const pending = state.grades.filter((grade) => ["Pending", "Incomplete"].includes(grade.result)).length;
  const average = entries ? Math.round((state.grades.reduce((sum, grade) => sum + Number(grade.percent || 0), 0) / entries) * 10) / 10 : 0;
  return { entries, passed, pending, average: entries ? average : "0" };
}

function bindGradeToolbar() {
  [
    ["search", "input"],
    ["program", "change"],
    ["subject", "change"],
    ["term", "change"],
    ["result", "change"],
    ["year", "change"],
  ].forEach(([name, eventName]) => {
    const el = document.getElementById(`grade-${name}`);
    el.addEventListener(eventName, () => {
      const key = name === "year" ? "academicYear" : name;
      gradeFilters[key] = el.value;
      refreshGradeResults();
    });
  });
}

function refreshGradeResults() {
  const results = document.getElementById("grade-results");
  if (!results) return;
  const filteredGrades = getFilteredGrades();
  const summary = document.querySelector(".table-summary");
  if (summary) {
    summary.innerHTML = `<strong>${filteredGrades.length}</strong><span>grade record${filteredGrades.length === 1 ? "" : "s"} in this view</span>`;
  }
  results.innerHTML = gradeTable(filteredGrades);
  bindGradeActions();
}

function getFilteredGrades() {
  const query = gradeFilters.search.toLowerCase();
  return state.grades.filter((grade) => {
    const text = `${grade.studentName} ${grade.registerNumber} ${grade.program} ${grade.subject} ${grade.term} ${grade.grade} ${grade.notes}`.toLowerCase();
    return (!query || text.includes(query))
      && (gradeFilters.program === "All" || grade.program === gradeFilters.program)
      && (gradeFilters.subject === "All" || grade.subject === gradeFilters.subject)
      && (gradeFilters.term === "All" || grade.term === gradeFilters.term)
      && (gradeFilters.result === "All" || grade.result === gradeFilters.result)
      && (gradeFilters.academicYear === "All" || String(grade.academicYear) === gradeFilters.academicYear);
  });
}

function bindGradeActions() {
  document.querySelectorAll("[data-edit-grade]").forEach((button) => {
    button.addEventListener("click", () => {
      editingGradeId = button.dataset.editGrade;
      renderGrades();
    });
  });
  document.querySelectorAll("[data-delete-grade]").forEach((button) => {
    button.addEventListener("click", () => {
      const grade = state.grades.find((item) => item.id === button.dataset.deleteGrade);
      if (!grade || !confirm(`Delete grade for ${grade.studentName} - ${grade.subject}?`)) return;
      state.grades = state.grades.filter((item) => item.id !== grade.id);
      saveState(`Deleted grade for ${grade.studentName} - ${grade.subject}`);
      if (editingGradeId === grade.id) editingGradeId = null;
      renderGrades();
    });
  });
}

async function importGradeFile() {
  const fileInput = document.getElementById("grade-import-file");
  const status = document.getElementById("grade-import-status");
  const file = fileInput.files[0];
  if (!file) {
    status.textContent = "Choose a Word .docx, CSV, or text file first.";
    return;
  }
  if (/\.doc$/i.test(file.name)) {
    status.textContent = "This is an older Word .doc file. Please open it in Word, choose Save As, select Word Document (.docx), then upload the new file.";
    return;
  }
  status.textContent = "Reading grade file...";
  try {
    const text = await readGradeImportFile(file);
    const rows = parseGradeImportRows(text);
    const result = importGradeRows(rows, file.name);
    status.textContent = `Imported ${result.imported} grade records. Skipped ${result.skipped} row${result.skipped === 1 ? "" : "s"}.`;
    if (result.imported) {
      gradeFilters = { search: "", program: "All", subject: "All", term: "All", result: "All", academicYear: "All" };
      editingGradeId = null;
      renderGrades();
      alert(`Imported ${result.imported} grade records from ${file.name}.`);
    }
  } catch (error) {
    status.textContent = `Could not import this file: ${friendlyImportError(error)}`;
  }
}

async function readGradeImportFile(file) {
  if (/\.docx$/i.test(file.name) || /officedocument\.wordprocessingml\.document/i.test(file.type)) {
    return extractTextFromDocx(file);
  }
  return file.text();
}

async function extractTextFromDocx(file) {
  if (!window.JSZip) {
    throw new Error("Word import library is still loading. Please refresh the page and try again.");
  }
  const zip = await window.JSZip.loadAsync(await file.arrayBuffer());
  const documentFile = zip.file("word/document.xml") || Object.values(zip.files).find((entry) => entry.name.replace(/\\/g, "/") === "word/document.xml");
  if (!documentFile) throw new Error("This Word file does not contain readable document text.");
  const xml = await documentFile.async("text");
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const tableRows = wordNodes(doc, "tr");
  if (tableRows.length) {
    return tableRows.map((row) => {
      const cells = wordNodes(row, "tc");
      return cells.map((cell) => textFromWordNode(cell)).join("\t");
    }).join("\n");
  }
  const paragraphs = wordNodes(doc, "p");
  return paragraphs.map((paragraph) => textFromWordNode(paragraph)).filter(Boolean).join("\n");
}

function friendlyImportError(error) {
  const message = String(error?.message || error || "");
  if (/Can't find end of central directory|corrupted zip|not a zip|JSZip/i.test(message)) {
    return "This Word file is not a readable .docx file. Please open it in Word, Save As Word Document (.docx), and upload again.";
  }
  if (/first row must include/i.test(message)) {
    return "The first row must include Register Number or Student Name, plus Subject, Semester, Marks, Max Marks, Grade, and Result.";
  }
  return message;
}

function textFromWordNode(node) {
  const textNodes = wordNodes(node, "t");
  return textNodes.map((item) => item.textContent || "").join("").replace(/\s+/g, " ").trim();
}

function wordNodes(root, localName) {
  return [...new Set([...root.getElementsByTagName(`w:${localName}`), ...root.getElementsByTagNameNS("*", localName)])];
}

function parseGradeImportRows(text) {
  const lines = String(text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return [];
  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  const headers = splitDelimitedLine(lines.shift(), delimiter).map(normalizeImportHeader);
  if (!headers.some((header) => ["registerNumber", "studentName", "name"].includes(header))) {
    throw new Error("The first row must include Register Number or Student Name.");
  }
  return lines.map((line) => {
    const values = splitDelimitedLine(line, delimiter);
    return headers.reduce((row, header, index) => {
      if (header) row[header] = values[index] || "";
      return row;
    }, {});
  }).filter((row) => Object.values(row).some(Boolean));
}

function normalizeImportHeader(header) {
  const key = String(header || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const map = {
    registerno: "registerNumber",
    registernumber: "registerNumber",
    admissionnumber: "registerNumber",
    studentname: "studentName",
    name: "studentName",
    program: "program",
    course: "program",
    degree: "program",
    subject: "subject",
    paper: "subject",
    term: "term",
    semester: "term",
    sem: "term",
    academicyear: "academicYear",
    year: "academicYear",
    marks: "marks",
    marksobtained: "marks",
    maxmarks: "maxMarks",
    maximummarks: "maxMarks",
    totalmarks: "maxMarks",
    grade: "grade",
    result: "result",
    status: "result",
    notes: "notes",
    remarks: "notes",
  };
  return map[key] || key;
}

function splitDelimitedLine(line, delimiter) {
  if (delimiter === ",") return splitCsvLine(line);
  return line.split("\t").map((cell) => cell.trim());
}

function importGradeRows(rows, sourceName) {
  let imported = 0;
  let skipped = 0;
  rows.forEach((row) => {
    const student = findStudentForImport(row);
    const subject = String(row.subject || "").trim();
    const marks = Number(row.marks);
    const maxMarks = Number(row.maxMarks || 100);
    if (!student || !subject || Number.isNaN(marks) || Number.isNaN(maxMarks) || maxMarks <= 0) {
      skipped += 1;
      return;
    }
    const grade = buildGradeRecord({
      student,
      subject,
      term: row.term || "Semester Pending",
      academicYear: row.academicYear || new Date().getFullYear(),
      marks,
      maxMarks,
      grade: row.grade || calculateLetterGrade(marks, maxMarks),
      result: normalizeGradeResult(row.result),
      notes: row.notes || `Imported from ${sourceName}`,
    });
    state.grades.unshift(grade);
    imported += 1;
  });
  if (imported) saveState(`Imported ${imported} grade records from ${sourceName}`);
  return { imported, skipped };
}

function findStudentForImport(row) {
  const registerNumber = String(row.registerNumber || "").trim().toLowerCase();
  if (registerNumber) {
    const byRegister = state.students.find((student) => student.registerNumber.toLowerCase() === registerNumber);
    if (byRegister) return byRegister;
  }
  const name = String(row.studentName || row.name || "").trim().toLowerCase();
  if (!name) return null;
  return state.students.find((student) => student.name.toLowerCase() === name)
    || state.students.find((student) => student.name.toLowerCase().includes(name) || name.includes(student.name.toLowerCase()));
}

function buildGradeRecord({ student, subject, term, academicYear, marks, maxMarks, grade, result, notes }) {
  const percent = maxMarks > 0 ? Math.round((marks / maxMarks) * 10000) / 100 : 0;
  return {
    id: `grade-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    studentId: student.id,
    studentName: student.name,
    registerNumber: student.registerNumber,
    program: student.program,
    specialization: student.specialization || "",
    subject: String(subject || "").trim(),
    term: String(term || "").trim(),
    academicYear: String(academicYear || "").trim(),
    marks,
    maxMarks,
    percent,
    grade: String(grade || "").trim(),
    result,
    notes: String(notes || "").trim(),
    createdAt: new Date().toISOString(),
  };
}

function normalizeGradeResult(value) {
  const text = toTitleCase(String(value || "").trim());
  return GRADE_RESULTS.includes(text) ? text : "Pass";
}

function calculateLetterGrade(marks, maxMarks) {
  const percent = maxMarks > 0 ? (Number(marks) / Number(maxMarks)) * 100 : 0;
  if (percent >= 90) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 70) return "B+";
  if (percent >= 60) return "B";
  if (percent >= 50) return "C";
  return "Fail";
}

function downloadGradeTemplate() {
  const headers = ["Register Number", "Student Name", "Program", "Subject", "Semester", "Academic Year", "Marks", "Max Marks", "Grade", "Result", "Notes"];
  const sample = ["AGBS-BTH-ENG-2026-XX001", "Student Name", "Bachelor of Theology", "New Testament Survey", "Semester 1", "2026", "88", "100", "A", "Pass", "Imported from office grade sheet"];
  downloadText("agbs-grade-import-template.csv", [headers.join(","), sample.map(csvCell).join(",")].join("\n"), "text/csv");
}

function gradeTable(grades) {
  if (!grades.length) {
    return `<div class="empty-state"><strong>No Grade Records Yet</strong><span>Add a grade entry above or adjust the filters.</span></div>`;
  }
  return `
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Subject</th>
          <th>Term</th>
          <th>Marks</th>
          <th>Grade</th>
          <th>Result</th>
          <th>Academic Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${grades.map((grade) => `
          <tr>
            <td><strong>${escapeHtml(toTitleCase(grade.studentName))}</strong><br><span class="muted">${escapeHtml(grade.registerNumber)}</span></td>
            <td>${escapeHtml(toTitleCase(grade.subject))}<br><span class="muted">${escapeHtml(toTitleCase(grade.program))}</span></td>
            <td>${escapeHtml(grade.term)}</td>
            <td>${grade.marks}/${grade.maxMarks}<br><span class="muted">${grade.percent}%</span></td>
            <td><strong>${escapeHtml(grade.grade)}</strong></td>
            <td>${statusBadge(grade.result)}</td>
            <td>${escapeHtml(grade.academicYear)}</td>
            <td>
              <div class="table-actions">
                <button class="small-button" type="button" data-edit-grade="${escapeHtml(grade.id)}">Edit</button>
                <button class="small-button danger" type="button" data-delete-grade="${escapeHtml(grade.id)}">Delete</button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function addFeePayment(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const student = state.students.find((item) => item.registerNumber === data.get("studentRegisterNumber"));
  if (!student) {
    alert("Please choose a student.");
    return;
  }
  const totalFee = Number(data.get("totalFee"));
  const amountPaid = Number(data.get("amountPaid"));
  const balance = Math.max(0, Math.round((totalFee - amountPaid) * 100) / 100);
  const status = balance <= 0 && data.get("status") !== "Waived" ? "Paid" : data.get("status");
  const payment = {
    id: `fee-${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    registerNumber: student.registerNumber,
    program: student.program,
    specialization: student.specialization || "",
    feeType: data.get("feeType"),
    feePeriod: data.get("feePeriod").trim(),
    academicYear: data.get("academicYear").trim(),
    totalFee,
    amountPaid,
    balance,
    paymentDate: data.get("paymentDate"),
    receiptNumber: data.get("receiptNumber").trim(),
    paymentMethod: data.get("paymentMethod"),
    status,
    notes: data.get("notes").trim(),
    createdAt: new Date().toISOString(),
  };
  state.feePayments.unshift(payment);
  saveState(`Added fee payment for ${student.name} - ${payment.feePeriod}`);
  event.currentTarget.reset();
  route("fees");
}

function getFeeStats() {
  const entries = state.feePayments.length;
  const collected = state.feePayments.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0);
  const balance = state.feePayments.reduce((sum, payment) => sum + Number(payment.balance || 0), 0);
  const pending = state.feePayments.filter((payment) => ["Pending", "Partial"].includes(payment.status) || Number(payment.balance || 0) > 0).length;
  return {
    entries,
    collected: Math.round(collected * 100) / 100,
    balance: Math.round(balance * 100) / 100,
    pending,
  };
}

function bindFeeToolbar() {
  [
    ["search", "input"],
    ["program", "change"],
    ["status", "change"],
    ["year", "change"],
  ].forEach(([name, eventName]) => {
    const el = document.getElementById(`fee-${name}`);
    el.addEventListener(eventName, () => {
      const key = name === "year" ? "academicYear" : name;
      feeFilters[key] = el.value;
      refreshFeeResults();
    });
  });
}

function refreshFeeResults() {
  const results = document.getElementById("fee-results");
  if (!results) return;
  results.innerHTML = feeTable(getFilteredFeePayments());
}

function getFilteredFeePayments() {
  const query = feeFilters.search.toLowerCase();
  return state.feePayments.filter((payment) => {
    const text = `${payment.studentName} ${payment.registerNumber} ${payment.program} ${payment.feeType} ${payment.feePeriod} ${payment.receiptNumber} ${payment.paymentMethod} ${payment.notes}`.toLowerCase();
    return (!query || text.includes(query))
      && (feeFilters.program === "All" || payment.program === feeFilters.program)
      && (feeFilters.status === "All" || payment.status === feeFilters.status)
      && (feeFilters.academicYear === "All" || String(payment.academicYear) === feeFilters.academicYear);
  });
}

function feeTable(payments) {
  if (!payments.length) {
    return `<div class="empty-state"><strong>No Fee Payments Yet</strong><span>Add a payment entry above or adjust the filters.</span></div>`;
  }
  return `
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Fee Details</th>
          <th>Total Fee</th>
          <th>Paid</th>
          <th>Balance</th>
          <th>Status</th>
          <th>Receipt</th>
        </tr>
      </thead>
      <tbody>
        ${payments.map((payment) => `
          <tr>
            <td><strong>${escapeHtml(toTitleCase(payment.studentName))}</strong><br><span class="muted">${escapeHtml(payment.registerNumber)}</span></td>
            <td>${escapeHtml(toTitleCase(payment.feeType))}<br><span class="muted">${escapeHtml(payment.feePeriod)} / ${escapeHtml(payment.academicYear)}</span></td>
            <td>${formatCurrency(payment.totalFee)}</td>
            <td>${formatCurrency(payment.amountPaid)}<br><span class="muted">${escapeHtml(payment.paymentDate)}</span></td>
            <td>${formatCurrency(payment.balance)}</td>
            <td>${statusBadge(payment.status)}</td>
            <td>${escapeHtml(payment.receiptNumber || "Pending")}<br><span class="muted">${escapeHtml(payment.paymentMethod)}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function getChronicleStats() {
  const entries = state.chronicles?.length || 0;
  const years = unique((state.chronicles || []).map((entry) => String(entry.year || entry.date || "").slice(0, 4)).filter(Boolean)).sort();
  return {
    entries,
    firstYear: years[0] || "1997",
    latestYear: years[years.length - 1] || "2021",
    categories: unique((state.chronicles || []).map((entry) => entry.category)).length,
  };
}

async function saveChronicle(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const file = data.get("chronicleFile");
  let body = String(data.get("body") || "").trim();
  if (file && file.name) {
    if (/\.doc$/i.test(file.name)) {
      alert("Please save the old .doc file as .docx, then upload again.");
      return;
    }
    try {
      const uploadedText = await readChronicleFile(file);
      body = [body, uploadedText].filter(Boolean).join("\n\n");
    } catch (error) {
      alert(`Could not read the uploaded file: ${friendlyImportError(error)}`);
      return;
    }
  }
  const entry = {
    id: editingChronicleId || `chronicle-${Date.now()}`,
    year: String(data.get("year") || "").trim(),
    date: String(data.get("date") || "").trim(),
    title: String(data.get("title") || "").trim(),
    category: String(data.get("category") || "Ministry").trim(),
    body,
    updatedAt: new Date().toISOString(),
  };
  if (!entry.year || !entry.date || !entry.title) {
    alert("Please enter year, date, and title.");
    return;
  }
  const existingIndex = state.chronicles.findIndex((item) => item.id === entry.id);
  if (existingIndex >= 0) {
    state.chronicles[existingIndex] = { ...state.chronicles[existingIndex], ...entry };
    state.chronicles = normalizeChronicles(state.chronicles);
    saveState(`Updated chronicle ${entry.title}`);
  } else {
    state.chronicles.push({ ...entry, createdAt: new Date().toISOString() });
    state.chronicles = normalizeChronicles(state.chronicles);
    saveState(`Added chronicle ${entry.title}`);
  }
  editingChronicleId = null;
  renderChronicles();
}

async function readChronicleFile(file) {
  if (/\.docx$/i.test(file.name) || /officedocument\.wordprocessingml\.document/i.test(file.type)) {
    return extractTextFromDocx(file);
  }
  return file.text();
}

function chronicleTree() {
  const grouped = new Map();
  normalizeChronicles(state.chronicles || []).forEach((entry) => {
    const year = String(entry.year || entry.date || "Undated");
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year).push(entry);
  });
  return [...grouped.entries()].map(([year, entries]) => `
    <section class="chronicle-year">
      <div class="chronicle-year-marker">${escapeHtml(year)}</div>
      <div class="chronicle-entries">
        ${entries.map((entry) => `
          <article class="chronicle-entry">
            <p class="eyebrow">${escapeHtml(entry.category || "Ministry")} / ${escapeHtml(entry.date || entry.year)}</p>
            <h3>${escapeHtml(toTitleCase(entry.title))}</h3>
            <p>${escapeHtml(entry.body || "Details can be uploaded or added by the office.")}</p>
            <div class="button-row">
              <button class="small-button" type="button" data-edit-chronicle="${escapeHtml(entry.id)}">Edit</button>
              <button class="small-button danger" type="button" data-delete-chronicle="${escapeHtml(entry.id)}">Delete</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function bindChronicleActions() {
  document.querySelectorAll("[data-edit-chronicle]").forEach((button) => {
    button.addEventListener("click", () => {
      editingChronicleId = button.dataset.editChronicle;
      renderChronicles();
    });
  });
  document.querySelectorAll("[data-delete-chronicle]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = state.chronicles.find((item) => item.id === button.dataset.deleteChronicle);
      if (!entry || !confirm(`Delete chronicle entry: ${entry.title}?`)) return;
      state.chronicles = state.chronicles.filter((item) => item.id !== entry.id);
      saveState(`Deleted chronicle ${entry.title}`);
      if (editingChronicleId === entry.id) editingChronicleId = null;
      renderChronicles();
    });
  });
}

function generateRegisterNumber(name, program, specialization, language, year) {
  const initials = name
    .replace(/[^A-Za-z ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .join("")
    .slice(0, 4) || "XX";
  const programCode = programCodeFor(program, specialization, language);
  const prefix = `AGBS-${programCode}-${year}-${initials}`;
  const matching = state.students.filter((student) => student.registerNumber.startsWith(`AGBS-${programCode}-${year}-`));
  const serial = String(matching.length + 1).padStart(3, "0");
  return `${prefix}${serial}`;
}

function programCodeFor(program, specialization, language) {
  if (program === "Bachelor of Theology") return language === "Malayalam" ? "BTH-MAL" : "BTH-ENG";
  if (program === "Master of Divinity") return "MDIV";
  if (program === "Diploma in Worship and Music") return "DWM";
  if (program === "Diploma in Biblical Studies") return "DIPBS";
  if (program === "Master of Theology") {
    if (/new testament/i.test(specialization)) return "MTH-NT";
    if (/pastoral/i.test(specialization)) return "MTH-PCC";
    if (/history/i.test(specialization)) return "MTH-HC";
    if (/miss/i.test(specialization)) return "MTH-MIS";
    return "MTH";
  }
  return "GEN";
}

function getStats() {
  return {
    total: state.students.length,
    active: state.students.filter((student) => ["Active Student", "Admitted"].includes(student.status)).length,
    alumni: state.students.filter((student) => student.status === "Alumni").length,
    programs: unique(state.students.map((student) => student.program)).length,
  };
}

function findStudent(id) {
  return state.students.find((student) => student.id === id);
}

function statCard(value, label, target = "") {
  if (!target) {
    return `<div class="card stat"><strong>${value}</strong><span>${label}</span></div>`;
  }
  return `<button class="card stat stat-link" data-stat-target="${target}" aria-label="Open ${escapeHtml(label)} details"><strong>${value}</strong><span>${label}</span></button>`;
}

function summaryTable() {
  const groups = groupBy(state.students, "program");
  const rows = PROGRAMS.map((program) => [program, groups[program.name] || 0]).filter(([, count]) => count > 0);
  return `
    <div class="table-wrap compact-table">
      <table>
        <thead><tr><th>Program</th><th>Duration</th><th>Departments</th><th>Records</th><th>List</th></tr></thead>
        <tbody>${rows.map(([program, count]) => `
          <tr>
            <td>${escapeHtml(toTitleCase(program.name))}</td>
            <td>${escapeHtml(program.duration)}</td>
            <td>${escapeHtml(program.departments.join(", "))}</td>
            <td>${count}</td>
            <td><button class="link-button" data-summary-program="${escapeHtml(program.name)}">View Students</button></td>
          </tr>
        `).join("")}</tbody>
      </table>
    </div>
  `;
}

function bindDashboardProgramLinks() {
  document.querySelectorAll("[data-summary-program]").forEach((button) => {
    button.addEventListener("click", () => {
      filters = { ...filters, search: "", program: button.dataset.summaryProgram, status: "All", batch: "All", language: "All" };
      route("students");
    });
  });
}

function bindDashboardStatCards() {
  document.querySelectorAll("[data-stat-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.statTarget;
      if (target === "active") {
        filters = { search: "", program: "All", status: "Active Records", batch: "All", language: "All" };
      } else if (target === "alumni") {
        filters = { search: "", program: "All", status: "Alumni", batch: "All", language: "All" };
      } else {
        filters = { search: "", program: "All", status: "All", batch: "All", language: "All" };
      }
      route("students");
    });
  });
}

function bindProgramStudentListActions() {
  bindStudentRows();
  document.querySelectorAll("[data-open-program]").forEach((button) => {
    button.addEventListener("click", () => {
      filters = { ...filters, search: "", program: button.dataset.openProgram, status: "All", batch: "All", language: "All" };
      route("students");
    });
  });
}

function programStudentList(programName) {
  const students = state.students
    .filter((student) => student.program === programName)
    .sort((a, b) => (getStudyYear(a).order - getStudyYear(b).order) || a.name.localeCompare(b.name));
  const yearGroups = groupStudentsByStudyYear(students);
  return `
    <section class="year-register">
      <div class="year-register-header">
        <div>
          <p class="eyebrow">Student List</p>
          <h3>${escapeHtml(toTitleCase(programName))} Students By Year</h3>
        </div>
        ${currentView === "students" ? "" : `<button class="secondary" data-open-program="${escapeHtml(programName)}">Open In Students Page</button>`}
      </div>
      ${yearGroups.map((group) => `
        <article class="year-group">
          <h4>${escapeHtml(group.label)} <span>${group.students.length}</span></h4>
          <div class="year-student-grid">
            ${group.students.map((student) => `
              <button class="student-link" data-student="${student.id}">
                <strong>${escapeHtml(toTitleCase(student.name))}</strong>
                <span>${escapeHtml(student.registerNumber)}</span>
                <em>${escapeHtml(getDepartment(student))}</em>
              </button>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function groupStudentsByStudyYear(students) {
  const map = new Map();
  students.forEach((student) => {
    const year = getStudyYear(student);
    if (!map.has(year.label)) map.set(year.label, { ...year, students: [] });
    map.get(year.label).students.push(student);
  });
  return [...map.values()].sort((a, b) => a.order - b.order);
}

function getStudyYear(student) {
  if (["Alumni", "Archived", "Withdrawn"].includes(student.status)) {
    return { label: student.graduationYear ? `Alumni ${student.graduationYear}` : "Alumni", order: 90 };
  }
  const duration = getProgramDurationYears(student.program);
  const currentYear = new Date().getFullYear();
  const yearNumber = Math.max(1, Math.min(duration, currentYear - Number(student.batchStart || currentYear) + 1));
  return { label: ordinal(yearNumber), order: yearNumber };
}

function getProgramDurationYears(programName) {
  const duration = PROGRAMS.find((program) => program.name === programName)?.duration || "1 Year";
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : 1;
}

function ordinal(value) {
  if (value === 1) return "1st Year";
  if (value === 2) return "2nd Year";
  if (value === 3) return "3rd Year";
  return `${value}th Year`;
}

function getDepartment(student) {
  if (student.program === "Bachelor of Theology") {
    return student.language === "English" ? "English" : "Bilingual (Malayalam And English)";
  }
  if (student.program === "Master of Theology") {
    return normalizeDepartment(student.specialization || "Department Pending");
  }
  if (student.program === "Diploma in Biblical Studies") return "Biblical Studies";
  if (student.program === "Diploma in Worship and Music") return "Worship And Music";
  return "General";
}

function normalizeDepartment(value) {
  return toTitleCase(String(value || "").replace(/&/g, "And"));
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "Unassigned";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function toTitleCase(value) {
  return String(value || "").replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

function selectHtml(id, options, selected) {
  return `<select id="${id}">${options.map((option) => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option === "All" ? option : toTitleCase(option))}</option>`).join("")}</select>`;
}

function simpleSelect(name, options, selected) {
  return `<select name="${name}">${options.map((option) => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(toTitleCase(option))}</option>`).join("")}</select>`;
}

function studentSelect(name, selected = "") {
  const activeFirst = [...state.students].sort((a, b) => {
    const statusOrder = Number(["Active Student", "Admitted"].includes(b.status)) - Number(["Active Student", "Admitted"].includes(a.status));
    return statusOrder || a.name.localeCompare(b.name);
  });
  return `<select name="${name}" required>
    <option value="">Choose Student</option>
    ${activeFirst.map((student) => `<option value="${escapeHtml(student.registerNumber)}" ${student.registerNumber === selected ? "selected" : ""}>${escapeHtml(toTitleCase(student.name))} - ${escapeHtml(student.registerNumber)}</option>`).join("")}
  </select>`;
}

function programSelect(name, selected) {
  return `<select name="${name}">${PROGRAMS.map((program) => `<option value="${escapeHtml(program.name)}" ${program.name === selected ? "selected" : ""}>${escapeHtml(toTitleCase(program.name))}</option>`).join("")}</select>`;
}

function statusSelect(name, selected) {
  return `<select name="${name}">${STATUSES.map((status) => `<option ${status === selected ? "selected" : ""}>${status}</option>`).join("")}</select>`;
}

function resultSelect(name, selected) {
  return `<select name="${name}">${GRADE_RESULTS.map((result) => `<option ${result === selected ? "selected" : ""}>${result}</option>`).join("")}</select>`;
}

function statusBadge(status) {
  return `<span class="status ${status.toLowerCase().replace(/\s+/g, "-")}">${status}</span>`;
}

function exportCsv(filename, rows) {
  const headers = ["name", "registerNumber", "program", "specialization", "language", "batchStart", "batchEnd", "status", "graduationYear", "contactPhone", "email", "ministry", "notes"];
  const csv = [headers.join(","), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(","))].join("\n");
  downloadText(filename, csv, "text/csv");
  addAudit(`Exported ${filename}`);
}

function exportProgramSummary() {
  const groups = groupBy(state.students, "program");
  const csv = ["program,records", ...Object.entries(groups).map(([program, records]) => `${csvCell(program)},${records}`)].join("\n");
  downloadText("agbs-program-summary.csv", csv, "text/csv");
  addAudit("Exported program summary");
}

function exportGradesCsv(filename, rows) {
  const headers = ["studentName", "registerNumber", "program", "specialization", "subject", "term", "academicYear", "marks", "maxMarks", "percent", "grade", "result", "notes"];
  const csv = [headers.join(","), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(","))].join("\n");
  downloadText(filename, csv, "text/csv");
  addAudit(`Exported ${filename}`);
}

function exportFeesCsv(filename, rows) {
  const headers = ["studentName", "registerNumber", "program", "specialization", "feeType", "feePeriod", "academicYear", "totalFee", "amountPaid", "balance", "paymentDate", "receiptNumber", "paymentMethod", "status", "notes"];
  const csv = [headers.join(","), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(","))].join("\n");
  downloadText(filename, csv, "text/csv");
  addAudit(`Exported ${filename}`);
}

function exportChroniclesCsv(filename, rows) {
  const headers = ["year", "date", "title", "category", "body"];
  const csv = [headers.join(","), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(","))].join("\n");
  downloadText(filename, csv, "text/csv");
  addAudit(`Exported ${filename}`);
}

function formatCurrency(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function importCsv() {
  const file = document.getElementById("csv-import").files[0];
  if (!file) {
    alert("Choose a CSV file first.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const imported = parseCsv(String(reader.result));
    let added = 0;
    imported.forEach((row) => {
      if (!row.name || !row.registerNumber) return;
      if (state.students.some((student) => student.registerNumber.toUpperCase() === row.registerNumber.toUpperCase())) return;
      state.students.push({
        id: row.registerNumber.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: row.name,
        registerNumber: row.registerNumber,
        program: row.program || "Other",
        specialization: row.specialization || "",
        language: row.language || "English / Malayalam",
        batchStart: Number(row.batchStart) || null,
        batchEnd: Number(row.batchEnd) || null,
        admissionYear: Number(row.batchStart) || null,
        status: normalizeStatus(row.status || "Admitted"),
        graduationYear: Number(row.graduationYear) || null,
        source: file.name,
        notes: row.notes || "",
        contactPhone: row.contactPhone || "",
        email: row.email || "",
        ministry: row.ministry || "",
        address: row.address || "",
        documents: [],
        updatedAt: new Date().toISOString(),
      });
      added += 1;
    });
    saveState(`Imported ${added} records from ${file.name}`);
    alert(`Imported ${added} new records.`);
    route("students");
  };
  reader.readAsText(file);
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = splitCsvLine(lines.shift()).map((header) => header.trim());
  return lines.map((line) => {
    const values = splitCsvLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] || "";
      return row;
    }, {});
  });
}

function splitCsvLine(line) {
  const result = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function downloadBackup() {
  const payload = {
    exportedAt: new Date().toISOString(),
    seminary: "Amazing Grace Biblical Seminary",
    version: 1,
    ...state,
  };
  downloadText(`agbs-office-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2), "application/json");
  addAudit("Downloaded JSON backup");
}

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
