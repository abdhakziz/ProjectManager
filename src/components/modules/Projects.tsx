import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  FolderKanban,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  Lock
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { hasPermission } from '../utils/permissions';

interface ProjectsProps {
  currentUser: any;
}

export default function Projects({ currentUser }: ProjectsProps) {
  // Permission checks
  const canCreateProject = hasPermission(currentUser.role, 'create_project');
  const canEditAllProjects = hasPermission(currentUser.role, 'edit_all_projects');
  const canDeleteProject = hasPermission(currentUser.role, 'delete_project');
  const canViewAllProjects = hasPermission(currentUser.role, 'view_all_projects');
  const canArchiveProject = hasPermission(currentUser.role, 'archive_project');

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesign website perusahaan dengan UI/UX modern dan responsif',
      status: 'ongoing',
      priority: 'high',
      deadline: '2026-01-15',
      progress: 75,
      team: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      createdAt: '2025-12-01',
      tasksCompleted: 15,
      totalTasks: 20
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Pengembangan aplikasi mobile untuk iOS dan Android dengan fitur lengkap',
      status: 'ongoing',
      priority: 'high',
      deadline: '2026-02-20',
      progress: 45,
      team: ['Alice Brown', 'Charlie Davis'],
      createdAt: '2025-11-15',
      tasksCompleted: 9,
      totalTasks: 20
    },
    {
      id: 3,
      name: 'Marketing Campaign Q1',
      description: 'Kampanye marketing digital untuk kuartal pertama 2026',
      status: 'ongoing',
      priority: 'medium',
      deadline: '2026-01-10',
      progress: 90,
      team: ['Eve Wilson', 'Frank Miller'],
      createdAt: '2025-12-10',
      tasksCompleted: 18,
      totalTasks: 20
    },
    {
      id: 4,
      name: 'Database Migration',
      description: 'Migrasi database ke infrastruktur cloud modern',
      status: 'new',
      priority: 'high',
      deadline: '2026-01-25',
      progress: 30,
      team: ['Grace Lee'],
      createdAt: '2026-01-02',
      tasksCompleted: 6,
      totalTasks: 20
    },
    {
      id: 5,
      name: 'Customer Portal',
      description: 'Portal untuk customer self-service dan support',
      status: 'paused',
      priority: 'low',
      deadline: '2026-03-30',
      progress: 20,
      team: ['Henry Taylor'],
      createdAt: '2025-10-20',
      tasksCompleted: 4,
      totalTasks: 20
    },
    {
      id: 6,
      name: 'Internal Tools Development',
      description: 'Pengembangan tools internal untuk meningkatkan produktivitas tim',
      status: 'completed',
      priority: 'medium',
      deadline: '2025-12-31',
      progress: 100,
      team: ['John Doe', 'Alice Brown', 'Bob Johnson'],
      createdAt: '2025-11-01',
      tasksCompleted: 20,
      totalTasks: 20
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'new',
    priority: 'medium',
    deadline: ''
  });

  const handleCreateProject = () => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newProject = {
        id: Date.now(),
        ...formData,
        progress: 0,
        team: [currentUser.name],
        createdAt: new Date().toISOString().split('T')[0],
        tasksCompleted: 0,
        totalTasks: 0
      };
      setProjects([newProject, ...projects]);
    }
    
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({ name: '', description: '', status: 'new', priority: 'medium', deadline: '' });
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      deadline: project.deadline
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Baru', class: 'bg-blue-100 text-blue-700 border-blue-200' },
      ongoing: { label: 'Berjalan', class: 'bg-green-100 text-green-700 border-green-200' },
      completed: { label: 'Selesai', class: 'bg-purple-100 text-purple-700 border-purple-200' },
      paused: { label: 'Ditunda', class: 'bg-orange-100 text-orange-700 border-orange-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge className={`${config.class} border`}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: 'Tinggi', class: 'bg-red-100 text-red-700 border-red-200' },
      medium: { label: 'Sedang', class: 'bg-orange-100 text-orange-700 border-orange-200' },
      low: { label: 'Rendah', class: 'bg-blue-100 text-blue-700 border-blue-200' }
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge className={`${config.class} border`}>{config.label}</Badge>;
  };

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'ongoing').length,
    completed: projects.filter(p => p.status === 'completed').length,
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FolderKanban className="h-7 w-7 text-blue-600" />
            Manajemen Proyek
          </h2>
          <p className="text-gray-600 mt-1">
            {canViewAllProjects 
              ? 'Kelola semua proyek Anda di satu tempat' 
              : 'Proyek yang ditugaskan kepada Anda'}
          </p>
        </div>
        {canCreateProject && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setEditingProject(null);
                  setFormData({ name: '', description: '', status: 'new', priority: 'medium', deadline: '' });
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Proyek Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  {editingProject ? 'Edit Proyek' : 'Buat Proyek Baru'}
                </DialogTitle>
                <DialogDescription>
                  {editingProject ? 'Edit detail proyek Anda' : 'Buat proyek baru'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Proyek</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama proyek"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Deskripsi proyek"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Baru</SelectItem>
                        <SelectItem value="ongoing">Berjalan</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                        <SelectItem value="paused">Ditunda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioritas</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Rendah</SelectItem>
                        <SelectItem value="medium">Sedang</SelectItem>
                        <SelectItem value="high">Tinggi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleCreateProject} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    {editingProject ? 'Update' : 'Buat Proyek'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <FolderKanban className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Total Proyek</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-600 rounded-xl">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700">Aktif</p>
                <p className="text-2xl font-bold text-green-900">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600 rounded-xl">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-700">Selesai</p>
                <p className="text-2xl font-bold text-purple-900">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-600 rounded-xl">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-700">Avg Progress</p>
                <p className="text-2xl font-bold text-orange-900">{stats.avgProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2.5 rounded-xl">
                    <FolderKanban className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base mb-2 line-clamp-1">{project.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(project.status)}
                      {getPriorityBadge(project.priority)}
                    </div>
                  </div>
                </div>
                {(canEditAllProjects || canDeleteProject) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canEditAllProjects && (
                        <DropdownMenuItem onClick={() => handleEdit(project)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {canDeleteProject && (
                        <DropdownMenuItem 
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{project.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2.5" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{project.tasksCompleted}/{project.totalTasks} tugas</span>
                  <span>{project.totalTasks - project.tasksCompleted} tersisa</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{project.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, idx) => (
                      <div
                        key={idx}
                        className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                        title={member}
                      >
                        {member.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold border-2 border-white">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}