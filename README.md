# AGBS Private Seminary Office Portal

Private office portal prototype for Amazing Grace Biblical Seminary.

## What Is Included

- Admin-only login screen with AGBS branding.
- Dashboard for student lifecycle records.
- Searchable student register seeded from `Register_and_Admission_numbers2026.doc`.
- Admission record creation with register number generation.
- Graduation and alumni tracking.
- CSV import/export and JSON backup.
- Program and handbook reference pages using the Student Handbook.

## Office Login

- Username: `superadmin` or `office`
- Password: use the office register password shared during setup.

The seeded register is encrypted in the deployed files. For full production use, enable Vercel Deployment Protection and replace this static login with hosted authentication plus a private database.

## Vercel

This is a static web portal and can be deployed directly on Vercel from GitHub.

[Deploy / Import on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Jayasree2020/agbs-office-portal)

Build command: none  
Output directory: project root

For production, connect a private cloud database and replace local browser storage with server-side storage. Keep the project private because it contains seminary office records.
