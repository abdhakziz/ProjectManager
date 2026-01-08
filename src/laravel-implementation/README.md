# Laravel Calendar Implementation

Implementasi Calendar Module untuk Laravel menggunakan Blade Template dan Alpine.js

## 📁 Struktur File

```
laravel-project/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── CalendarController.php
│   └── Models/
│       └── Event.php
├── database/
│   └── migrations/
│       └── xxxx_xx_xx_create_events_table.php
├── resources/
│   └── views/
│       └── calendar/
│           └── index.blade.php (calendar.blade.php)
└── routes/
    └── web.php
```

## 🚀 Instalasi

### 1. Copy File-file yang Diperlukan

**Controller:**
```bash
cp CalendarController.php app/Http/Controllers/
```

**Model:**
```bash
cp Event.php app/Models/
```

**Migration:**
```bash
cp create_events_table.php database/migrations/2024_01_01_000000_create_events_table.php
```

**View:**
```bash
mkdir -p resources/views/calendar
cp calendar.blade.php resources/views/calendar/index.blade.php
```

**Routes:**
Tambahkan routes dari `web.php` ke file `routes/web.php` Anda

### 2. Install Alpine.js

Tambahkan Alpine.js di layout utama Anda (`resources/views/layouts/app.blade.php`):

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Project Management')</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    @stack('styles')
</head>
<body>
    @yield('content')
    
    @stack('scripts')
</body>
</html>
```

### 3. Jalankan Migration

```bash
php artisan migrate
```

### 4. (Optional) Seed Data

Buat seeder untuk event:

```bash
php artisan make:seeder EventSeeder
```

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    public function run()
    {
        Event::create([
            'title' => 'Design homepage mockup selesai',
            'project_id' => 1, // sesuaikan dengan project_id yang ada
            'user_id' => 1,
            'date' => Carbon::now()->addDays(2),
            'type' => 'milestone',
            'priority' => 'high'
        ]);
        
        Event::create([
            'title' => 'Team meeting - Sprint planning',
            'project_id' => 1,
            'user_id' => 1,
            'date' => Carbon::now()->addDays(1),
            'type' => 'meeting',
            'priority' => 'medium'
        ]);
        
        // Tambahkan event lainnya...
    }
}
```

Jalankan seeder:
```bash
php artisan db:seed --class=EventSeeder
```

## 📝 Penggunaan

### Akses Calendar

Buka browser dan akses:
```
http://your-app.test/calendar
```

### Mengambil Data dari Database

Ubah CalendarController.php untuk mengambil data real dari database:

```php
public function index(Request $request)
{
    $currentUser = auth()->user();
    $selectedProject = session('selected_project_id') 
        ? Project::find(session('selected_project_id')) 
        : null;
    
    // Ambil events dari database
    $query = Event::with('project');
    
    // Filter by project jika ada project yang dipilih
    if ($selectedProject) {
        $query->where('project_id', $selectedProject->id);
    }
    
    // Ambil events bulan ini
    $events = $query->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year)
                    ->get()
                    ->map(function($event) {
                        return [
                            'id' => $event->id,
                            'title' => $event->title,
                            'project' => $event->project->name ?? 'General',
                            'date' => $event->date->format('Y-m-d'),
                            'type' => $event->type,
                            'priority' => $event->priority
                        ];
                    })
                    ->toArray();
    
    // Gantt data (sesuaikan dengan kebutuhan)
    $ganttData = $this->getGanttData($selectedProject);
    
    return view('calendar.index', compact('currentUser', 'selectedProject', 'events', 'ganttData'));
}
```

## 🎨 Customization

### Mengubah Warna Event

Edit di file `calendar.blade.php` pada fungsi `getTypeColor()`:

```javascript
getTypeColor(type) {
    switch (type) {
        case 'milestone':
            return 'bg-purple-500'; // Ubah warna milestone
        case 'meeting':
            return 'bg-indigo-500'; // Ubah warna meeting
        case 'task':
            return 'bg-emerald-500'; // Ubah warna task
        default:
            return 'bg-gray-500';
    }
}
```

### Menambah Event Type Baru

1. Tambahkan di migration:
```php
$table->enum('type', ['milestone', 'meeting', 'task', 'reminder'])->default('task');
```

2. Update case di `getTypeColor()`:
```javascript
case 'reminder':
    return 'bg-yellow-500';
```

3. Tambahkan legend:
```html
<div class="flex items-center gap-2">
    <div class="w-4 h-4 bg-yellow-500 rounded"></div>
    <span class="text-sm text-gray-600">Reminder</span>
</div>
```

## 🔧 Fitur Tambahan (Optional)

### 1. AJAX Load Events

Update fungsi `getEventsForMonth` di Controller:

```php
public function getEventsForMonth(Request $request)
{
    $year = $request->input('year', date('Y'));
    $month = $request->input('month', date('m'));
    
    $events = Event::with('project')
        ->whereYear('date', $year)
        ->whereMonth('date', $month)
        ->get()
        ->map(function($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'project' => $event->project->name ?? 'General',
                'date' => $event->date->format('Y-m-d'),
                'type' => $event->type,
                'priority' => $event->priority
            ];
        });
    
    return response()->json($events);
}
```

Update Alpine.js component untuk load via AJAX:

```javascript
async loadEvents() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth() + 1;
    
    const response = await fetch(`/calendar/events?year=${year}&month=${month}`);
    this.events = await response.json();
}
```

### 2. Click Event Detail

Tambahkan modal untuk menampilkan detail event saat di-click.

## 📚 Dependencies

- **Laravel 10+**
- **Tailwind CSS** (via CDN atau npm)
- **Alpine.js 3.x** (via CDN atau npm)
- **Carbon** (sudah include di Laravel)

## 🔐 Permissions

Pastikan user sudah login untuk mengakses calendar:

```php
Route::middleware(['auth'])->group(function () {
    Route::get('/calendar', [CalendarController::class, 'index']);
});
```

## 📌 Tips

1. **Performance**: Untuk project dengan banyak event, gunakan pagination atau lazy loading
2. **Caching**: Cache gantt data untuk meningkatkan performance
3. **Real-time**: Integrate dengan Laravel Echo untuk real-time updates
4. **Export**: Tambahkan fitur export calendar ke PDF/Excel

## 🐛 Troubleshooting

**Alpine.js tidak berfungsi:**
- Pastikan Alpine.js sudah di-load di layout
- Check console browser untuk error JavaScript

**Events tidak muncul:**
- Check data events di controller
- Pastikan format date sesuai (Y-m-d)
- Verify struktur data di `@js($events)`

**Styling tidak sesuai:**
- Pastikan Tailwind CSS sudah di-load
- Check conflict dengan CSS lain

## 📞 Support

Untuk pertanyaan atau issue, silakan contact developer atau buat issue di repository.
