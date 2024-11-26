<?php

namespace App\Http\Controllers;

use App\Models\PointsRedemption;
use App\Models\GcashRedemptionConfig;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PointsRedemptionController extends Controller
{
    public function index(Request $request)
    {
        $redemptions = auth()->user()->pointsRedemptions()
            ->latest()
            ->paginate(10);

        return inertia('PointsRedemption/Index', [
            'redemptions' => $redemptions
        ]);
    }

    public function store(Request $request)
{
    $user = auth()->user();

    $request->validate([
        'points' => [
            'required', 
            'integer',
            'exists:gcash_redemption_configs,points_required'
        ],
        'gcash_name' => [
            'required', 
            'string', 
            'min:2', 
            'max:255', 
            'regex:/^[a-zA-Z\s]+$/'
        ],
        'gcash_number' => [
            'required', 
            'string', 
            'regex:/^(09|\+639)\d{9}$/'
        ]
    ]);

    try {
        return DB::transaction(function () use ($request, $user) {
            // Validate redemption configuration
            $configValidation = GcashRedemptionConfig::validateRedemption(
                $request->points
            );

            if (!$configValidation['valid']) {
                return response()->json([
                    'message' => $configValidation['message']
                ], 400);
            }

            $config = $configValidation['config'];

            // Check monthly redemption limit
            if ($config->maximum_redemptions_per_month) {
                $monthlyRedemptions = PointsRedemption::where('user_id', $user->id)
                    ->where('created_at', '>=', now()->startOfMonth())
                    ->count();

                if ($monthlyRedemptions >= $config->maximum_redemptions_per_month) {
                    return response()->json([
                        'message' => "You've reached the maximum monthly redemptions"
                    ], 400);
                }
            }

            // Check if user has enough points
            if ($user->youth_points < $request->points) {
                return response()->json([
                    'message' => 'Insufficient points for redemption'
                ], 400);
            }

            // Create redemption record
            $redemption = PointsRedemption::create([
                'user_id' => $user->id,
                'points_redeemed' => $request->points,
                'gcash_amount' => $config->gcash_amount,
                'gcash_name' => $request->gcash_name,
                'gcash_number' => $request->gcash_number,
                'status' => 'pending',
                'transaction_reference' => PointsRedemption::generateTransactionReference(),
                'remarks' => 'Points redemption initiated'
            ]);

            // Deduct points
            $user->decrement('youth_points', $request->points);

            return response()->json([
                'message' => 'Points redemption request submitted successfully',
                'redemption' => $redemption
            ], 201);
        });
    } catch (\Exception $e) {
        Log::error('Points Redemption Error: ' . $e->getMessage());
        
        return response()->json([
            'message' => 'An error occurred while processing your redemption',
            'error' => $e->getMessage()
        ], 500);
    }
}
    public function cancel($id)
    {
        $redemption = PointsRedemption::findOrFail($id);

        // Ensure only pending redemptions can be cancelled
        if ($redemption->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending redemptions can be cancelled'
            ], 400);
        }

        return DB::transaction(function () use ($redemption) {
            // Refund points
            $user = $redemption->user;
            $user->increment('youth_points', $redemption->points_redeemed);

            // Update redemption status
            $redemption->update([
                'status' => 'cancelled',
                'remarks' => 'Redemption cancelled by user'
            ]);

            return response()->json([
                'message' => 'Redemption cancelled successfully',
                'points_refunded' => $redemption->points_redeemed
            ]);
        });
    }
}