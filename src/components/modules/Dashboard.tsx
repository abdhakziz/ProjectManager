import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  FolderKanban, 
  CheckSquare, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users,
  ArrowUpRight,
  Calendar,
  Target,
  Zap,
  Award,
  Activity,
  Plus,
  Sparkles
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { mockProjects } from '../../App';

interface DashboardProps {
  currentUser: any;
  onProjectCreated?: (project: any) => void;
}

export default function Dashboard({ currentUser, onProjectCreated }: DashboardProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    color: 'bg-blue-500',
    objective: ''
  });

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: 'active',
      progress: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      color: formData.color,
      team: [
        { 
          userId: currentUser.userId, 
          name: currentUser.name, 
          email: currentUser.email, 
          role: 'manager' 
        }
      ],
      tasks: 0,
      completedTasks: 0,
      createdBy: currentUser.userId,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Here you would normally save to backend
    console.log('New project created:', newProject);
    
    // Callback to parent if provided
    if (onProjectCreated) {
      onProjectCreated(newProject);
    }

    setIsCreateDialogOpen(false);
    setFormData({ name: '', description: '', startDate: '', endDate: '', color: 'bg-blue-500', objective: '' });
    alert(`Project "${newProject.name}" berhasil dibuat! Anda adalah Manager dari project ini.`);
  };

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Biru' },
    { value: 'bg-purple-500', label: 'Ungu' },
    { value: 'bg-green-500', label: 'Hijau' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-teal-500', label: 'Teal' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-red-500', label: 'Merah' },
  ];

  // Stats data - same for all users now since role is uniform
  const [stats, setStats] = useState({
    totalProjects: mockProjects.length,
    activeProjects: mockProjects.filter(p => p.status === 'active').length,
    completedTasks: 145,
    pendingTasks: 38,
    teamMembers: 8,
    hoursTracked: 640
  });

  const projectData = [
    { name: 'Jan', completed: 4, ongoing: 3 },
    { name: 'Feb', completed: 3, ongoing: 5 },
    { name: 'Mar', completed: 6, ongoing: 4 },
    { name: 'Apr', completed: 5, ongoing: 7 },
    { name: 'May', completed: 8, ongoing: 6 },
    { name: 'Jun', completed: 7, ongoing: 7 },
  ];

  const taskDistribution = [
    { name: 'Selesai', value: 145, color: '#10b981' },
    { name: 'Dikerjakan', value: 38, color: '#3b82f6' },
    { name: 'Review', value: 12, color: '#f59e0b' },
    { name: 'Pending', value: 25, color: '#94a3b8' },
  ];

  const productivityData = [
    { day: 'Sen', hours: 6.5, tasks: 8 },
    { day: 'Sel', hours: 7.2, tasks: 10 },
    { day: 'Rab', hours: 8.0, tasks: 12 },
    { day: 'Kam', hours: 5.5, tasks: 7 },
    { day: 'Jum', hours: 7.0, tasks: 9 },
    { day: 'Sab', hours: 3.0, tasks: 4 },
    { day: 'Min', hours: 0, tasks: 0 }
  ];

  const recentProjects = [
    { id: 1, name: 'Website Redesign', progress: 75, deadline: '2026-01-15', status: 'ongoing', priority: 'high' },
    { id: 2, name: 'Mobile App Development', progress: 45, deadline: '2026-02-20', status: 'ongoing', priority: 'high' },
    { id: 3, name: 'Marketing Campaign', progress: 90, deadline: '2026-01-10', status: 'ongoing', priority: 'medium' },
    { id: 4, name: 'Database Migration', progress: 30, deadline: '2026-01-25', status: 'ongoing', priority: 'low' },
  ];

  const upcomingDeadlines = [
    { task: 'Finalize homepage design', project: 'Website Redesign', deadline: '2026-01-08', priority: 'high', hours: 4 },
    { task: 'Complete API integration', project: 'Mobile App', deadline: '2026-01-09', priority: 'high', hours: 8 },
    { task: 'Review marketing materials', project: 'Marketing Campaign', deadline: '2026-01-10', priority: 'medium', hours: 2 },
    { task: 'Setup test environment', project: 'Database Migration', deadline: '2026-01-12', priority: 'low', hours: 6 },
  ];

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'bg-red-500' :
           priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section with Create Project Button */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-300" />
              <span className="text-sm font-semibold text-blue-100">Dashboard Overview</span>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Proyek Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    Tambah Proyek Baru
                  </DialogTitle>
                  <DialogDescription>
                    Buat proyek baru dan Anda akan otomatis menjadi Manager
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Proyek *</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama proyek"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      placeholder="Deskripsi singkat tentang proyek"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="objective">Tujuan Proyek</Label>
                    <Textarea
                      id="objective"
                      placeholder="Apa tujuan utama dari proyek ini?"
                      rows={2}
                      value={formData.objective}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Tanggal Mulai *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Tanggal Selesai *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Warna Proyek</Label>
                    <div className="flex gap-3 flex-wrap">
                      {colorOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: option.value })}
                          className={`relative w-10 h-10 rounded-full ${option.value} border-2 transition-all ${
                            formData.color === option.value 
                              ? 'border-gray-900 scale-110 shadow-lg' 
                              : 'border-gray-300 hover:scale-105'
                          }`}
                          title={option.label}
                        >
                          {formData.color === option.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <CheckSquare className="h-5 w-5 text-white drop-shadow" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button 
                    onClick={handleCreateProject}
                    disabled={!formData.name || !formData.startDate || !formData.endDate}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Buat Proyek
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <h2 className="text-3xl font-bold mb-2">Selamat Datang Kembali, {currentUser.name}!</h2>
          <p className="text-blue-100 text-lg">Berikut adalah ringkasan aktivitas proyek Anda hari ini.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100/50 overflow-hidden group">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                <FolderKanban className="h-6 w-6 text-white" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-blue-600 opacity-60" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">Total Proyek</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-blue-900">{stats.totalProjects}</h3>
                <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </span>
              </div>
              <p className="text-xs text-blue-700 mt-2">{stats.activeProjects} proyek aktif</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100/50 overflow-hidden group">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-600 rounded-xl shadow-lg shadow-green-600/30 group-hover:scale-110 transition-transform">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-600 opacity-60" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">Tugas Selesai</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-green-900">{stats.completedTasks}</h3>
                <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8%
                </span>
              </div>
              <p className="text-xs text-green-700 mt-2">{stats.pendingTasks} tugas tertunda</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100/50 overflow-hidden group">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-600 rounded-xl shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-purple-600 opacity-60" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-800 mb-1">Jam Kerja</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-purple-900">{stats.hoursTracked}h</h3>
                <span className="text-sm text-purple-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15%
                </span>
              </div>
              <p className="text-xs text-purple-700 mt-2">Bulan ini</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100/50 overflow-hidden group">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-600 rounded-xl shadow-lg shadow-orange-600/30 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-orange-600 opacity-60" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-800 mb-1">Anggota Tim</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-orange-900">{stats.teamMembers}</h3>
                <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3
                </span>
              </div>
              <p className="text-xs text-orange-700 mt-2">Aktif bekerja</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Produktivitas Mingguan</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Jam kerja dan tugas selesai</p>
              </div>
              <Target className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} name="Jam Kerja" dot={{ fill: '#3b82f6', r: 4 }} />
                <Line type="monotone" dataKey="tasks" stroke="#10b981" strokeWidth={3} name="Tugas Selesai" dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Distribusi Tugas</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Total: {taskDistribution.reduce((sum, item) => sum + item.value, 0)} tugas</p>
              </div>
              <CheckSquare className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={taskDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Proyek Aktif</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Progress terkini</p>
              </div>
              <FolderKanban className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{project.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{project.deadline}</span>
                      </div>
                    </div>
                    <Badge variant={project.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                      {project.priority === 'high' ? 'Tinggi' : project.priority === 'medium' ? 'Sedang' : 'Rendah'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Deadline Terdekat
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Perhatian khusus diperlukan</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-100 hover:shadow-md transition-all">
                  <div className={`h-2 w-2 rounded-full mt-2 ${getPriorityColor(item.priority)}`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900">{item.task}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.project}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.deadline}
                      </span>
                      <span className="text-xs text-blue-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.hours}h tersisa
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}