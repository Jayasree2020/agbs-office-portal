# AGBS Office Portal

Private Seminary Office Platform For Amazing Grace Biblical Seminary.

Live app: [agbs-office-portal.vercel.app](https://agbs-office-portal.vercel.app)  
Repository: [Jayasree2020/agbs-office-portal](https://github.com/Jayasree2020/agbs-office-portal)

> Built for the seminary office to manage admission, register numbers, student records, graduation, and alumni details in one private place.

## What This Project Does

- **Office Login** - Protects the portal with the AGBS office email and private register password.
- **Office Dashboard** - Shows total records, active students, alumni, program count, and grade progress at a glance; each student number opens the Students page with the matching records.
- **Program Register Summary** - Lists B.Th, M.Div, M.Th, Dip.BS, and DWM with duration, departments, record count, and a link to the student list.
- **Students Page** - Opens the selected program list and groups students by 1st Year, 2nd Year, 3rd Year, and Alumni year.
- **Student Profiles** - Stores each student name, register number, program, department, batch, status, graduation year, contact fields, ministry, address, and office notes.
- **Admissions Page** - Adds new admitted students and can generate register numbers in the AGBS format.
- **Grades Dashboard** - Records student grades by subject, term, academic year, marks, grade, and result.
- **Graduation Page** - Moves completed students directly to Alumni, because all graduates are alumni.
- **Alumni Page** - Keeps alumni records together for certificate reference, ministry follow-up, and office history.
- **Reports Page** - Exports student reports, active student lists, alumni lists, program summaries, and JSON backups.
- **Import Tool** - Accepts CSV records so future lists can be added without rewriting the app.
- **Programs Page** - Documents program duration and departments: B.Th, M.Div, M.Th, Dip.BS, and DWM.
- **Handbook Page** - Keeps key office reference points from the Student Handbook: admissions, documents, attendance, fees, exams, conduct, and contact.

## Current Program Structure

- **Bachelor Of Theology (B.Th)** - 3 Years
  - Bilingual (Malayalam And English)
  - English
- **Master Of Divinity (M.Div)** - 3 Years
  - General
- **Master Of Theology (M.Th)** - 2 Years
  - New Testament
  - History Of Christianity
  - Pastoral Care And Counseling
  - Missiology
- **Diploma In Biblical Studies (Dip.BS)** - 1 Year
  - Biblical Studies
- **Diploma In Worship And Music (DWM)** - 1 Year
  - Worship And Music

## What Has Been Built So Far

- AGBS-branded private portal using the seminary logo and campus image.
- 124 clean student records seeded from `Register_and_Admission_numbers2026.doc`.
- All old `Graduated` statuses converted to `Alumni`.
- Encrypted seed data, so the deployed data file is not readable as plain student JavaScript.
- Office login using `agbsindia2020@gmail.com`.
- Vercel deployment connected to GitHub.
- Student list moved away from the dashboard and shown only on the Students page when requested.
- Dashboard Program Register Summary linked to filtered student lists.
- Dashboard number cards now work as shortcuts to detailed student records.
- Grades dashboard added to the main dashboard and Grades page for subject-wise marks, grade results, progress review, and CSV export.
- GitHub repository organized with documentation and deployment notes.

## Repository Map

- `index.html` - Login shell and app container.
- `styles.css` - Visual design, layout, cards, tables, and responsive behavior.
- `app.js` - Portal logic, login, filters, student records, reports, imports, exports, and UI views.
- `data/students.js` - Encrypted initial register seed.
- `assets/` - AGBS logo and campus image.
- `vercel.json` - Vercel static hosting and security headers.
- `docs/PROJECT_SUMMARY.md` - Point-by-point explanation of the portal.
- `docs/DEPLOYMENT.md` - GitHub and Vercel deployment notes.
- `docs/NEXT_STEPS.md` - Suggested future improvements.

## Office Login

- Email: `agbsindia2020@gmail.com`
- Password: use the private office password shared during setup.

Keep Vercel Deployment Protection enabled for private office use.

## Deployment

This portal is deployed on Vercel from GitHub.

- Build command: none
- Output directory: project root
- Live URL: [https://agbs-office-portal.vercel.app](https://agbs-office-portal.vercel.app)

For long-term production use, replace browser storage with a private cloud database and hosted authentication.
