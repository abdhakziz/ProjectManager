import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2,
  FolderKanban,
  TrendingUp,
  Target,
  Clock,
  Users,
  Calendar,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Crown,
  Shield,
  User as UserIcon
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { hasProjectPermission, getUserRoleInProject, getRoleBadgeClass, getRoleDisplayName } from '../utils/projectPermissions';
import { Crown, Shield, User as UserIcon } from 'lucide-react';

interface ProjectsProps {
  currentUser: any;
  selectedProject?: any;
  onProjectUpdated?: (project: any) => void;
  onProjectDeleted?: (projectId: string) => void;
}

const getRoleIcon = (role: string) => {
  if (role === 'manager') return <Crown className="h-4 w-4" />;
  if (role === 'admin') return <Shield className="h-4 w-4" />;
  return <UserIcon className="h-4 w-4" />;
};

export default function Projects({ currentUser, selectedProject, onProjectUpdated, onProjectDeleted }: ProjectsProps) {
  // Permission checks - now using project-level permissions
  const canEditProject = hasProjectPermission(selectedProject, currentUser.userId, 'editProject');
  const canDeleteProject = hasProjectPermission(selectedProject, currentUser.userId, 'deleteProject');
  const userRole = getUserRoleInProject(selectedProject, currentUser.userId);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    objective: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const handleEditProject = () => {
    if (!selectedProject) return;

    const updatedProject = {
      ...selectedProject,
      name: editFormData.name,
      description: editFormData.description,
      objective: editFormData.objective,
      status: editFormData.status,
      startDate: editFormData.startDate,
      endDate: editFormData.endDate,
    };

    console.log('Updated project:', updatedProject);
    if (onProjectUpdated) {
      onProjectUpdated(updatedProject);
    }
    setIsEditDialogOpen(false);
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    
    console.log('Deleting project:', selectedProject.id);
    if (onProjectDeleted) {
      onProjectDeleted(selectedProject.id);
    }
    setIsDeleteDialogOpen(false);
    alert(`Project "${selectedProject.name}" berhasil dihapus!`);
  };

  const openEditDialog = () => {
    if (!selectedProject) return;
    
    setEditFormData({
      name: selectedProject.name,
      description: selectedProject.description,
      objective: selectedProject.objective,
      status: selectedProject.status,
      startDate: selectedProject.startDate,
      endDate: selectedProject.endDate,
    });
    setIsEditDialogOpen(true);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', class: 'bg-green-100 text-green-700 border-green-200' },
      planning: { label: 'Perencanaan', class: 'bg-blue-100 text-blue-700 border-blue-200' },
      completed: { label: 'Selesai', class: 'bg-gray-100 text-gray-700 border-gray-200' },
      on_hold: { label: 'Ditunda', class: 'bg-orange-100 text-orange-700 border-orange-200' },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  if (!selectedProject) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pilih Project Terlebih Dahulu</h3>
        <p className="text-gray-600">Silakan pilih project dari sidebar untuk melihat detail</p>
      </div>
    );
  }

  const statusBadge = getStatusBadge(selectedProject.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className={`${selectedProject.color} h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg`}>
              <FolderKanban className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h2>
              <p className="text-gray-600 mb-3">{selectedProject.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${statusBadge.class} border`}>
                  {statusBadge.label}
                </Badge>
                <Badge className={`${getRoleBadgeClass(userRole || 'member')} border`}>
                  <span className="mr-1">{getRoleIcon(userRole || 'member')}</span>
                  Role: {getRoleDisplayName(userRole || 'member')}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canEditProject && (
                <DropdownMenuItem onClick={openEditDialog}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Proyek
                </DropdownMenuItem>
              )}
              {canDeleteProject && (
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus Proyek
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Progress</p>
                <p className="text-2xl font-bold text-blue-900">{selectedProject.progress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-600 rounded-xl">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700">Tugas Selesai</p>
                <p className="text-2xl font-bold text-green-900">{selectedProject.completedTasks}/{selectedProject.tasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600 rounded-xl">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-700">Anggota Tim</p>
                <p className="text-2xl font-bold text-purple-900">{selectedProject.team?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-600 rounded-xl">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-700">Deadline</p>
                <p className="text-sm font-bold text-orange-900">{selectedProject.endDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Progress Proyek</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Penyelesaian keseluruhan</span>
              <span className="text-sm font-semibold text-gray-900">{selectedProject.progress}%</span>
            </div>
            <Progress value={selectedProject.progress} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Mulai: {selectedProject.startDate}</span>
              <span>Target: {selectedProject.endDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Anggota Tim</CardTitle>
            <Badge variant="outline">{selectedProject.team?.length || 0} anggota</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedProject.team?.map((member: any) => (
              <div key={member.userId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500">
                  <AvatarFallback className="text-white font-semibold text-sm">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{member.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getRoleBadgeClass(member.role)} text-xs border`}>
                      <span className="mr-1">{getRoleIcon(member.role)}</span>
                      {getRoleDisplayName(member.role)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Edit Proyek
            </DialogTitle>
            <DialogDescription>
              Ubah informasi proyek
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Proyek</Label>
              <Input
                id="edit-name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                rows={3}
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-objective">Tujuan</Label>
              <Textarea
                id="edit-objective"
                rows={3}
                value={editFormData.objective}
                onChange={(e) => setEditFormData({ ...editFormData, objective: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="active">Aktif</option>
                <option value="planning">Perencanaan</option>
                <option value="completed">Selesai</option>
                <option value="on_hold">Ditunda</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Tanggal Mulai</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={editFormData.startDate}
                  onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endDate">Tanggal Selesai</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={editFormData.endDate}
                  onChange={(e) => setEditFormData({ ...editFormData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEditProject} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              Hapus Proyek
            </DialogTitle>
            <DialogDescription className="pt-2">
              Tindakan ini tidak dapat dibatalkan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-semibold text-red-900">Peringatan!</p>
                  <p className="text-sm text-red-800">
                    Anda akan menghapus proyek <strong>"{selectedProject?.name}"</strong>. 
                    Semua data termasuk tugas, dokumen, dan riwayat akan hilang permanen.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-900">Informasi Proyek:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• {selectedProject?.team?.length || 0} anggota tim</li>
                <li>• {selectedProject?.tasks || 0} total tugas</li>
                <li>• Progress: {selectedProject?.progress}%</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              onClick={handleDeleteProject} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Ya, Hapus Proyek
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}