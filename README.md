# Article Frontend

Frontend test Sharing Vision 2023. React + Vite. Butuh backend dari [article-backend](https://github.com/andiahyaul/article-backend) yang berjalan di `http://localhost:8080`.

## Menjalankan

Prasyarat: Node 18+.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`. URL API diatur lewat `VITE_API_URL` (lihat `.env.example`).

## Halaman

- `/posts`: tab Published, Drafts, Trashed. Ikon trash memindahkan artikel ke Trashed.
- `/new`: form artikel baru, tombol Publish dan Draft.
- `/edit/:id`: ubah artikel.
- `/preview`: artikel berstatus publish, 5 per halaman.
