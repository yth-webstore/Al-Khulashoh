# 🤝 Panduan Kontribusi (Contributing Guidelines)

Terima kasih atas minat Anda untuk berkontribusi pada repositori **Kitab Al-Khulashah**!

Proyek ini bertujuan menjaga kemurnian naskah dzikir dan doa susunan **Al-Habib Umar bin Hafidz**, menyempurnakan terjemahan bahasa Indonesia, dan menyediakan platform digital yang mudah diakses oleh umat Islam di seluruh dunia.

---

## 📌 Kode Etik & Amanah Teks

1. **Amanah Ilmiah:** Naskah Al-Khulashah bersumber dari Al-Qur'an, Hadits Nabi ﷺ, dan amalan para Wali Allah Salafus Shalih. Setiap perubahan teks Arab harus memiliki rujukan yang dapat dipertanggungjawabkan (cetakan resmi Darul Musthafa Tarim, Penerbit Bacalah, atau kitab rujukan asli seperti *Al-Adzkar* Imam Nawawi).
2. **Koreksi Harakat:** Jika menemukan harakat yang keliru atau kurang tepat, sertakan penjelasan singkat serta perbandingan dengan cetakan fisik kitab.
3. **Penyempurnaan Terjemahan:** Terjemahan hendaknya mengutamakan kejelasan makna tanpa mengurangi keagungan adab bermunajat kepada Allah SWT.

---

## 🛠️ Alur Kerja Git & Pull Request

### 1. Fork & Clone
Fork repositori ini ke akun GitHub Anda, lalu clone secara lokal:
```bash
git clone https://github.com/USERNAME/al-khulashah.git
cd al-khulashah
npm install
```

### 2. Buat Branch Baru
Gunakan konvensi penamaan branch yang jelas:
- `fix/harakat-[nama-bab]` (contoh: `fix/harakat-wirdul-latif`)
- `feat/terjemah-[nama-bab]` (contoh: `feat/terjemah-hizbul-bahr`)
- `docs/[topik]` (contoh: `docs/update-readme`)

```bash
git checkout -b fix/harakat-wirdul-latif
```

### 3. Lakukan Perubahan
Anda dapat mengedit langsung:
- File data TypeScript di `src/data/`
- File teks Markdown di `docs/AL_KHULASHAH_LENGKAP.md`
- Komponen tampilan di `src/components/`

### 4. Uji Kompilasi
Pastikan kode tidak memiliki error sintaks:
```bash
npm run build
```

### 5. Commit & Push
Gunakan pesan commit yang deskriptif:
```bash
git add .
git commit -m "fix(wirdul-latif): koreksi harakat pada bait ke-3 sesuai cetakan Tarim"
git push origin fix/harakat-wirdul-latif
```

### 6. Buka Pull Request (PR)
Buka Pull Request ke branch `main` pada repositori utama dan jelaskan perubahan yang Anda lakukan.

---

Semoga setiap huruf dan harakat yang Anda teliti menjadi amal jariyah yang berlipat ganda di sisi Allah SWT. Amin.
