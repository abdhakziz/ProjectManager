@extends('layouts.app')

@section('content')
<div class="space-y-6" x-data="calendarData(@js($events))">
    <!-- Header -->
    <div>
        <h2 class="text-2xl font-semibold">Kalender & Timeline</h2>
        <p class="text-gray-500 mt-1">Lihat jadwal, deadline, dan timeline proyek</p>
    </div>

    <!-- Large Calendar with Events -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold flex items-center gap-2">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span x-text="monthYear"></span>
                </h3>
                <div class="flex items-center gap-2">
                    <button @click="previousMonth" class="px-3 py-2 border rounded-lg hover:bg-gray-50">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button @click="goToToday" class="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                        Hari Ini
                    </button>
                    <button @click="nextMonth" class="px-3 py-2 border rounded-lg hover:bg-gray-50">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="p-6">
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-2">
                <!-- Day headers -->
                <template x-for="day in ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']" :key="day">
                    <div class="text-center font-semibold text-sm text-gray-600 py-2 border-b" x-text="day"></div>
                </template>
                
                <!-- Calendar days -->
                <template x-for="(date, index) in calendarDays" :key="index">
                    <div 
                        :class="{
                            'min-h-[120px] border rounded-lg p-2': true,
                            'bg-white hover:bg-gray-50 cursor-pointer transition-colors': date !== null,
                            'bg-gray-50': date === null,
                            'border-blue-500 border-2 bg-blue-50': date && isToday(date),
                            'border-gray-200': date && !isToday(date)
                        }"
                    >
                        <template x-if="date">
                            <div>
                                <div 
                                    :class="{
                                        'text-sm font-semibold mb-1': true,
                                        'text-blue-600': isToday(date),
                                        'text-gray-900': !isToday(date)
                                    }"
                                    x-text="date ? new Date(date).getDate() : ''"
                                ></div>
                                <div class="space-y-1">
                                    <template x-for="event in getEventsForDate(date).slice(0, 3)" :key="event.id">
                                        <div 
                                            :class="'text-white text-xs rounded px-2 py-1 truncate hover:opacity-90 transition-opacity ' + getTypeColor(event.type)"
                                            :title="event.title + ' - ' + event.project"
                                            x-text="event.title"
                                        ></div>
                                    </template>
                                    <template x-if="getEventsForDate(date).length > 3">
                                        <div class="text-xs text-gray-500 pl-2">
                                            +<span x-text="getEventsForDate(date).length - 3"></span> lainnya
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
            
            <!-- Legend -->
            <div class="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t">
                <span class="text-sm font-semibold text-gray-700">Keterangan:</span>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-red-500 rounded"></div>
                    <span class="text-sm text-gray-600">Milestone</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-blue-500 rounded"></div>
                    <span class="text-sm text-gray-600">Meeting</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-green-500 rounded"></div>
                    <span class="text-sm text-gray-600">Tugas</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Gantt Chart Timeline -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold">Timeline Proyek (Gantt Chart)</h3>
        </div>
        <div class="p-6">
            <div class="space-y-6">
                @foreach($ganttData as $projectData)
                <div>
                    <h4 class="font-semibold mb-3">{{ $projectData['project'] }}</h4>
                    @foreach($projectData['tasks'] as $task)
                    <div class="mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-medium">{{ $task['name'] }}</span>
                            <span class="text-sm text-gray-600">
                                {{ \Carbon\Carbon::parse($task['start'])->format('d M') }} - 
                                {{ \Carbon\Carbon::parse($task['end'])->format('d M') }}
                            </span>
                        </div>
                        <div class="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
                            <div 
                                class="absolute h-full bg-blue-600 rounded-lg flex items-center px-2"
                                style="width: {{ $task['progress'] }}%"
                            >
                                @if($task['progress'] > 0)
                                <span class="text-xs text-white font-medium">{{ $task['progress'] }}%</span>
                                @endif
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
function calendarData(initialEvents) {
    return {
        currentMonth: new Date(),
        events: initialEvents,
        
        get monthYear() {
            return this.currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        },
        
        get calendarDays() {
            const year = this.currentMonth.getFullYear();
            const month = this.currentMonth.getMonth();
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
        },
        
        getEventsForDate(date) {
            if (!date) return [];
            const dateStr = date.toISOString().split('T')[0];
            return this.events.filter(event => event.date === dateStr);
        },
        
        isToday(date) {
            if (!date) return false;
            const today = new Date();
            return date.toDateString() === today.toDateString();
        },
        
        getTypeColor(type) {
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
        },
        
        previousMonth() {
            this.currentMonth = new Date(
                this.currentMonth.getFullYear(), 
                this.currentMonth.getMonth() - 1, 
                1
            );
        },
        
        nextMonth() {
            this.currentMonth = new Date(
                this.currentMonth.getFullYear(), 
                this.currentMonth.getMonth() + 1, 
                1
            );
        },
        
        goToToday() {
            this.currentMonth = new Date();
        }
    }
}
</script>
@endpush
@endsection
