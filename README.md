# ForumDisku - Aplikasi Forum Diskusi

Aplikasi forum diskusi berbasis React + Redux dengan Automation Testing dan CI/CD.

## Fitur Utama
- Registrasi & Login akun
- Daftar, detail, dan buat thread
- Komentar, voting (Optimistic UI)
- Filter kategori & Leaderboard
- Unit Testing (Jest + React Testing Library)
- E2E Testing (Cypress)
- CI/CD (GitHub Actions + Vercel)

## Perintah

```bash
npm install       # Install semua dependency
npm start         # Jalankan aplikasi
npm run lint      # Cek ESLint
npm test          # Unit test
npm run e2e       # E2E test (app harus berjalan)
npm run e2e:open  # E2E dengan UI Cypress
```

## Struktur Test

```
src/__tests__/
├── reducers/
│   ├── authSlice.test.js       # 7 test cases
│   └── threadsSlice.test.js    # 10 test cases
├── thunks/
│   ├── authThunks.test.js      # 5 test cases
│   └── threadsThunks.test.js   # 8 test cases
└── components/
    ├── VoteButton.test.jsx     # 8 test cases
    └── LoadingSpinner.test.jsx # 4 test cases
cypress/e2e/
└── login.cy.js                 # 4 E2E test cases
```

## CI/CD Setup

### GitHub Actions
Push ke `main` → Lint → Test → Deploy ke Vercel

### Vercel Secrets (di GitHub repository settings)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Branch Protection
Settings → Branches → Require status checks: "Lint & Unit Test"

## Screenshot CI/CD
Lihat folder `screenshot/` untuk bukti konfigurasi CI/CD.
