<?php

namespace App\Http\Controllers;

use App\Models\GcashRedemptionConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class GcashRedemptionConfigController extends Controller
{
    public function index()
    {
        try {
            // Verify database connection
            DB::connection()->getPdo();

            // Ensure user is authenticated
            if (!auth()->check()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Log the request
            Log::info('Fetching GCash Redemption Configs for user', [
                'user_id' => auth()->id()
            ]);

            // Fetch active configurations
            $configs = GcashRedemptionConfig::where('is_active', true)
                ->select(['points_required', 'gcash_amount', 'is_active'])
                ->get();

            // Log the configs
            Log::info('Configs retrieved', [
                'total_configs' => $configs->count(),
                'configs' => $configs->toArray()
            ]);

            // Return the configs
            return response()->json($configs);
        } catch (\Exception $e) {
            // Log the full error
            Log::error('Error fetching GCash configs', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // Return a detailed error response
            return response()->json([
                'error' => 'Failed to fetch redemption configurations',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}