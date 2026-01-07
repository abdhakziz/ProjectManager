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
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  BarChart3,
  Plus
} from 'lucide-react';
import Dashboard from './modules/Dashboard';
import Projects from './modules/Projects';
import Tasks from './modules/Tasks';
import CalendarView from './modules/CalendarView';
import Team from './modules/Team';
import TimeTracking from './modules/TimeTracking';
import Documents from './modules/Documents';
import Notifications from './modules/Notifications';
import Reports from './modules/Reports';
import { mockProjects } from '../App';

interface MainLayoutProps {
  currentUser: any;
  onLogout: () => void;
}

export default function MainLayout({ currentUser, onLogout }: MainLayoutProps) {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount] = useState(3);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    color: 'bg-blue-500'
  });

  // Project sub-menu items
  const projectModules = [
    { id: 'overview', name: 'Overview Proyek', icon: FolderKanban, color: 'text-purple-600 bg-purple-50' },
    { id: 'tasks', name: 'Tugas', icon: CheckSquare, color: 'text-green-600 bg-green-50' },
    { id: 'calendar', name: 'Kalender', icon: Calendar, color: 'text-orange-600 bg-orange-50' },
    { id: 'team', name: 'Tim', icon: Users, color: 'text-pink-600 bg-pink-50' },
    { id: 'reports', name: 'Laporan', icon: BarChart3, color: 'text-teal-600 bg-teal-50' },
    { id: 'timetracking', name: 'Time Tracking', icon: Clock, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'documents', name: 'Dokumen', icon: FileText, color: 'text-cyan-600 bg-cyan-50' },
  ];

  const handleProjectClick = (project: any) => {
    if (expandedProject === project.id) {
      // Collapse if already expanded
      setExpandedProject(null);
      setSelectedProject(null);
      setActiveView('dashboard');
    } else {
      // Expand and select project
      setExpandedProject(project.id);
      setSelectedProject(project);
      setActiveView('overview');
    }
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveView(moduleId);
  };

  const renderModule = () => {
    // If no project selected, show dashboard
    if (!selectedProject && activeView === 'dashboard') {
      return <Dashboard currentUser={currentUser} />;
    }

    // If project selected, show project-specific modules
    if (selectedProject) {
      switch (activeView) {
        case 'overview':
          return <Projects currentUser={currentUser} selectedProject={selectedProject} />;
        case 'tasks':
          return <Tasks currentUser={currentUser} selectedProject={selectedProject} />;
        case 'calendar':
          return <CalendarView currentUser={currentUser} selectedProject={selectedProject} />;
        case 'team':
          return <Team currentUser={currentUser} selectedProject={selectedProject} />;
        case 'reports':
          return <Reports currentUser={currentUser} selectedProject={selectedProject} />;
        case 'timetracking':
          return <TimeTracking currentUser={currentUser} selectedProject={selectedProject} />;
        case 'documents':
          return <Documents currentUser={currentUser} selectedProject={selectedProject} />;
        default:
          return <Projects currentUser={currentUser} selectedProject={selectedProject} />;
      }
    }

    // Fallback to dashboard
    return <Dashboard currentUser={currentUser} />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getActiveModuleName = () => {
    if (activeView === 'dashboard') return 'Dashboard';
    if (selectedProject) {
      const module = projectModules.find(m => m.id === activeView);
      return module ? `${selectedProject.name} - ${module.name}` : selectedProject.name;
    }
    return 'Dashboard';
  };

  // Get recent active projects (max 5)
  const recentProjects = mockProjects.filter(p => p.status === 'active').slice(0, 5);

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
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Dashboard */}
          <button
            onClick={() => {
              setActiveView('dashboard');
              setSelectedProject(null);
              setExpandedProject(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeView === 'dashboard' && !selectedProject
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className={`p-2 rounded-lg transition-all ${
              activeView === 'dashboard' && !selectedProject ? 'bg-white/20' : 'text-blue-600 bg-blue-50'
            }`}>
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="font-medium flex-1 text-left">Dashboard</span>
            {activeView === 'dashboard' && !selectedProject && (
              <ChevronRight className="h-4 w-4 opacity-60" />
            )}
          </button>

          {/* Recent Projects Section */}
          <div className="pt-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Projects</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-blue-50">
                <Plus className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {recentProjects.map((project) => (
                <div key={project.id}>
                  {/* Project Item */}
                  <button
                    onClick={() => handleProjectClick(project)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      expandedProject === project.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                    <span className="font-medium flex-1 text-left text-sm truncate">{project.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      expandedProject === project.id ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Project Sub-menu */}
                  {expandedProject === project.id && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                      {projectModules.map((module) => {
                        const Icon = module.icon;
                        const isActive = activeView === module.id && selectedProject?.id === project.id;
                        return (
                          <button
                            key={module.id}
                            onClick={() => handleModuleClick(module.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div className={`p-1.5 rounded-md ${
                              isActive ? 'bg-white/20' : module.color
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="flex-1 text-left">{module.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
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
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {getActiveModuleName()}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>

              {/* User Profile */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
                <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
                  <AvatarFallback className="text-white font-semibold">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                </div>
              </div>
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