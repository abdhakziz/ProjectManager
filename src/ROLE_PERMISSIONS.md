# 🔐 Role-Based Access Control (RBAC) - Panduan Lengkap

Dokumentasi lengkap tentang permission dan akses untuk setiap role dalam sistem Project Management.

## 📋 Ringkasan Role

| Role | Deskripsi | Akses |
|------|-----------|-------|
| **Admin** | Administrator | Full access ke semua modul dan fitur |
| **Manager** | Project Manager | Manage tim dan proyek yang ditugaskan |
| **Member** | Team Member | Akses terbatas ke tugas yang ditugaskan |

---

## 🎯 Permission Matrix - Per Modul

### 1. **Dashboard**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View dashboard | ✅ | ✅ | ✅ |
| View all company stats | ✅ | ❌ | ❌ |
| View team stats | ✅ | ✅ | ❌ |
| View own stats | ✅ | ✅ | ✅ |
| Export dashboard data | ✅ | ✅ | ❌ |

**Detail per Role:**

- **Admin**: Melihat statistik lengkap semua proyek (48 proyek, 456 tasks, 2456 jam, 24 anggota)
- **Manager**: Melihat statistik tim mereka (12 proyek, 145 tasks, 640 jam, 8 anggota)
- **Member**: Melihat statistik pribadi (3 proyek, 28 tasks, 186 jam)

---

### 2. **Manajemen Proyek**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View all projects | ✅ | ✅ | ❌ |
| View assigned projects | ✅ | ✅ | ✅ |
| Create new project | ✅ | ✅ | ❌ |
| Edit all projects | ✅ | ❌ | ❌ |
| Edit own projects | ✅ | ✅ | ❌ |
| Delete project | ✅ | ❌ | ❌ |
| Archive project | ✅ | ✅ | ❌ |
| View project stats | ✅ | ✅ | ✅ |
| Add team members to project | ✅ | ✅ | ❌ |

**Detail per Role:**

- **Admin**: 
  - Dapat melihat, membuat, edit, dan hapus SEMUA proyek
  - Tombol "Proyek Baru" muncul
  - Dropdown menu: Edit, Hapus tersedia
  - Subtitle: "Kelola semua proyek Anda di satu tempat"

- **Manager**:
  - Dapat melihat semua proyek dan edit proyek mereka
  - Tombol "Proyek Baru" muncul
  - Dropdown menu: Edit tersedia (hanya proyek mereka)
  - Subtitle: "Kelola semua proyek Anda di satu tempat"

- **Member**:
  - Hanya melihat proyek yang ditugaskan
  - TIDAK ada tombol "Proyek Baru"
  - TIDAK ada dropdown menu (read-only)
  - Subtitle: "Proyek yang ditugaskan kepada Anda"

---

### 3. **Manajemen Tugas**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View all tasks | ✅ | ✅ | ❌ |
| View assigned tasks | ✅ | ✅ | ✅ |
| Create task | ✅ | ✅ | ❌ |
| Assign task to others | ✅ | ✅ | ❌ |
| Edit all tasks | ✅ | ❌ | ❌ |
| Edit assigned tasks | ✅ | ✅ | ❌ |
| Delete task | ✅ | ❌ | ❌ |
| Change own task status | ✅ | ✅ | ✅ |
| Add subtasks | ✅ | ✅ | ✅ |
| Add comments | ✅ | ✅ | ✅ |
| Upload attachments | ✅ | ✅ | ✅ |

**Detail per Role:**

- **Admin**: Full CRUD untuk semua tugas
- **Manager**: Dapat create, assign, dan edit tugas tim mereka
- **Member**: Hanya dapat update status tugas yang ditugaskan ke mereka

---

### 4. **Kalender & Timeline**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View calendar | ✅ | ✅ | ✅ |
| View all events | ✅ | ✅ | ❌ |
| View own events | ✅ | ✅ | ✅ |
| Create event/meeting | ✅ | ✅ | ❌ |
| Edit all events | ✅ | ❌ | ❌ |
| Edit own events | ✅ | ✅ | ❌ |
| Delete event | ✅ | ❌ | ❌ |
| View Gantt chart | ✅ | ✅ | ✅ |

---

### 5. **Manajemen Tim**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View all team members | ✅ | ✅ | ✅ |
| View member details | ✅ | ✅ | ✅ |
| Invite new member | ✅ | ✅ | ❌ |
| Edit member info | ✅ | ❌ | ❌ |
| Remove member | ✅ | ❌ | ❌ |
| Change member roles | ✅ | ❌ | ❌ |
| View member performance | ✅ | ✅ | ❌ |
| View member workload | ✅ | ✅ | ❌ |

**Detail per Role:**

- **Admin**: Full access, dapat change roles dan remove members
- **Manager**: Dapat invite dan view perfor mance tim mereka
- **Member**: Read-only, hanya melihat daftar anggota tim

---

### 6. **Laporan & Analitik**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View reports | ✅ | ✅ | ✅ |
| View all company reports | ✅ | ❌ | ❌ |
| View team reports | ✅ | ✅ | ❌ |
| View own reports | ✅ | ✅ | ✅ |
| Export reports | ✅ | ✅ | ❌ |
| Create custom reports | ✅ | ✅ | ❌ |
| View productivity charts | ✅ | ✅ | ✅ |
| View time distribution | ✅ | ✅ | ✅ |

**Data yang Ditampilkan:**

- **Admin**: Semua data perusahaan (48 proyek, 324 tasks, 2456 jam, 24 anggota)
- **Manager**: Data tim mereka (12 proyek, 85 tasks, 640 jam, 8 anggota)
- **Member**: Data pribadi (5 proyek, 28 tasks, 186 jam, 1 anggota)

---

### 7. **Time Tracking**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View all time entries | ✅ | ❌ | ❌ |
| View team time entries | ✅ | ✅ | ❌ |
| View own time entries | ✅ | ✅ | ✅ |
| Create time entry | ✅ | ✅ | ✅ |
| Edit all time entries | ✅ | ❌ | ❌ |
| Edit own time entries | ✅ | ✅ | ✅ |
| Delete time entry | ✅ | ❌ | ❌ |
| Approve time entries | ✅ | ✅ | ❌ |
| Export time report | ✅ | ✅ | ❌ |

---

### 8. **Manajemen Dokumen**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View all documents | ✅ | ✅ | ❌ |
| View project documents | ✅ | ✅ | ✅ |
| Upload document | ✅ | ✅ | ✅ |
| Edit document metadata | ✅ | ✅ | ❌ |
| Delete all documents | ✅ | ❌ | ❌ |
| Delete own documents | ✅ | ✅ | ✅ |
| Manage versions | ✅ | ✅ | ❌ |
| Download documents | ✅ | ✅ | ✅ |

---

### 9. **Notifikasi & Pengingat**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View notifications | ✅ | ✅ | ✅ |
| Mark as read | ✅ | ✅ | ✅ |
| Manage notification settings | ✅ | ✅ | ✅ |
| Send announcements | ✅ | ❌ | ❌ |
| Filter notifications | ✅ | ✅ | ✅ |
| Delete notifications | ✅ | ✅ | ✅ |

---

### 10. **Pengaturan**

| Fitur | Admin | Manager | Member |
|-------|-------|---------|--------|
| View settings | ✅ | ✅ | ✅ |
| Edit system settings | ✅ | ❌ | ❌ |
| Edit own profile | ✅ | ✅ | ✅ |
| Manage integrations | ✅ | ❌ | ❌ |
| View audit logs | ✅ | ❌ | ❌ |
| Manage security settings | ✅ | ❌ | ❌ |

---

## 📊 Akses Modul - Sidebar Menu

### Admin - 10 Menu Items
1. ✅ Dashboard
2. ✅ Proyek
3. ✅ Tugas
4. ✅ Kalender
5. ✅ Tim
6. ✅ Laporan
7. ✅ Time Tracking
8. ✅ Dokumen
9. ✅ Notifikasi
10. ✅ Pengaturan

### Manager - 10 Menu Items
1. ✅ Dashboard
2. ✅ Proyek
3. ✅ Tugas
4. ✅ Kalender
5. ✅ Tim
6. ✅ Laporan
7. ✅ Time Tracking
8. ✅ Dokumen
9. ✅ Notifikasi
10. ✅ Pengaturan

### Member - 8 Menu Items
1. ✅ Dashboard
2. ❌ Proyek (tidak ada akses)
3. ✅ Tugas
4. ✅ Kalender
5. ✅ Tim
6. ❌ Laporan (tidak ada akses)
7. ✅ Time Tracking
8. ✅ Dokumen
9. ✅ Notifikasi
10. ✅ Pengaturan

---

## 🔧 Implementasi Teknis

### File Permission System

```typescript
/components/utils/permissions.ts
```

**Fungsi Helper:**

```typescript
// Check single permission
hasPermission(userRole, 'create_project')

// Check multiple permissions (any)
hasAnyPermission(userRole, ['edit_task', 'delete_task'])

// Check multiple permissions (all)
hasAllPermissions(userRole, ['view_reports', 'export_reports'])

// Check module access
canAccessModule(userRole, 'reports')

// Get all permissions for role
getRolePermissions(userRole)

// Get accessible modules
getAccessibleModules(userRole)
```

### Contoh Penggunaan di Component

```typescript
import { hasPermission, canAccessModule } from '../utils/permissions';

function Projects({ currentUser }) {
  const canCreateProject = hasPermission(currentUser.role, 'create_project');
  const canEditAllProjects = hasPermission(currentUser.role, 'edit_all_projects');
  const canDeleteProject = hasPermission(currentUser.role, 'delete_project');

  return (
    <div>
      {/* Show button only if has permission */}
      {canCreateProject && (
        <Button>Proyek Baru</Button>
      )}
      
      {/* Conditional dropdown menu */}
      {(canEditAllProjects || canDeleteProject) && (
        <DropdownMenu>
          {canEditAllProjects && <MenuItem>Edit</MenuItem>}
          {canDeleteProject && <MenuItem>Hapus</MenuItem>}
        </DropdownMenu>
      )}
    </div>
  );
}
```

---

## 🎨 UI/UX Berbeda Per Role

### Dashboard

**Admin:**
```
- Total Proyek: 48
- Tugas Selesai: 456
- Jam Kerja: 2,456h
- Anggota Tim: 24
- Grafik: Semua data perusahaan
```

**Manager:**
```
- Total Proyek: 12
- Tugas Selesai: 145
- Jam Kerja: 640h
- Anggota Tim: 8
- Grafik: Data tim yang dikelola
```

**Member:**
```
- Total Proyek: 3
- Tugas Selesai: 28
- Jam Kerja: 186h
- Anggota Tim: 1 (diri sendiri)
- Grafik: Data pribadi
```

---

## 🔒 Security Best Practices

1. **Frontend Validation**
   - Hide UI elements yang tidak authorized
   - Disable buttons berdasarkan permission
   - Redirect jika user akses modul unauthorized

2. **Backend Validation (Laravel)**
   - ALWAYS validate permissions di backend
   - Gunakan Laravel Policies
   - Middleware untuk route protection

```php
// Laravel Policy Example
public function update(User $user, Project $project)
{
    if ($user->role === 'admin') {
        return true;
    }
    
    if ($user->role === 'manager') {
        return $project->created_by === $user->id;
    }
    
    return false;
}
```

3. **API Security**
   - Token-based authentication (Laravel Sanctum)
   - Role checking di setiap endpoint
   - Rate limiting per role

---

## 📝 Testing Checklist

### Admin Testing
- [ ] Dapat akses semua 10 modul
- [ ] Dapat create, edit, delete di semua modul
- [ ] Melihat data semua perusahaan
- [ ] Dapat change user roles
- [ ] Dapat view audit logs

### Manager Testing
- [ ] Dapat akses 10 modul
- [ ] Dapat create proyek dan tasks
- [ ] Hanya edit proyek/tasks tim mereka
- [ ] Melihat data tim yang dikelola
- [ ] Dapat invite team members

### Member Testing
- [ ] Dapat akses 8 modul (tidak ada Projects, Reports)
- [ ] TIDAK bisa create proyek
- [ ] Hanya lihat tugas yang ditugaskan
- [ ] Hanya edit status tugas sendiri
- [ ] Melihat data pribadi saja

---

## 🚀 Migration dari Aplikasi Lama

Jika Anda sudah memiliki data users, jalankan migration untuk menambahkan role:

```sql
-- Update existing users
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
UPDATE users SET role = 'manager' WHERE email LIKE '%manager%';
UPDATE users SET role = 'member' WHERE role IS NULL;
```

---

## 📞 Support

Untuk pertanyaan tentang RBAC system, silakan:
1. Baca dokumentasi ini
2. Check file `/components/utils/permissions.ts`
3. Lihat implementasi di module Projects atau Dashboard
4. Contact development team

---

**Last Updated:** 6 Januari 2026
**Version:** 1.0.0
