# Deployment Notes

## Live Deployment

- Platform: GitHub Pages
- Repository: `Jayasree2020/agbs-office-portal`
- Live URL: `https://jayasree2020.github.io/agbs-office-portal/`

The former Vercel URL currently returns HTTP 402 because the Vercel account/project is deployment-disabled. Vercel billing must be reactivated before that URL can work again.

## Vercel Settings

- Framework preset: Other / Static
- Build command: none
- Output directory: project root
- Root directory: repository root

## GitHub Flow

- The repository is updated through GitHub.
- GitHub Pages republishes automatically after changes are pushed to `main`.
- The repository is currently public because GitHub Pages is serving the portal from it.

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
