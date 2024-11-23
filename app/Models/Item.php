<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'category',
        'quantity',
        'available_quantity',
        'is_available',
        'description',
        'condition'
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'quantity' => 'integer',
        'available_quantity' => 'integer'
    ];

    // Relationships
    public function borrowRequests()
    {
        return $this->hasMany(BorrowRequests::class);
    }

    public function activeBorrows()
    {
        return $this->borrowRequests()
            ->where('status', 'approved')
            ->whereNull('returned_at');
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)
                    ->where('available_quantity', '>', 0);
    }

    // Availability Checks
    public function isAvailable($requestedQuantity = 1)
    {
        return $this->available_quantity >= $requestedQuantity 
               && $this->is_available;
    }

    public function canBorrow($requestedQuantity = 1)
    {
        return $this->quantity >= $requestedQuantity 
               && $this->available_quantity >= $requestedQuantity;
    }

    // Modify updateQuantity method
    public function updateQuantity(BorrowRequests $borrowRequest, $action = 'create')
    {
        switch ($action) {
            case 'approve':
                $this->decrement('available_quantity');
                
                // Ensure availability is updated
                $this->is_available = $this->available_quantity > 0 && $this->is_available;
                $this->save();
                break;
            
            case 'return':
                $this->increment('available_quantity');
                
                // Ensure availability is updated
                $this->is_available = $this->available_quantity > 0 && $this->is_available;
                $this->save();
                break;
        }
    }


    // Mutators and Accessors
    public function setAvailableQuantityAttribute($value)
    {
        $this->attributes['available_quantity'] = max(0, min($value, $this->quantity));
    }

    public function getDisplayNameAttribute()
    {
        return "{$this->name} (Available: {$this->available_quantity})";
    }

    // Validation Rules
    public static function validationRules()
    {
        return [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'available_quantity' => 'nullable|integer|min:0|max:quantity',
            'is_available' => 'boolean',
            'description' => 'nullable|string',
            'condition' => 'nullable|string'
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            // Ensure available_quantity is set to quantity if not specified
            $item->available_quantity = $item->available_quantity ?? $item->quantity;
            
            // Explicitly set availability based on quantity
            $item->is_available = $item->quantity > 0;
        });

        static::updating(function ($item) {
            // Ensure available_quantity never exceeds total quantity
            $item->available_quantity = min($item->available_quantity, $item->quantity);
            
            // Update availability based on both quantity and manual toggle
            $item->is_available = $item->quantity > 0 && $item->is_available;
        });
    }


    // Additional Utility Methods
    public function getRemainingQuantityAttribute()
    {
        return $this->available_quantity;
    }

    public function getTotalBorrowedAttribute()
    {
        return $this->quantity - $this->available_quantity;
    }
    
    public function setAvailability(bool $isAvailable)
    {
        // Only allow setting to available if quantity > 0
        $this->is_available = $isAvailable && $this->quantity > 0;
        $this->save();
    }
    public function setIsAvailableAttribute($value)
    {
        // Only allow setting to available if quantity > 0
        $this->attributes['is_available'] = $value && $this->quantity > 0;
    }

    // Add a method to check and update availability
    public function checkAndUpdateAvailability()
    {
        $wasAvailable = $this->is_available;
        
        // Recalculate availability
        $this->is_available = $this->quantity > 0 && $this->available_quantity > 0;
        
        // Save only if the state changed
        if ($wasAvailable !== $this->is_available) {
            $this->save();
        }
    }

    // Modify existing methods to ensure availability is checked
    public function decreaseQuantity($amount = 1)
    {
        if ($this->canBorrow($amount)) {
            $this->decrement('quantity', $amount);
            $this->decrement('available_quantity', $amount);
            
            $this->checkAndUpdateAvailability();
            
            return true;
        }
        return false;
    }

    public function increaseQuantity($amount = 1)
    {
        $this->increment('quantity', $amount);
        $this->increment('available_quantity', $amount);
        
        $this->checkAndUpdateAvailability();
    }
}

    

