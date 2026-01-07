import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail,
  Phone,
  Users as UsersIcon,
  Shield,
  Crown,
  User as UserIcon,
  AlertCircle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  hasProjectPermission, 
  getUserRoleInProject, 
  getRoleBadgeClass, 
  getRoleDisplayName,
  getAssignableRoles,
  isProjectManager,
  isProjectAdmin
} from '../utils/projectPermissions';

interface TeamProps {
  currentUser: any;
  selectedProject?: any;
}

export default function Team({ currentUser, selectedProject }: TeamProps) {
  const [members, setMembers] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  
  const [newMemberData, setNewMemberData] = useState({
    email: '',
    role: 'member' as 'admin' | 'member'
  });

  // Available users to add (mock data - would come from API)
  const availableUsers = [
    { userId: 'user4', name: 'Sarah Wilson', email: 'sarah@example.com' },
    { userId: 'user5', name: 'Tom Brown', email: 'tom@example.com' },
    { userId: 'user6', name: 'Emily Davis', email: 'emily@example.com' },
    { userId: 'user7', name: 'David Lee', email: 'david@example.com' },
  ];

  // Load members from selected project
  useEffect(() => {
    if (selectedProject && selectedProject.team) {
      setMembers(selectedProject.team);
    }
  }, [selectedProject]);

  // Check permissions
  const userRole = getUserRoleInProject(selectedProject, currentUser.userId);
  const canAddMember = hasProjectPermission(selectedProject, currentUser.userId, 'addTeamMember');
  const canRemoveMember = hasProjectPermission(selectedProject, currentUser.userId, 'removeTeamMember');
  const canChangeRole = hasProjectPermission(selectedProject, currentUser.userId, 'changeUserRole');

  const handleAddMember = () => {
    // Find user from available users
    const userToAdd = availableUsers.find(u => u.email === newMemberData.email);
    
    if (!userToAdd) {
      alert('User tidak ditemukan!');
      return;
    }

    // Check if user already in project
    if (members.find(m => m.userId === userToAdd.userId)) {
      alert('User sudah ada di project ini!');
      return;
    }

    const newMember = {
      userId: userToAdd.userId,
      name: userToAdd.name,
      email: userToAdd.email,
      role: newMemberData.role,
    };

    setMembers([...members, newMember]);
    setIsAddDialogOpen(false);
    setNewMemberData({ email: '', role: 'member' });
  };

  const handleRemoveMember = (userId: string) => {
    // Cannot remove manager
    const member = members.find(m => m.userId === userId);
    if (member?.role === 'manager') {
      alert('Manager tidak dapat dihapus dari project!');
      return;
    }

    if (confirm('Apakah Anda yakin ingin menghapus member ini?')) {
      setMembers(members.filter(m => m.userId !== userId));
    }
  };

  const handleChangeRole = (member: any) => {
    setEditingMember(member);
    setIsEditRoleDialogOpen(true);
  };

  const handleUpdateRole = (newRole: 'admin' | 'member') => {
    setMembers(members.map(m => 
      m.userId === editingMember.userId 
        ? { ...m, role: newRole }
        : m
    ));
    setIsEditRoleDialogOpen(false);
    setEditingMember(null);
  };

  const getRoleIcon = (role: string) => {
    if (role === 'manager') return <Crown className="h-4 w-4" />;
    if (role === 'admin') return <Shield className="h-4 w-4" />;
    return <UserIcon className="h-4 w-4" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!selectedProject) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pilih Project Terlebih Dahulu</h3>
        <p className="text-gray-600">Silakan pilih project dari sidebar untuk melihat team members</p>
      </div>
    );
  }

  const assignableRoles = getAssignableRoles(selectedProject, currentUser.userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UsersIcon className="h-7 w-7 text-blue-600" />
            Tim {selectedProject.name}
          </h2>
          <p className="text-gray-600 mt-1">Kelola anggota tim project Anda</p>
        </div>
        {canAddMember && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                  Tambah Member ke Project
                </DialogTitle>
                <DialogDescription>
                  Tambahkan anggota baru ke project ini
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email User</Label>
                  <Select 
                    value={newMemberData.email} 
                    onValueChange={(value) => setNewMemberData({ ...newMemberData, email: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih user" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers
                        .filter(u => !members.find(m => m.userId === u.userId))
                        .map((user) => (
                          <SelectItem key={user.userId} value={user.email}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={newMemberData.role} 
                    onValueChange={(value: 'admin' | 'member') => setNewMemberData({ ...newMemberData, role: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assignableRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {getRoleDisplayName(role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    {userRole === 'manager' && 'Sebagai Manager, Anda dapat menambahkan Admin atau Member'}
                    {userRole === 'admin' && 'Sebagai Admin, Anda hanya dapat menambahkan Member'}
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleAddMember} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Tambah Member
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* User Role Info */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-xl">
              {getRoleIcon(userRole || 'member')}
            </div>
            <div>
              <p className="text-sm text-gray-600">Role Anda di Project Ini</p>
              <p className="text-xl font-bold text-gray-900">{getRoleDisplayName(userRole || 'member')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600 rounded-xl">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-700">Manager</p>
                <p className="text-2xl font-bold text-purple-900">
                  {members.filter(m => m.role === 'manager').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Admin</p>
                <p className="text-2xl font-bold text-blue-900">
                  {members.filter(m => m.role === 'admin').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-600 rounded-xl">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Member</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.filter(m => m.role === 'member').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.userId} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 flex-1">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                    <AvatarFallback className="text-white font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base mb-1 truncate">{member.name}</CardTitle>
                    <Badge className={`${getRoleBadgeClass(member.role)} border text-xs`}>
                      <span className="mr-1">{getRoleIcon(member.role)}</span>
                      {getRoleDisplayName(member.role)}
                    </Badge>
                  </div>
                </div>
                {(canRemoveMember || canChangeRole) && member.role !== 'manager' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canChangeRole && isProjectManager(selectedProject, currentUser.userId) && (
                        <DropdownMenuItem onClick={() => handleChangeRole(member)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Ubah Role
                        </DropdownMenuItem>
                      )}
                      {canRemoveMember && (
                        <DropdownMenuItem 
                          onClick={() => handleRemoveMember(member.userId)}
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
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="truncate">{member.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Ubah Role Member
            </DialogTitle>
            <DialogDescription>
              Ubah role {editingMember?.name} di project ini
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Member</p>
                <p className="font-semibold">{editingMember.name}</p>
                <p className="text-sm text-gray-600">{editingMember.email}</p>
              </div>
              <div>
                <Label>Role Baru</Label>
                <div className="space-y-2 mt-2">
                  {assignableRoles.map((role) => (
                    <Button
                      key={role}
                      variant="outline"
                      className={`w-full justify-start ${editingMember.role === role ? 'border-blue-600 bg-blue-50' : ''}`}
                      onClick={() => handleUpdateRole(role as 'admin' | 'member')}
                    >
                      <span className="mr-2">{getRoleIcon(role)}</span>
                      {getRoleDisplayName(role)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
                  Batal
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
