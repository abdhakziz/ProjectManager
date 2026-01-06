import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail,
  Phone,
  CheckSquare,
  FolderKanban,
  Users as UsersIcon
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface TeamProps {
  currentUser: any;
}

export default function Team({ currentUser }: TeamProps) {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+62 812-3456-7890',
      role: 'admin',
      department: 'Engineering',
      projects: 3,
      tasks: 12,
      status: 'active',
      joinDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+62 813-4567-8901',
      role: 'manager',
      department: 'Engineering',
      projects: 2,
      tasks: 8,
      status: 'active',
      joinDate: '2025-02-20'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+62 814-5678-9012',
      role: 'member',
      department: 'Engineering',
      projects: 2,
      tasks: 15,
      status: 'active',
      joinDate: '2025-03-10'
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      phone: '+62 815-6789-0123',
      role: 'member',
      department: 'Engineering',
      projects: 1,
      tasks: 10,
      status: 'active',
      joinDate: '2025-04-05'
    },
    {
      id: 5,
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      phone: '+62 816-7890-1234',
      role: 'member',
      department: 'Engineering',
      projects: 1,
      tasks: 7,
      status: 'active',
      joinDate: '2025-05-12'
    },
    {
      id: 6,
      name: 'Eve Wilson',
      email: 'eve.wilson@example.com',
      phone: '+62 817-8901-2345',
      role: 'manager',
      department: 'Marketing',
      projects: 2,
      tasks: 9,
      status: 'active',
      joinDate: '2025-02-28'
    },
    {
      id: 7,
      name: 'Frank Miller',
      email: 'frank.miller@example.com',
      phone: '+62 818-9012-3456',
      role: 'member',
      department: 'Marketing',
      projects: 2,
      tasks: 6,
      status: 'active',
      joinDate: '2025-06-08'
    },
    {
      id: 8,
      name: 'Grace Lee',
      email: 'grace.lee@example.com',
      phone: '+62 819-0123-4567',
      role: 'member',
      department: 'Operations',
      projects: 1,
      tasks: 5,
      status: 'active',
      joinDate: '2025-07-20'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'member',
    department: 'Engineering'
  });

  const handleInviteMember = () => {
    if (editingMember) {
      setMembers(members.map(m => 
        m.id === editingMember.id 
          ? { ...m, ...formData }
          : m
      ));
    } else {
      const newMember = {
        id: Date.now(),
        ...formData,
        projects: 0,
        tasks: 0,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setMembers([...members, newMember]);
    }
    
    setIsDialogOpen(false);
    setEditingMember(null);
    setFormData({ name: '', email: '', phone: '', role: 'member', department: 'Engineering' });
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      department: member.department
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: 'Admin', className: 'bg-purple-100 text-purple-800' },
      manager: { label: 'Manager', className: 'bg-blue-100 text-blue-800' },
      member: { label: 'Anggota', className: 'bg-green-100 text-green-800' }
    };
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.member;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const filterByDepartment = (dept: string) => {
    if (dept === 'all') return members;
    return members.filter(m => m.department === dept);
  };

  const departments = ['Engineering', 'Marketing', 'Operations'];
  const stats = {
    total: members.length,
    admins: members.filter(m => m.role === 'admin').length,
    managers: members.filter(m => m.role === 'manager').length,
    members: members.filter(m => m.role === 'member').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Manajemen Tim</h2>
          <p className="text-gray-500 mt-1">Kelola anggota tim dan role mereka</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingMember(null);
              setFormData({ name: '', email: '', phone: '', role: 'member', department: 'Engineering' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Undang Anggota
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit Anggota' : 'Undang Anggota Baru'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+62 812-3456-7890"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="member">Anggota</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Departemen</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleInviteMember}>
                  {editingMember ? 'Update' : 'Undang'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Anggota</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <UsersIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admin</p>
                <p className="text-2xl font-bold">{stats.admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Manager</p>
                <p className="text-2xl font-bold">{stats.managers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <UsersIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Anggota</p>
                <p className="text-2xl font-bold">{stats.members}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Semua ({members.length})</TabsTrigger>
          {departments.map(dept => (
            <TabsTrigger key={dept} value={dept}>
              {dept} ({filterByDepartment(dept).length})
            </TabsTrigger>
          ))}
        </TabsList>

        {['all', ...departments].map(dept => (
          <TabsContent key={dept} value={dept}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterByDepartment(dept).map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500">
                          <AvatarFallback className="text-white font-semibold">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.department}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(member)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(member.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2 mb-4">
                      {getRoleBadge(member.role)}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{member.phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <FolderKanban className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">{member.projects} proyek</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">{member.tasks} tugas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
