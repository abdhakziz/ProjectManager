<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'project_id',
        'date',
        'type',
        'priority',
        'description',
        'user_id'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Get the project that owns the event.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the user that created the event.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include events of a given type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope a query to only include events in a date range.
     */
    public function scopeInDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    /**
     * Get type color for display
     */
    public function getTypeColorAttribute()
    {
        switch ($this->type) {
            case 'milestone':
                return 'bg-red-500';
            case 'meeting':
                return 'bg-blue-500';
            case 'task':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    }

    /**
     * Get priority color for display
     */
    public function getPriorityColorAttribute()
    {
        switch ($this->priority) {
            case 'high':
                return 'border-red-500';
            case 'medium':
                return 'border-orange-500';
            case 'low':
                return 'border-blue-500';
            default:
                return 'border-gray-500';
        }
    }
}
