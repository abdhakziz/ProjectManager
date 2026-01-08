<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = auth()->user();
        $selectedProject = null; // atau ambil dari request/session
        
        // Mock events data - dalam implementasi nyata, ambil dari database
        $events = [
            [
                'id' => 1,
                'title' => 'Design homepage mockup selesai',
                'project' => 'Website Redesign',
                'date' => '2026-01-08',
                'type' => 'milestone',
                'priority' => 'high'
            ],
            [
                'id' => 2,
                'title' => 'Team meeting - Sprint planning',
                'project' => 'General',
                'date' => '2026-01-07',
                'type' => 'meeting',
                'priority' => 'medium'
            ],
            [
                'id' => 3,
                'title' => 'API integration completed',
                'project' => 'Mobile App',
                'date' => '2026-01-09',
                'type' => 'milestone',
                'priority' => 'high'
            ],
            [
                'id' => 4,
                'title' => 'Review marketing materials',
                'project' => 'Marketing Campaign',
                'date' => '2026-01-10',
                'type' => 'task',
                'priority' => 'medium'
            ],
            [
                'id' => 5,
                'title' => 'Setup test environment',
                'project' => 'Database Migration',
                'date' => '2026-01-12',
                'type' => 'task',
                'priority' => 'low'
            ],
            [
                'id' => 6,
                'title' => 'Client presentation',
                'project' => 'Website Redesign',
                'date' => '2026-01-15',
                'type' => 'meeting',
                'priority' => 'high'
            ],
            [
                'id' => 7,
                'title' => 'Deploy to staging',
                'project' => 'Mobile App',
                'date' => '2026-01-20',
                'type' => 'task',
                'priority' => 'medium'
            ],
            [
                'id' => 8,
                'title' => 'Product launch',
                'project' => 'Website Redesign',
                'date' => '2026-01-25',
                'type' => 'milestone',
                'priority' => 'high'
            ]
        ];
        
        // Gantt chart data
        $ganttData = [
            [
                'project' => 'Website Redesign',
                'tasks' => [
                    [
                        'name' => 'Design',
                        'start' => '2026-01-01',
                        'end' => '2026-01-08',
                        'progress' => 80
                    ],
                    [
                        'name' => 'Development',
                        'start' => '2026-01-09',
                        'end' => '2026-01-15',
                        'progress' => 30
                    ]
                ]
            ],
            [
                'project' => 'Mobile App',
                'tasks' => [
                    [
                        'name' => 'API Integration',
                        'start' => '2026-01-05',
                        'end' => '2026-01-09',
                        'progress' => 60
                    ],
                    [
                        'name' => 'Testing',
                        'start' => '2026-01-10',
                        'end' => '2026-01-20',
                        'progress' => 0
                    ]
                ]
            ],
            [
                'project' => 'Marketing Campaign',
                'tasks' => [
                    [
                        'name' => 'Content Creation',
                        'start' => '2026-01-03',
                        'end' => '2026-01-10',
                        'progress' => 90
                    ]
                ]
            ]
        ];
        
        return view('calendar.index', compact('currentUser', 'selectedProject', 'events', 'ganttData'));
    }
    
    public function getEventsForMonth(Request $request)
    {
        $year = $request->input('year', date('Y'));
        $month = $request->input('month', date('m'));
        
        // Query events dari database
        // $events = Event::whereYear('date', $year)
        //     ->whereMonth('date', $month)
        //     ->get();
        
        // Mock data untuk example
        $events = []; // return events as JSON
        
        return response()->json($events);
    }
}
