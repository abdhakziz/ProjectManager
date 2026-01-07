import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter, Calendar, TrendingUp, Users, Clock, CheckSquare, FileText } from 'lucide-react';
import { hasPermission } from '../utils/permissions';

interface ReportsProps {
  currentUser: any;
  selectedProject?: any;
}

export default function Reports({ currentUser, selectedProject }: ReportsProps) {
  const [reportType, setReportType] = useState<'overview' | 'projects' | 'team' | 'time'>('overview');
  const [dateRange, setDateRange] = useState('30days');

  const canViewAllReports = hasPermission(currentUser.role, 'view_all_reports');
  const canViewTeamReports = hasPermission(currentUser.role, 'view_team_reports');
  const canExport = hasPermission(currentUser.role, 'export_reports');
  const canCreateCustom = hasPermission(currentUser.role, 'create_custom_reports');

  // Mock data untuk berbagai grafik
  const projectStatusData = [
    { name: 'Selesai', value: 45, color: '#10b981' },
    { name: 'Sedang Berjalan', value: 35, color: '#3b82f6' },
    { name: 'Ditunda', value: 12, color: '#f59e0b' },
    { name: 'Baru', value: 8, color: '#8b5cf6' },
  ];

  const productivityData = [
    { name: 'Sen', tasks: 12, hours: 8 },
    { name: 'Sel', tasks: 15, hours: 9 },
    { name: 'Rab', tasks: 10, hours: 7 },
    { name: 'Kam', tasks: 18, hours: 10 },
    { name: 'Jum', tasks: 14, hours: 8 },
    { name: 'Sab', tasks: 8, hours: 5 },
    { name: 'Min', tasks: 5, hours: 3 },
  ];

  const teamPerformanceData = canViewAllReports ? [
    { name: 'Sarah Johnson', completed: 45, pending: 8, efficiency: 85 },
    { name: 'Michael Chen', completed: 38, pending: 12, efficiency: 76 },
    { name: 'Emily Davis', completed: 42, pending: 6, efficiency: 88 },
    { name: 'David Wilson', completed: 35, pending: 15, efficiency: 70 },
    { name: 'Lisa Anderson', completed: 40, pending: 10, efficiency: 80 },
  ] : canViewTeamReports ? [
    { name: 'Team Member 1', completed: 42, pending: 6, efficiency: 88 },
    { name: 'Team Member 2', completed: 40, pending: 10, efficiency: 80 },
    { name: 'Team Member 3', completed: 35, pending: 15, efficiency: 70 },
  ] : [
    { name: currentUser.name, completed: 28, pending: 5, efficiency: 85 },
  ];

  const timeDistributionData = [
    { name: 'Development', value: 40, color: '#3b82f6' },
    { name: 'Meetings', value: 20, color: '#8b5cf6' },
    { name: 'Planning', value: 15, color: '#10b981' },
    { name: 'Review', value: 15, color: '#f59e0b' },
    { name: 'Admin', value: 10, color: '#ef4444' },
  ];

  const summaryCards = [
    {
      title: 'Total Proyek',
      value: canViewAllReports ? '48' : canViewTeamReports ? '12' : '5',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50',
      trend: 'up'
    },
    {
      title: 'Tugas Selesai',
      value: canViewAllReports ? '324' : canViewTeamReports ? '85' : '28',
      change: '+8%',
      icon: CheckSquare,
      color: 'text-green-600 bg-green-50',
      trend: 'up'
    },
    {
      title: 'Total Jam Kerja',
      value: canViewAllReports ? '2,456' : canViewTeamReports ? '640' : '186',
      change: '+15%',
      icon: Clock,
      color: 'text-purple-600 bg-purple-50',
      trend: 'up'
    },
    {
      title: 'Anggota Tim',
      value: canViewAllReports ? '24' : canViewTeamReports ? '8' : '1',
      change: '+2',
      icon: Users,
      color: 'text-orange-600 bg-orange-50',
      trend: 'up'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
          <p className="text-gray-500 mt-1">
            {canViewAllReports ? 'Laporan komprehensif semua proyek dan tim' : 
             canViewTeamReports ? 'Laporan tim dan proyek yang Anda kelola' :
             'Laporan kinerja pribadi Anda'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">7 Hari Terakhir</option>
            <option value="30days">30 Hari Terakhir</option>
            <option value="90days">90 Hari Terakhir</option>
            <option value="year">Tahun Ini</option>
          </select>
          {canExport && (
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {card.change} dari bulan lalu
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setReportType('overview')}
          className={`px-4 py-2 font-medium transition-colors ${
            reportType === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setReportType('projects')}
          className={`px-4 py-2 font-medium transition-colors ${
            reportType === 'projects'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Proyek
        </button>
        {(canViewAllReports || canViewTeamReports) && (
          <button
            onClick={() => setReportType('team')}
            className={`px-4 py-2 font-medium transition-colors ${
              reportType === 'team'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tim
          </button>
        )}
        <button
          onClick={() => setReportType('time')}
          className={`px-4 py-2 font-medium transition-colors ${
            reportType === 'time'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Waktu
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Proyek - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Proyek</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribusi Waktu - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Waktu</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={timeDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {timeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Produktivitas Mingguan - Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produktivitas Mingguan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} name="Tugas Selesai" />
                <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} name="Jam Kerja" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performa Tim - Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {canViewAllReports ? 'Performa Seluruh Tim' : 
               canViewTeamReports ? 'Performa Tim Anda' :
               'Performa Pribadi'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" name="Selesai" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Proyek</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Aktivitas</th>
                  {(canViewAllReports || canViewTeamReports) && (
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Oleh</th>
                  )}
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Waktu</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">Website Redesign</td>
                    <td className="py-3 px-4 text-sm">Task completed: "Update homepage"</td>
                    {(canViewAllReports || canViewTeamReports) && (
                      <td className="py-3 px-4 text-sm">Sarah Johnson</td>
                    )}
                    <td className="py-3 px-4 text-sm text-gray-500">2 jam yang lalu</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Selesai
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}