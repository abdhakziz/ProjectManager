import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';

interface CalendarViewProps {
  currentUser: any;
  selectedProject?: any;
}

export default function CalendarView({ currentUser, selectedProject }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock events and deadlines
  const events = [
    { 
      id: 1, 
      title: 'Design homepage mockup selesai', 
      project: 'Website Redesign',
      date: '2026-01-08', 
      type: 'milestone',
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
      title: 'API integration completed', 
      project: 'Mobile App',
      date: '2026-01-09', 
      type: 'milestone',
      priority: 'high'
    },
    { 
      id: 4, 
      title: 'Review marketing materials', 
      project: 'Marketing Campaign',
      date: '2026-01-10', 
      type: 'task',
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
    },
    { 
      id: 8, 
      title: 'Product launch', 
      project: 'Website Redesign',
      date: '2026-01-25', 
      type: 'milestone',
      priority: 'high'
    }
  ];

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'bg-red-500';
      case 'meeting':
        return 'bg-blue-500';
      case 'task':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth();
  const monthYear = currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

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

      {/* Large Calendar with Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {monthYear}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
                Hari Ini
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, index) => (
              <div key={index} className="text-center font-semibold text-sm text-gray-600 py-2 border-b">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((date, index) => {
              const dayEvents = date ? getEventsForDate(date) : [];
              const isTodayDate = isToday(date);
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] border rounded-lg p-2 ${
                    date ? 'bg-white hover:bg-gray-50 cursor-pointer transition-colors' : 'bg-gray-50'
                  } ${isTodayDate ? 'border-blue-500 border-2 bg-blue-50' : 'border-gray-200'}`}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-semibold mb-1 ${isTodayDate ? 'text-blue-600' : 'text-gray-900'}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`${getTypeColor(event.type)} text-white text-xs rounded px-2 py-1 truncate hover:opacity-90 transition-opacity`}
                            title={`${event.title} - ${event.project}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500 pl-2">
                            +{dayEvents.length - 3} lainnya
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t">
            <span className="text-sm font-semibold text-gray-700">Keterangan:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Milestone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Meeting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Tugas</span>
            </div>
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