# Panduan Integrasi Backend Laravel

Dokumen ini menjelaskan langkah-langkah detail untuk mengintegrasikan aplikasi frontend dengan backend Laravel Anda.

## 📋 Table of Contents

1. [Setup Laravel](#setup-laravel)
2. [Setup Database](#setup-database)
3. [Implementasi Models & Migrations](#implementasi-models--migrations)
4. [Implementasi API Routes & Controllers](#implementasi-api-routes--controllers)
5. [Konfigurasi CORS](#konfigurasi-cors)
6. [Integrasi Frontend](#integrasi-frontend)

## 🚀 Setup Laravel

### 1. Install Laravel

```bash
composer create-project laravel/laravel project-management-backend
cd project-management-backend
```

### 2. Konfigurasi Environment

Edit file `.env`:

```env
APP_NAME="Project Management API"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project_management
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost
```

### 3. Install Laravel Sanctum (untuk API authentication)

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

## 🗄️ Setup Database

### 1. Buat Database

```bash
php artisan db:create project_management
# Atau buat manual via phpMyAdmin/MySQL Workbench
```

### 2. Buat Migrations

```bash
php artisan make:migration create_projects_table
php artisan make:migration create_tasks_table
php artisan make:migration create_subtasks_table
php artisan make:migration create_comments_table
php artisan make:migration create_time_entries_table
php artisan make:migration create_documents_table
php artisan make:migration create_notifications_table
php artisan make:migration create_project_members_table
```

## 📝 Implementasi Models & Migrations

### 1. User Migration (Update existing)

Edit `database/migrations/xxxx_create_users_table.php`:

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone', 20)->nullable();
            $table->enum('role', ['admin', 'manager', 'member'])->default('member');
            $table->string('department', 100)->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

### 2. Projects Migration

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->text('description')->nullable();
            $table->enum('status', ['new', 'ongoing', 'completed', 'paused'])->default('new');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->date('deadline')->nullable();
            $table->integer('progress')->default(0);
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
```

### 3. Tasks Migration

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('assignee_id')->nullable()->constrained('users');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->enum('status', ['not-started', 'in-progress', 'review', 'completed'])->default('not-started');
            $table->date('deadline')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
```

### 4. Jalankan Migrations

```bash
php artisan migrate
```

### 5. Buat Seeders untuk Demo Data

```bash
php artisan make:seeder UserSeeder
php artisan make:seeder ProjectSeeder
```

Edit `database/seeders/UserSeeder.php`:

```php
<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'status' => 'active'
        ]);

        User::create([
            'name' => 'Manager User',
            'email' => 'manager@example.com',
            'password' => Hash::make('manager123'),
            'role' => 'manager',
            'status' => 'active'
        ]);

        User::create([
            'name' => 'Team Member',
            'email' => 'member@example.com',
            'password' => Hash::make('member123'),
            'role' => 'member',
            'status' => 'active'
        ]);
    }
}
```

Jalankan seeder:

```bash
php artisan db:seed --class=UserSeeder
```

## 🎯 Implementasi API Routes & Controllers

### 1. Buat Controllers

```bash
php artisan make:controller API/AuthController
php artisan make:controller API/ProjectController --api
php artisan make:controller API/TaskController --api
php artisan make:controller API/TeamController --api
php artisan make:controller API/TimeEntryController --api
php artisan make:controller API/DocumentController --api
php artisan make:controller API/NotificationController --api
```

### 2. AuthController

Edit `app/Http/Controllers/API/AuthController.php`:

```php
<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)
                    ->where('status', 'active')
                    ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'department' => $user->department
            ],
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }
}
```

### 3. ProjectController

Edit `app/Http/Controllers/API/ProjectController.php`:

```php
<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['creator', 'members'])
            ->withCount('members')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'description' => 'nullable|string',
            'status' => 'required|in:new,ongoing,completed,paused',
            'priority' => 'required|in:low,medium,high',
            'deadline' => 'nullable|date',
            'progress' => 'nullable|integer|min:0|max:100'
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['progress'] = $validated['progress'] ?? 0;

        $project = Project::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully',
            'data' => $project
        ], 201);
    }

    public function show(Project $project)
    {
        $project->load(['creator', 'members', 'tasks']);
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:200',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:new,ongoing,completed,paused',
            'priority' => 'sometimes|required|in:low,medium,high',
            'deadline' => 'nullable|date',
            'progress' => 'nullable|integer|min:0|max:100'
        ]);

        $project->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully',
            'data' => $project
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ]);
    }
}
```

### 4. Project Model

Edit `app/Models/Project.php`:

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status',
        'priority',
        'deadline',
        'progress',
        'created_by'
    ];

    protected $casts = [
        'deadline' => 'date',
        'progress' => 'integer'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'project_members')
            ->withTimestamps();
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
```

### 5. API Routes

Edit `routes/api.php`:

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\TeamController;
use App\Http\Controllers\API\TimeEntryController;
use App\Http\Controllers\API\DocumentController;
use App\Http\Controllers\API\NotificationController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Projects
    Route::apiResource('projects', ProjectController::class);
    
    // Tasks
    Route::apiResource('tasks', TaskController::class);
    Route::get('/projects/{project}/tasks', [TaskController::class, 'byProject']);
    
    // Team
    Route::apiResource('team', TeamController::class);
    Route::post('/projects/{project}/members', [TeamController::class, 'addMember']);
    Route::delete('/projects/{project}/members/{user}', [TeamController::class, 'removeMember']);
    
    // Time Entries
    Route::apiResource('time-entries', TimeEntryController::class);
    
    // Documents
    Route::apiResource('documents', DocumentController::class);
    Route::post('/documents/upload', [DocumentController::class, 'upload']);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
});
```

## 🌐 Konfigurasi CORS

### 1. Install Laravel CORS

Laravel sudah include CORS middleware. Edit `config/cors.php`:

```php
<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 2. Update Middleware

Pastikan CORS middleware aktif di `app/Http/Kernel.php`:

```php
protected $middleware = [
    // ...
    \App\Http\Middleware\HandleCors::class,
];
```

## 🔗 Integrasi Frontend

### 1. Update API Configuration

Edit `/components/api/mockApi.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8000/api';

// Store auth token
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  localStorage.setItem('auth_token', token);
};

export const getAuthToken = () => {
  if (!authToken) {
    authToken = localStorage.getItem('auth_token');
  }
  return authToken;
};

export const clearAuthToken = () => {
  authToken = null;
  localStorage.removeItem('auth_token');
};

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearAuthToken();
    window.location.href = '/login';
  }

  return response.json();
};

export const api = {
  // Authentication
  login: async (email: string, password: string) => {
    const data = await apiCall('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.success && data.token) {
      setAuthToken(data.token);
    }
    
    return data;
  },

  logout: async () => {
    const data = await apiCall('/logout', { method: 'POST' });
    clearAuthToken();
    return data;
  },

  // Projects
  getProjects: async () => {
    return apiCall('/projects');
  },

  createProject: async (projectData: any) => {
    return apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  updateProject: async (id: number, projectData: any) => {
    return apiCall(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject: async (id: number) => {
    return apiCall(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Tasks
  getTasks: async () => {
    return apiCall('/tasks');
  },

  createTask: async (taskData: any) => {
    return apiCall('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  updateTask: async (id: number, taskData: any) => {
    return apiCall(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  deleteTask: async (id: number) => {
    return apiCall(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  // Team
  getTeamMembers: async () => {
    return apiCall('/team');
  },

  // Time Tracking
  getTimeEntries: async () => {
    return apiCall('/time-entries');
  },

  createTimeEntry: async (entryData: any) => {
    return apiCall('/time-entries', {
      method: 'POST',
      body: JSON.stringify(entryData),
    });
  },

  // Documents
  getDocuments: async () => {
    return apiCall('/documents');
  },

  uploadDocument: async (file: File, metadata: any) => {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });

    const token = getAuthToken();
    return fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  // Notifications
  getNotifications: async () => {
    return apiCall('/notifications');
  },

  markNotificationAsRead: async (id: number) => {
    return apiCall(`/notifications/${id}/read`, {
      method: 'POST',
    });
  },
};
```

## 🚀 Menjalankan Aplikasi

### 1. Start Laravel Server

```bash
cd project-management-backend
php artisan serve
# Server berjalan di http://localhost:8000
```

### 2. Start Frontend React

```bash
# Di folder frontend
npm start
# Frontend berjalan di http://localhost:3000
```

## 🔒 Security Best Practices

1. **Gunakan Laravel Sanctum** untuk API authentication
2. **Validation** - Selalu validate input dengan Laravel's validation
3. **Authorization** - Gunakan Laravel Policies untuk authorization
4. **Rate Limiting** - Aktifkan rate limiting di routes
5. **HTTPS** - Gunakan HTTPS di production
6. **Environment Variables** - Simpan credentials di `.env`

## 📝 Testing API

### Menggunakan Postman atau curl:

```bash
# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get Projects (dengan token)
curl http://localhost:8000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create Project
curl -X POST http://localhost:8000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"New Project",
    "description":"Project description",
    "status":"new",
    "priority":"high",
    "deadline":"2026-02-01"
  }'
```

## 🎯 Next Steps

1. ✅ Implement semua models dan migrations
2. ✅ Implement semua controllers
3. ✅ Setup authentication dengan Sanctum
4. ✅ Implement file upload untuk documents
5. ✅ Add authorization policies
6. ✅ Setup queue untuk email notifications
7. ✅ Implement real-time dengan Laravel Echo & Pusher
8. ✅ Add unit tests
9. ✅ Deploy ke production

---

**Selamat mengembangkan dengan Laravel! 🚀**
