# AGBS Office Portal Summary

This document explains, point by point, what has been made so far and what each part does.

## Main Purpose

- Create a private office portal for Amazing Grace Biblical Seminary.
- Keep admission, register number, student, graduation, and alumni information in one place.
- Move away from only using Word documents for office registers.
- Give the office a searchable and exportable record system.

## Login And Access

- The portal uses the AGBS office email for login.
- The student register seed is encrypted with the private office password.
- The password is not shown in the app or documentation.
- The app should stay behind Vercel Deployment Protection until full hosted authentication is added.

## Dashboard

- Shows high-level office numbers only.
- Displays total records, active students, alumni, and programs.
- Includes a grade dashboard snapshot with grade entries, passed records, pending records, and average percentage.
- Includes a fee dashboard snapshot with payment entries, collected amount, pending balance, and pending payment count.
- Lets the office click each number to open the matching student details on the Students page.
- Lets the office open the full Grades page from the dashboard snapshot.
- Lets the office open the full Fees page from the dashboard snapshot.
- Shows Program Register Summary.
- Does not show student lists unless the office opens them from the Students page.

## Program Register Summary

- Lists each program with duration, department structure, and student count.
- Each row has a `View Students` link.
- The link opens the Students page filtered to that program.
- This keeps the dashboard clean while still making the register easy to reach.

## Students Page

- Shows the selected program student list.
- Groups students by academic year: 1st Year, 2nd Year, 3rd Year.
- Alumni are grouped by alumni year, such as Alumni 2023 and Alumni 2024.
- Each student card shows name, register number, and department.
- A searchable table remains available for detailed office work.

## Admissions

- Adds new admitted students.
- Generates AGBS-style register numbers when the office leaves the number blank.
- Supports program, department/specialization, language, admission year, expected completion year, and notes.

## Grades Dashboard

- Records grades against existing student register numbers.
- Stores subject, term, academic year, marks obtained, maximum marks, percentage, grade, result, and notes.
- Shows grade dashboard cards for total entries, passed records, pending records, and average percentage.
- Imports grade tables from Word .docx, CSV, or text files.
- Matches imported grade rows to students by register number or student name.
- Filters grade records by student/search text, program/course, subject, semester/term, result, and academic year.
- Lets the office edit or delete imported and manually entered grade records.
- Exports the current filtered grade view as CSV for academic review or backup.

## Fees Dashboard

- Records fee payments against existing student register numbers.
- Stores fee type, fee period, academic year, total fee, amount paid, balance, payment date, receipt number, payment method, status, and notes.
- Shows fee dashboard cards for payment entries, collected amount, pending balance, and pending payment count.
- Filters fee records by student/search text, program, payment status, and academic year.
- Exports fee payment records as CSV for accounts, follow-up, and backup.

## Graduation And Alumni

- All graduates are treated as alumni.
- Completed active students are moved directly to Alumni.
- Alumni records are available in a dedicated Alumni page.
- Alumni can be exported for reports or follow-up.

## Programs

- Bachelor Of Theology: 3 Years, Bilingual and English departments.
- Master Of Divinity: 3 Years.
- Master Of Theology: 2 Years, with New Testament, History Of Christianity, Pastoral Care And Counseling, and Missiology.
- Diploma In Biblical Studies: 1 Year.
- Diploma In Worship And Music: 1 Year.

## Reports And Backup

- Export current filtered student list as CSV.
- Export active students as CSV.
- Export alumni as CSV.
- Export program summary as CSV.
- Export grade records as CSV.
- Export fee payment records as CSV.
- Download JSON backup for local safekeeping.

## Handbook Reference

- Includes admissions process.
- Includes required documents.
- Includes class schedule and attendance policy.
- Includes fees and payment details.
- Includes examination and conduct references.
- Includes seminary contact details.

## Current Data Status

- 124 clean student records.
- 67 active students.
- 57 alumni.
- 0 graduated records, because graduates are alumni.
- 5 program groups.
