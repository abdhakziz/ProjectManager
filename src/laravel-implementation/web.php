<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalendarController;

/*
|--------------------------------------------------------------------------
| Calendar Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {
    // Calendar view
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
    
    // Get events for a specific month (AJAX)
    Route::get('/calendar/events', [CalendarController::class, 'getEventsForMonth'])->name('calendar.events');
    
    // Create new event
    Route::post('/calendar/events', [CalendarController::class, 'store'])->name('calendar.store');
    
    // Update event
    Route::put('/calendar/events/{event}', [CalendarController::class, 'update'])->name('calendar.update');
    
    // Delete event
    Route::delete('/calendar/events/{event}', [CalendarController::class, 'destroy'])->name('calendar.destroy');
});
