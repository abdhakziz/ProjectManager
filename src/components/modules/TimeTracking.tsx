import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Clock, 
  Play, 
  Pause, 
  Square,
  Calendar,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TimeTrackingProps {
  currentUser: any;
  selectedProject?: any;
}

export default function TimeTracking({ currentUser, selectedProject }: TimeTrackingProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock time entries
  const timeEntries = [
    {
      id: 1,
      task: 'Design homepage mockup',
      project: 'Website Redesign',
      date: '2026-01-06',
      duration: 240, // minutes
      user: currentUser.name
    },
    {
      id: 2,
      task: 'Implement user authentication',
      project: 'Mobile App Development',
      date: '2026-01-06',
      duration: 180,
      user: currentUser.name
    },
    {
      id: 3,
      task: 'Write marketing content',
      project: 'Marketing Campaign Q1',
      date: '2026-01-05',
      duration: 120,
      user: currentUser.name
    },
    {
      id: 4,
      task: 'Database optimization',
      project: 'Database Migration',
      date: '2026-01-05',
      duration: 150,
      user: currentUser.name
    },
    {
      id: 5,
      task: 'Code review',
      project: 'Website Redesign',
      date: '2026-01-04',
      duration: 90,
      user: currentUser.name
    }
  ];

  // Calculate statistics
  const totalMinutes = timeEntries.reduce((sum, entry) => sum + entry.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const todayMinutes = timeEntries
    .filter(e => e.date === '2026-01-06')
    .reduce((sum, entry) => sum + entry.duration, 0);
  const todayHours = Math.floor(todayMinutes / 60);

  // Group by project
  const projectHours = timeEntries.reduce((acc: any, entry) => {
    if (!acc[entry.project]) {
      acc[entry.project] = 0;
    }
    acc[entry.project] += entry.duration;
    return acc;
  }, {});

  const projectData = Object.entries(projectHours).map(([name, minutes]: [string, any]) => ({
    name,
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60
  }));

  const pieData = Object.entries(projectHours).map(([name, minutes]: [string, any]) => ({
    name,
    value: minutes
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Daily hours for the week
  const dailyHours = [
    { day: 'Sen', hours: 6.5 },
    { day: 'Sel', hours: 7.2 },
    { day: 'Rab', hours: 8.0 },
    { day: 'Kam', hours: 5.5 },
    { day: 'Jum', hours: 7.0 },
    { day: 'Sab', hours: 0 },
    { day: 'Min', hours: 0 }
  ];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    // In real app, start interval timer here
  };

  const handlePauseTracking = () => {
    setIsTracking(false);
    // In real app, pause interval timer here
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    setCurrentTime(0);
    setCurrentTask('');
    // In real app, save time entry here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Time Tracking</h2>
          <p className="text-gray-500 mt-1">Catat dan kelola waktu pengerjaan tugas</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Laporan
        </Button>
      </div>

      {/* Time Tracker */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-blue-100 mb-2">Tugas saat ini:</p>
              {isTracking ? (
                <p className="text-xl font-semibold">{currentTask || 'Tanpa deskripsi'}</p>
              ) : (
                <input
                  type="text"
                  placeholder="Tulis apa yang sedang Anda kerjakan..."
                  className="bg-white/20 border-0 rounded-lg px-4 py-2 text-white placeholder-blue-200 w-full max-w-md"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                />
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {Math.floor(currentTime / 3600)}:{String(Math.floor((currentTime % 3600) / 60)).padStart(2, '0')}:{String(currentTime % 60).padStart(2, '0')}
                </div>
                <p className="text-blue-100 text-sm mt-1">Waktu berlalu</p>
              </div>
              <div className="flex gap-2">
                {!isTracking ? (
                  <Button
                    onClick={handleStartTracking}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    size="lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Mulai
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handlePauseTracking}
                      className="bg-white text-blue-600 hover:bg-blue-50"
                      size="lg"
                    >
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                    <Button
                      onClick={handleStopTracking}
                      variant="outline"
                      className="border-white text-white hover:bg-white/20"
                      size="lg"
                    >
                      <Square className="h-5 w-5 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{todayHours}h</p>
                <p className="text-xs text-gray-500">{todayMinutes % 60}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Minggu Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">34h</p>
                <p className="text-xs text-gray-500">30m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">142h</p>
                <p className="text-xs text-gray-500">15m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Proyek</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{Object.keys(projectHours).length}</p>
                <p className="text-xs text-gray-500">proyek aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jam Kerja Harian (Minggu Ini)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Waktu per Proyek</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${Math.floor(value / 60)}h`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatDuration(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Time Entries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Catatan Waktu Terbaru</CardTitle>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="week">Minggu Ini</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{entry.task}</h4>
                  <p className="text-sm text-gray-600">{entry.project}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{entry.date}</p>
                  </div>
                  <Badge variant="secondary" className="text-base">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDuration(entry.duration)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan per Proyek</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projectData.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <h4 className="font-medium">{project.name}</h4>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{project.hours}h {project.minutes}m</p>
                  <p className="text-sm text-gray-600">Total waktu</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}