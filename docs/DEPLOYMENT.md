# Deployment Notes

## Live Deployment

- Platform: Vercel
- Repository: `Jayasree2020/agbs-office-portal`
- Live URL: `https://agbs-office-portal.vercel.app`

## Vercel Settings

- Framework preset: Other / Static
- Build command: none
- Output directory: project root
- Root directory: repository root

## GitHub Flow

- The repository is updated through GitHub.
- Vercel redeploys automatically after GitHub changes are pushed.
- Keep the repository private because it relates to seminary office records.

## Privacy Notes

- The current seed data is encrypted in `data/students.js`.
- Browser storage is used for edits in this prototype.
- For long-term office use, add:
  - Hosted authentication
  - Private database
  - Server-side backups
  - Staff roles and audit trail stored outside the browser

## Recommended Protection

- Enable Vercel Deployment Protection.
- Do not publish passwords in GitHub, README files, screenshots, or public notes.
- Revoke any GitHub token shared in chat and create fresh limited-scope tokens only when needed.
