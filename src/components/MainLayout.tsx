import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Calendar, 
  Users, 
  Clock, 
  FileText, 
  Bell, 
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import Dashboard from './modules/Dashboard';
import Projects from './modules/Projects';
import Tasks from './modules/Tasks';
import CalendarView from './modules/CalendarView';
import Team from './modules/Team';
import TimeTracking from './modules/TimeTracking';
import Documents from './modules/Documents';
import Notifications from './modules/Notifications';

interface MainLayoutProps {
  currentUser: any;
  onLogout: () => void;
}

export default function MainLayout({ currentUser, onLogout }: MainLayoutProps) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount] = useState(3);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-600 bg-blue-50' },
    { id: 'projects', name: 'Proyek', icon: FolderKanban, color: 'text-purple-600 bg-purple-50' },
    { id: 'tasks', name: 'Tugas', icon: CheckSquare, color: 'text-green-600 bg-green-50' },
    { id: 'calendar', name: 'Kalender', icon: Calendar, color: 'text-orange-600 bg-orange-50' },
    { id: 'team', name: 'Tim', icon: Users, color: 'text-pink-600 bg-pink-50' },
    { id: 'timetracking', name: 'Time Tracking', icon: Clock, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'documents', name: 'Dokumen', icon: FileText, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'notifications', name: 'Notifikasi', icon: Bell, color: 'text-red-600 bg-red-50' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'projects':
        return <Projects currentUser={currentUser} />;
      case 'tasks':
        return <Tasks currentUser={currentUser} />;
      case 'calendar':
        return <CalendarView currentUser={currentUser} />;
      case 'team':
        return <Team currentUser={currentUser} />;
      case 'timetracking':
        return <TimeTracking currentUser={currentUser} />;
      case 'documents':
        return <Documents currentUser={currentUser} />;
      case 'notifications':
        return <Notifications currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-700',
      manager: 'bg-blue-100 text-blue-700',
      member: 'bg-green-100 text-green-700'
    };
    return colors[role as keyof typeof colors] || colors.member;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col shadow-sm`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Project Manager
              </h1>
              <p className="text-xs text-gray-500">Professional Edition</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all ${
                  isActive ? 'bg-white/20' : module.color
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium flex-1 text-left">{module.name}</span>
                {isActive && (
                  <ChevronRight className="h-4 w-4 opacity-60" />
                )}
                {module.id === 'notifications' && notificationCount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-xl shadow-sm">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
              <AvatarFallback className="text-white font-semibold">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${getRoleBadge(currentUser.role)}`}>
                {currentUser.role}
              </span>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {modules.find(m => m.id === activeModule)?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveModule('notifications')}
                className="relative hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
              <Avatar className="h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-500 cursor-pointer shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                <AvatarFallback className="text-white font-semibold text-sm">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Module Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}
