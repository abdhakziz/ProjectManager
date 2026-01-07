import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  MessageSquare,
  Paperclip,
  Calendar,
  User,
  CheckSquare
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface TasksProps {
  currentUser: any;
  selectedProject?: any;
}

export default function Tasks({ currentUser, selectedProject }: TasksProps) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design homepage mockup',
      description: 'Buat mockup untuk homepage dengan design modern',
      project: 'Website Redesign',
      assignee: 'John Doe',
      priority: 'high',
      status: 'in-progress',
      deadline: '2026-01-08',
      comments: 3,
      attachments: 2,
      subtasks: [
        { id: 11, title: 'Research competitor websites', completed: true },
        { id: 12, title: 'Create wireframe', completed: true },
        { id: 13, title: 'Design mockup', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Implement user authentication',
      description: 'Setup JWT authentication untuk API',
      project: 'Mobile App Development',
      assignee: 'Alice Brown',
      priority: 'high',
      status: 'in-progress',
      deadline: '2026-01-10',
      comments: 5,
      attachments: 1,
      subtasks: [
        { id: 21, title: 'Setup JWT library', completed: true },
        { id: 22, title: 'Create login endpoint', completed: false },
        { id: 23, title: 'Add token validation', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Write content for landing page',
      description: 'Tulis copywriting untuk halaman landing',
      project: 'Marketing Campaign Q1',
      assignee: 'Eve Wilson',
      priority: 'medium',
      status: 'review',
      deadline: '2026-01-12',
      comments: 2,
      attachments: 0,
      subtasks: []
    },
    {
      id: 4,
      title: 'Setup cloud infrastructure',
      description: 'Konfigurasi server dan database di cloud',
      project: 'Database Migration',
      assignee: 'Grace Lee',
      priority: 'high',
      status: 'not-started',
      deadline: '2026-01-15',
      comments: 0,
      attachments: 0,
      subtasks: []
    },
    {
      id: 5,
      title: 'Create product catalog API',
      description: 'API untuk menampilkan katalog produk',
      project: 'Customer Portal',
      assignee: 'Henry Taylor',
      priority: 'low',
      status: 'completed',
      deadline: '2026-01-05',
      comments: 1,
      attachments: 3,
      subtasks: []
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    assignee: '',
    priority: 'medium',
    status: 'not-started',
    deadline: ''
  });

  const handleCreateTask = () => {
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...formData }
          : t
      ));
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        comments: 0,
        attachments: 0,
        subtasks: []
      };
      setTasks([...tasks, newTask]);
    }
    
    setIsDialogOpen(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', project: '', assignee: '', priority: 'medium', status: 'not-started', deadline: '' });
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      project: task.project,
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      deadline: task.deadline
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const toggleSubtask = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(st => 
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return task;
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'not-started': { label: 'Belum Mulai', className: 'bg-gray-100 text-gray-800' },
      'in-progress': { label: 'Dikerjakan', className: 'bg-blue-100 text-blue-800' },
      'review': { label: 'Review', className: 'bg-orange-100 text-orange-800' },
      'completed': { label: 'Selesai', className: 'bg-green-100 text-green-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['not-started'];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'low': { label: 'Rendah', className: 'bg-blue-100 text-blue-800' },
      'medium': { label: 'Sedang', className: 'bg-orange-100 text-orange-800' },
      'high': { label: 'Tinggi', className: 'bg-red-100 text-red-800' }
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filterTasksByStatus = (status: string) => {
    if (status === 'all') return tasks;
    return tasks.filter(t => t.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Manajemen Tugas</h2>
          <p className="text-gray-500 mt-1">Kelola dan track semua tugas Anda</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTask(null);
              setFormData({ title: '', description: '', project: '', assignee: '', priority: 'medium', status: 'not-started', deadline: '' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Tugas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTask ? 'Edit Tugas' : 'Buat Tugas Baru'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Tugas</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul tugas"
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi tugas"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project">Proyek</Label>
                  <Input
                    id="project"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="Nama proyek"
                  />
                </div>
                <div>
                  <Label htmlFor="assignee">Ditugaskan Ke</Label>
                  <Input
                    id="assignee"
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    placeholder="Nama anggota tim"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">Belum Mulai</SelectItem>
                      <SelectItem value="in-progress">Dikerjakan</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCreateTask}>
                  {editingTask ? 'Update' : 'Buat Tugas'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Semua ({tasks.length})</TabsTrigger>
          <TabsTrigger value="not-started">Belum Mulai ({filterTasksByStatus('not-started').length})</TabsTrigger>
          <TabsTrigger value="in-progress">Dikerjakan ({filterTasksByStatus('in-progress').length})</TabsTrigger>
          <TabsTrigger value="review">Review ({filterTasksByStatus('review').length})</TabsTrigger>
          <TabsTrigger value="completed">Selesai ({filterTasksByStatus('completed').length})</TabsTrigger>
        </TabsList>

        {['all', 'not-started', 'in-progress', 'review', 'completed'].map(status => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filterTasksByStatus(status).map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg h-fit">
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(task)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(task.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                        <Badge variant="outline">{task.project}</Badge>
                      </div>

                      {task.subtasks.length > 0 && (
                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                          <p className="text-sm font-medium text-gray-700">Sub-tugas:</p>
                          {task.subtasks.map((subtask) => (
                            <div key={subtask.id} className="flex items-center gap-2">
                              <Checkbox
                                checked={subtask.completed}
                                onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                              />
                              <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {subtask.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{task.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{task.comments}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <span>{task.attachments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filterTasksByStatus(status).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Tidak ada tugas dalam kategori ini
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}