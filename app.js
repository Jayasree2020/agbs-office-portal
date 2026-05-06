const STORAGE_KEY = "agbs-office-portal-v1";
const SESSION_KEY = "agbs-office-session-v1";
const DEFAULT_USERS = [
  { username: "agbsindia2020@gmail.com", name: "AGBS Office", role: "Super Admin" },
];

const STATUSES = ["Applicant", "Admitted", "Active Student", "Alumni", "Withdrawn", "Archived"];

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
  };
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

function programSelect(name, selected) {
  return `<select name="${name}">${PROGRAMS.map((program) => `<option value="${escapeHtml(program.name)}" ${program.name === selected ? "selected" : ""}>${escapeHtml(toTitleCase(program.name))}</option>`).join("")}</select>`;
}

function statusSelect(name, selected) {
  return `<select name="${name}">${STATUSES.map((status) => `<option ${status === selected ? "selected" : ""}>${status}</option>`).join("")}</select>`;
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
