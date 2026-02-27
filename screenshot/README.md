# Screenshot CI/CD

Folder ini berisi screenshot konfigurasi CI/CD:

- `1_ci_check_error.png` - CI check error ketika unit test gagal
- `2_ci_check_pass.png` - CI check pass ketika semua test lolos
- `3_branch_protection.png` - Branch protection aktif di GitHub

## Cara mengambil screenshot:

1. Push kode ke GitHub
2. Buat PR dengan kode yang memiliki test error → screenshot hasilnya sebagai `1_ci_check_error.png`
3. Fix error, push lagi → screenshot CI pass sebagai `2_ci_check_pass.png`
4. Settings → Branches → screenshot branch protection sebagai `3_branch_protection.png`
