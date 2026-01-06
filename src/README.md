# Project Management System

Aplikasi manajemen proyek lengkap dengan 10 modul utama yang dibangun dengan React dan Tailwind CSS.

## 🎯 Fitur Utama

### 1. **Manajemen Proyek**
- Buat, edit, dan hapus proyek
- Deskripsi proyek, tujuan, dan deadline
- Status proyek (baru, sedang berjalan, selesai, ditunda)
- Progress tracking dengan visualisasi

### 2. **Manajemen Tugas (Task Management)**
- Buat tugas dan sub-tugas
- Assign tugas ke anggota tim
- Set prioritas (rendah, sedang, tinggi)
- Deadline dan reminder
- Status tugas (belum mulai, sedang dikerjakan, menunggu review, selesai)
- Filter berdasarkan status

### 3. **Kolaborasi Tim**
- Komentar di tugas/proyek
- Notifikasi untuk update tugas
- Tag anggota tim dalam diskusi
- File attachment (dokumen, gambar, dll)

### 4. **Kalender & Timeline**
- Kalender untuk melihat deadline dan jadwal
- Gantt chart untuk proyek kompleks
- Visualisasi timeline proyek
- Event dan meeting scheduling

### 5. **Manajemen Anggota Tim**
- Invite & kelola anggota
- Role-based access (admin, manager, anggota)
- Profil pengguna
- Departemen dan struktur organisasi

### 6. **Dashboard & Laporan**
- Ringkasan proyek (progress, tugas tertunda, deadline mendekat)
- Laporan produktivitas
- Visualisasi data (grafik bar, pie chart)
- Statistik real-time

### 7. **Waktu & Jam Kerja (Time Tracking)**
- Catat waktu pengerjaan tugas
- Laporan jam kerja per proyek/anggota
- Timer built-in untuk tracking waktu
- Visualisasi distribusi waktu

### 8. **Manajemen Dokumen & File**
- Penyimpanan terpusat untuk dokumen proyek
- Version control untuk file
- Kategorisasi dokumen (design, code, document, dll)
- Search dan filter

### 9. **Notifikasi & Pengingat**
- Pengingat deadline
- Notifikasi real-time untuk update
- Pengaturan preferensi notifikasi (email/push)
- Filter notifikasi berdasarkan tipe

### 10. **Mode Kolaborasi Real-time**
- Live update status
- Real-time notifications
- Collaborative commenting

## 🚀 Teknologi yang Digunakan

- **React** - Framework frontend
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Recharts** - Visualisasi data
- **Lucide React** - Icons
- **shadcn/ui** - UI Components

## 📁 Struktur Proyek

```
/
├── App.tsx                      # Main app dengan routing
├── components/
│   ├── Login.tsx               # Halaman login
│   ├── MainLayout.tsx          # Layout utama dengan sidebar
│   ├── api/
│   │   └── mockApi.ts          # Mock API untuk integrasi backend
│   └── modules/
│       ├── Dashboard.tsx        # Modul Dashboard
│       ├── Projects.tsx         # Modul Manajemen Proyek
│       ├── Tasks.tsx            # Modul Manajemen Tugas
│       ├── CalendarView.tsx     # Modul Kalender & Timeline
│       ├── Team.tsx             # Modul Manajemen Tim
│       ├── TimeTracking.tsx     # Modul Time Tracking
│       ├── Documents.tsx        # Modul Manajemen Dokumen
│       └── Notifications.tsx    # Modul Notifikasi
└── styles/
    └── globals.css             # Global styles
```

## 🔐 Demo Accounts

Aplikasi dilengkapi dengan 3 akun demo:

- **Admin**: admin@example.com / admin123
- **Manager**: manager@example.com / manager123
- **Member**: member@example.com / member123

## 🔒 Role-Based Access Control (RBAC)

Aplikasi ini menggunakan sistem RBAC lengkap dengan 3 level akses:

### 👑 Admin (Administrator)
- **Akses**: Full access ke semua 10 modul
- **Hak**: Create, Edit, Delete semua data
- **Data**: Melihat statistik seluruh perusahaan (48 proyek, 456 tasks, 2456 jam, 24 anggota)
- **Fitur Khusus**: 
  - Manage user roles
  - View audit logs
  - System settings
  - Delete projects

### 👔 Manager (Project Manager)
- **Akses**: 10 modul dengan pembatasan
- **Hak**: Create proyek/tasks, Edit data tim mereka, Approve time entries
- **Data**: Melihat statistik tim yang dikelola (12 proyek, 145 tasks, 640 jam, 8 anggota)
- **Fitur Khusus**:
  - Create & manage projects
  - Invite team members
  - View team reports
  - Approve time tracking

### 👤 Member (Team Member)
- **Akses**: 8 modul (tidak ada Projects & Reports)
- **Hak**: Read-only untuk proyek, Update status tugas sendiri
- **Data**: Melihat data pribadi (3 proyek, 28 tasks, 186 jam)
- **Fitur**:
  - View assigned tasks
  - Update task status
  - Log time entries
  - Upload documents

**Dokumentasi Lengkap**: Lihat `ROLE_PERMISSIONS.md` untuk detail permission matrix

## 🛠️ Integrasi dengan Laravel Backend

Aplikasi ini saat ini menggunakan **mock data** untuk demonstrasi. Untuk mengintegrasikan dengan backend Laravel Anda:

### 1. Setup Laravel Project

Install dan setup Laravel backend:

```bash
# Install Laravel
composer create-project laravel/laravel project-management-backend
cd project-management-backend

# Install Sanctum untuk API authentication
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Setup database di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project_management
DB_USERNAME=root
DB_PASSWORD=

# Jalankan migration
php artisan migrate

# Jalankan server
php artisan serve
```

### 2. Buat Models & Migrations

```bash
php artisan make:model Project -m
php artisan make:model Task -m
php artisan make:model TimeEntry -m
php artisan make:model Document -m
# dst...
```

Lihat file `BACKEND_INTEGRATION.md` untuk detail lengkap setup Laravel.

### 3. Update Mock API

Edit file `/components/api/mockApi.ts` dan uncomment fetch calls:

```typescript
getProjects: async () => {
    return fetch(`${API_BASE_URL}/projects.php`).then(res => res.json());
},
```

### 4. Update API_BASE_URL

Ubah `API_BASE_URL` di `/components/api/mockApi.ts` sesuai URL XAMPP Anda:

```typescript
const API_BASE_URL = 'http://localhost/project-management-api';
```

## 📱 Mobile Responsive

Aplikasi ini fully responsive dan dapat digunakan di:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🎨 Customization

### Warna & Tema

Edit `/styles/globals.css` untuk mengubah color scheme:

```css
:root {
  --primary: #3b82f6;  /* Ubah warna primary */
  --secondary: #10b981; /* Ubah warna secondary */
  /* ... */
}
```

## 🔒 Keamanan

⚠️ **PENTING**: Aplikasi ini adalah demo frontend. Untuk production:

1. Implementasi autentikasi JWT yang proper
2. Validasi input di backend
3. Sanitize data sebelum simpan ke database
4. Implementasi HTTPS
5. Setup CORS dengan benar
6. Hash password dengan bcrypt/argon2
7. Implementasi rate limiting
8. Setup role-based access control (RBAC)

## 📝 Catatan

- Data saat ini disimpan di `localStorage` (akan hilang saat clear browser)
- Untuk production, integrasikan dengan backend database
- Real-time features perlu WebSocket/Socket.io untuk implementasi penuh
- File upload perlu storage solution (local/cloud storage)

## 🚀 Deployment

Untuk deploy aplikasi:

1. Build aplikasi React
2. Setup server PHP di hosting
3. Upload database MySQL
4. Konfigurasi CORS
5. Update API endpoints

## 📞 Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan React, TypeScript, dan Tailwind CSS**