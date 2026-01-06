import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell, 
  CheckCheck, 
  Trash2,
  Settings,
  MessageSquare,
  UserPlus,
  FolderKanban,
  CheckSquare,
  AlertCircle,
  Calendar
} from 'lucide-react';

interface NotificationsProps {
  currentUser: any;
}

export default function Notifications({ currentUser }: NotificationsProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task',
      title: 'Tugas baru ditugaskan',
      message: 'John Doe menugaskan Anda untuk "Design homepage mockup"',
      project: 'Website Redesign',
      time: '5 menit lalu',
      read: false,
      icon: CheckSquare,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'comment',
      title: 'Komentar baru',
      message: 'Alice Brown mengomentari tugas "Implement user authentication"',
      project: 'Mobile App Development',
      time: '15 menit lalu',
      read: false,
      icon: MessageSquare,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Deadline mendekat',
      message: 'Tugas "Complete API integration" jatuh tempo dalam 1 hari',
      project: 'Mobile App Development',
      time: '1 jam lalu',
      read: false,
      icon: AlertCircle,
      color: 'text-red-600 bg-red-100'
    },
    {
      id: 4,
      type: 'team',
      title: 'Anggota tim baru',
      message: 'Eve Wilson telah bergabung dengan proyek "Marketing Campaign Q1"',
      project: 'Marketing Campaign Q1',
      time: '2 jam lalu',
      read: true,
      icon: UserPlus,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 5,
      type: 'project',
      title: 'Status proyek diupdate',
      message: 'Database Migration telah dipindahkan ke status "Berjalan"',
      project: 'Database Migration',
      time: '3 jam lalu',
      read: true,
      icon: FolderKanban,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      id: 6,
      type: 'meeting',
      title: 'Meeting reminder',
      message: 'Sprint planning meeting dimulai dalam 30 menit',
      project: 'General',
      time: '4 jam lalu',
      read: true,
      icon: Calendar,
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      id: 7,
      type: 'task',
      title: 'Tugas selesai',
      message: 'Bob Johnson menyelesaikan tugas "Setup development environment"',
      project: 'Website Redesign',
      time: '5 jam lalu',
      read: true,
      icon: CheckSquare,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 8,
      type: 'comment',
      title: 'Mention dalam komentar',
      message: 'Charlie Davis menyebut Anda dalam diskusi proyek',
      project: 'Mobile App Development',
      time: '1 hari lalu',
      read: true,
      icon: MessageSquare,
      color: 'text-green-600 bg-green-100'
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskAssignment: true,
    comments: true,
    deadlines: true,
    projectUpdates: true,
    teamChanges: false
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua notifikasi?')) {
      setNotifications([]);
    }
  };

  const filterByType = (type: string) => {
    if (type === 'all') return notifications;
    return notifications.filter(n => n.type === type);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Notifikasi
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} baru
              </Badge>
            )}
          </h2>
          <p className="text-gray-500 mt-1">Kelola notifikasi dan pengingat Anda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
          <Button variant="outline" onClick={clearAll} disabled={notifications.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus Semua
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            Semua ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="task">
            Tugas ({filterByType('task').length})
          </TabsTrigger>
          <TabsTrigger value="comment">
            Komentar ({filterByType('comment').length})
          </TabsTrigger>
          <TabsTrigger value="deadline">
            Deadline ({filterByType('deadline').length})
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        {/* All Notifications */}
        {['all', 'task', 'comment', 'deadline', 'project', 'team', 'meeting'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue}>
            <div className="space-y-3">
              {filterByType(tabValue).length > 0 ? (
                filterByType(tabValue).map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <Card
                      key={notification.id}
                      className={`${!notification.read ? 'border-blue-200 bg-blue-50/50' : ''} hover:shadow-md transition-shadow`}
                    >
                      <CardContent className="pt-4">
                        <div className="flex gap-4">
                          <div className={`p-2 rounded-lg h-fit ${notification.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="font-semibold">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <Badge variant="outline">{notification.project}</Badge>
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <CheckCheck className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p>Tidak ada notifikasi</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Metode Notifikasi</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Terima notifikasi push di browser</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, pushNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Jenis Notifikasi</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="task-assignment">Penugasan Tugas</Label>
                      <p className="text-sm text-gray-500">Notifikasi saat Anda ditugaskan</p>
                    </div>
                    <Switch
                      id="task-assignment"
                      checked={settings.taskAssignment}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, taskAssignment: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="comments">Komentar & Mention</Label>
                      <p className="text-sm text-gray-500">Notifikasi untuk komentar dan mention</p>
                    </div>
                    <Switch
                      id="comments"
                      checked={settings.comments}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, comments: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="deadlines">Deadline & Reminder</Label>
                      <p className="text-sm text-gray-500">Pengingat deadline tugas</p>
                    </div>
                    <Switch
                      id="deadlines"
                      checked={settings.deadlines}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, deadlines: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="project-updates">Update Proyek</Label>
                      <p className="text-sm text-gray-500">Notifikasi perubahan status proyek</p>
                    </div>
                    <Switch
                      id="project-updates"
                      checked={settings.projectUpdates}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, projectUpdates: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="team-changes">Perubahan Tim</Label>
                      <p className="text-sm text-gray-500">Notifikasi anggota tim baru atau keluar</p>
                    </div>
                    <Switch
                      id="team-changes"
                      checked={settings.teamChanges}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, teamChanges: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button>Simpan Pengaturan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
