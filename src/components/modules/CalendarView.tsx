import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  currentUser: any;
  selectedProject?: any;
}

export default function CalendarView({ currentUser, selectedProject }: CalendarViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock events and deadlines
  const events = [
    { 
      id: 1, 
      title: 'Design homepage mockup', 
      project: 'Website Redesign',
      date: '2026-01-08', 
      type: 'deadline',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Team meeting - Sprint planning', 
      project: 'General',
      date: '2026-01-07', 
      type: 'meeting',
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Complete API integration', 
      project: 'Mobile App',
      date: '2026-01-09', 
      type: 'deadline',
      priority: 'high'
    },
    { 
      id: 4, 
      title: 'Marketing materials review', 
      project: 'Marketing Campaign',
      date: '2026-01-10', 
      type: 'deadline',
      priority: 'medium'
    },
    { 
      id: 5, 
      title: 'Setup test environment', 
      project: 'Database Migration',
      date: '2026-01-12', 
      type: 'task',
      priority: 'low'
    },
    { 
      id: 6, 
      title: 'Client presentation', 
      project: 'Website Redesign',
      date: '2026-01-15', 
      type: 'meeting',
      priority: 'high'
    },
    { 
      id: 7, 
      title: 'Deploy to staging', 
      project: 'Mobile App',
      date: '2026-01-20', 
      type: 'task',
      priority: 'medium'
    }
  ];

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getEventsForSelectedDate = () => {
    if (!date) return [];
    return getEventsForDate(date);
  };

  const getMonthEvents = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= monthStart && eventDate <= monthEnd;
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'task':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'Deadline';
      case 'meeting':
        return 'Meeting';
      case 'task':
        return 'Tugas';
      default:
        return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-orange-500';
      case 'low':
        return 'border-l-4 border-blue-500';
      default:
        return 'border-l-4 border-gray-500';
    }
  };

  const monthEvents = getMonthEvents();
  const selectedDateEvents = getEventsForSelectedDate();

  // Create Gantt chart data for timeline view
  const ganttData = [
    { 
      project: 'Website Redesign', 
      tasks: [
        { name: 'Design', start: new Date('2026-01-01'), end: new Date('2026-01-08'), progress: 80 },
        { name: 'Development', start: new Date('2026-01-09'), end: new Date('2026-01-15'), progress: 30 }
      ]
    },
    { 
      project: 'Mobile App', 
      tasks: [
        { name: 'API Integration', start: new Date('2026-01-05'), end: new Date('2026-01-09'), progress: 60 },
        { name: 'Testing', start: new Date('2026-01-10'), end: new Date('2026-01-20'), progress: 0 }
      ]
    },
    { 
      project: 'Marketing Campaign', 
      tasks: [
        { name: 'Content Creation', start: new Date('2026-01-03'), end: new Date('2026-01-10'), progress: 90 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Kalender & Timeline</h2>
        <p className="text-gray-500 mt-1">Lihat jadwal, deadline, dan timeline proyek</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Kalender
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Events for selected date */}
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? date.toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Pilih Tanggal'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className={`p-3 bg-gray-50 rounded-lg ${getPriorityColor(event.priority)}`}>
                    <Badge className={getTypeColor(event.type)} variant="secondary">
                      {getTypeLabel(event.type)}
                    </Badge>
                    <h4 className="font-medium mt-2">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{event.project}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Tidak ada event pada tanggal ini
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Event Bulan Ini ({monthEvents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthEvents.map(event => (
              <div key={event.id} className={`p-4 bg-gray-50 rounded-lg ${getPriorityColor(event.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getTypeColor(event.type)} variant="secondary">
                    {getTypeLabel(event.type)}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{event.project}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gantt Chart Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Proyek (Gantt Chart)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ganttData.map((project, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-3">{project.project}</h4>
                {project.tasks.map((task, taskIdx) => (
                  <div key={taskIdx} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{task.name}</span>
                      <span className="text-sm text-gray-600">
                        {task.start.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {task.end.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="absolute h-full bg-blue-600 rounded-lg flex items-center px-2"
                        style={{ width: `${task.progress}%` }}
                      >
                        {task.progress > 0 && (
                          <span className="text-xs text-white font-medium">{task.progress}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}