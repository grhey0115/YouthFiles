<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BorrowRequests extends Model
{
    protected $fillable = [
        'user_id',
        'item_id',
        'purpose',
        'borrow_date',
        'return_date',
        'status',
        'admin_remarks',
        'approved_at',
        'returned_at'
    ];

    protected $casts = [
        'borrow_date' => 'datetime',
        'return_date' => 'datetime',
        'approved_at' => 'datetime',
        'returned_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    public function setStatusAttribute($value)
    {
        $oldStatus = $this->status;
        $this->attributes['status'] = $value;

        // Update item quantity based on status change
        if ($this->item) {
            switch ($value) {
                case 'approved':
                    if ($oldStatus !== 'approved') {
                        // Decrement total quantity when approved
                        $this->item->decrement('quantity');
                        $this->item->decrement('available_quantity');
                    }
                    break;
                
                case 'returned':
                    if ($oldStatus === 'approved') {
                        // Increment total quantity when returned
                        $this->item->increment('quantity');
                        $this->item->increment('available_quantity');
                    }
                    break;
                
                case 'cancelled':
                case 'rejected':
                    // If the previous status was approved, revert quantity
                    if ($oldStatus === 'approved') {
                        $this->item->increment('quantity');
                        $this->item->increment('available_quantity');
                    }
                    break;
            }
        }
    }
    public static function boot()
    {
        parent::boot();

        static::updated(function ($model) {
            if ($model->isDirty('status')) {
                $item = $model->item;
                
                switch ($model->status) {
                    case 'approved':
                        // Decrement quantity when approved
                        $item->decrement('quantity');
                        break;
                    
                    case 'returned':
                    case 'cancelled':
                    case 'rejected':
                        // Increment quantity back if it was previously approved
                        if ($model->getOriginal('status') === 'approved') {
                            $item->increment('quantity');
                        }
                        break;
                }
            }
        });
    }
    
}