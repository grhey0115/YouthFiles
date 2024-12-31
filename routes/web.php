<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AyudaController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserAyudaHistoryController;
use App\Http\Controllers\HelpCenterController;
use App\Http\Controllers\BorrowRequestController;
use App\Http\Controllers\EmergencyRequestController;
use App\Http\Controllers\GcashRedemptionConfigController;
use App\Http\Controllers\PointsRedemptionController;
use App\Http\Controllers\DocumentRequestController;
use App\Http\Controllers\TanodRequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\OtpController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Auth routes that don't require approval
Route::middleware(['auth'])->group(function () {
    /*Route::get('/email/verify', function () {
        return Inertia::render('Auth/VerifyEmail');
    })->name('verification.notice');*/

    Route::get('/pending-approval', function () {
        if (auth()->user()->approval_status === 'approved') {
            return redirect()->route('dashboard');
        }
        return Inertia::render('Auth/PendingApproval');
    })->name('pending-approval');

    Route::get('otp/verify', [OtpController::class, 'show'])->name('otp.verify');
    Route::post('otp/check', [OtpController::class, 'verify'])->name('otp.check');

    // Multi-step form routes (accessible after email verification)
    Route::middleware(['verified'])->group(function () {
        Route::get('/profile/form', [ProfileController::class, 'showForm'])->name('profile.form');
        Route::post('/profile-step1', [ProfileController::class, 'postStep1'])->name('profile.step1');
        Route::post('/profile-step2', [ProfileController::class, 'postStep2'])->name('profile.step2');
        Route::post('/profile-step3', [ProfileController::class, 'postStep3'])->name('profile.step3');
        Route::post('/profile-step4', [ProfileController::class, 'postStep4'])->name('profile.step4');
        Route::post('/upload', [ProfileController::class, 'upload']);
    });
});

// Protected routes requiring full authentication
Route::middleware(['auth', 'verified', 'approved'])->group(function () {
    Route::get('/dashboard', [EventController::class, 'index'])->name('dashboard');
    
    // Events routes
    Route::prefix('events')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('events.index');
        Route::get('/{id}', [EventController::class, 'show'])->name('events.show');
        Route::post('/{id}/join', [EventController::class, 'join'])->name('events.join');
        Route::get('/{event}/participants', [EventController::class, 'showParticipants'])->name('filament.resources.events.relationManager');
        Route::post('/{event}/cancel', [EventController::class, 'cancel'])->name('events.cancel');
        Route::get('/{event}/attendance/{user}', [EventController::class, 'markAttendance'])->name('events.attendance');
        Route::post('/{event}/payment', [EventController::class, 'storePayment'])->name('events.payment');
        Route::get('/{event}/certificate', [EventController::class, 'downloadCertificate'])->name('events.certificate');
    });

    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::get('/view', [ProfileController::class, 'view'])->name('profile.view');
        Route::get('/edit', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::post('/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');
    });

    // Ayuda routes
    Route::prefix('ayudas')->group(function () {
        Route::get('/', [AyudaController::class, 'index'])->name('ayuda.index');
        Route::get('/{id}', [AyudaController::class, 'show'])->name('ayuda.show');
        Route::post('/{id}/join', [AyudaController::class, 'join'])->name('ayuda.join');
        Route::post('/{id}/apply', [AyudaController::class, 'apply'])->name('ayudas.apply');
        Route::post('/{id}/cancel', [AyudaController::class, 'cancel'])->name('ayudas.cancel');
        Route::post('/{ayuda}/donate', [AyudaController::class, 'donate'])->name('ayudas.donate');
        Route::post('/{ayuda}/volunteer', [AyudaController::class, 'volunteer'])->name('ayudas.volunteer');
    });

    // Add all your other protected routes here...
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/{id}', [ProjectController::class, 'show'])->name('projects.show');
    
    Route::get('/help-center', [HelpCenterController::class, 'index'])->name('help-center');
    Route::get('/document-request', [DocumentRequestController::class, 'create'])->name('document.request');
    Route::post('/document-request', [DocumentRequestController::class, 'store'])->name('document.request.store');

    // Notifications and Announcements
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index'])->name('notifications.index');
        Route::post('/mark-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
        Route::post('/delete', [NotificationController::class, 'deleteNotifications'])->name('notifications.delete');
    });

    Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
    Route::get('/announcements/{id}', [AnnouncementController::class, 'show'])->name('announcements.show');

    // Other functionality routes...
    Route::post('/api/paymongo/payment-intent', [PaymentController::class, 'createPaymentIntent']);



       /* Route::get('/budget/{budget}/export-disbursements', [
        BudgetResource::class, 
        'exportProjectDisbursements'
    ])->name('budget.export-disbursements');*/


    
    Route::get('/help-center', [HelpCenterController::class, 'index'])->name('help-center');
       // Route::post('/borrow-equipment', [BorrowRequestController::class, 'store'])
         //   ->name('borrow.store');
            
            Route::resource('borrow-requests', BorrowRequestController::class)
            ->only(['index', 'store', 'show']);
            Route::post('/borrow-requests', [BorrowRequestController::class, 'store'])
            ->name('borrow.store');
        
        // Optional: Cancel route if not included in resource controller
        Route::post('borrow-requests/{borrowRequest}/cancel', 
            [BorrowRequestController::class, 'cancel'])
            ->name('borrow-requests.cancel');
   

            Route::middleware(['auth'])->group(function () {
                Route::get('/tanod-requests/create', [TanodRequestController::class, 'create'])->name('tanod.requests.create');
                Route::post('/tanod-requests', [TanodRequestController::class, 'store'])->name('tanod.requests.store');
                Route::get('/tanod-requests', [TanodRequestController::class, 'index'])->name('tanod.requests.index');
                // Add more routes as needed
            });

            Route::get('/download/tanod/{filename}', function ($filename) {
                $path = 'tanod_requests/' . $filename;
                
                if (!Storage::disk('public')->exists($path)) {
                    abort(404);
                }
            
                return Storage::disk('public')->download($path);
            })->name('download.tanod.file');


           // Route::get('/certificate/preview/{id}', [CertificateController::class, 'preview'])->name('certificate.preview');

          //  Route::get('/test-certificate', 'CertificateController@showCertificate');


         
            Route::post('/emergency-request', [EmergencyRequestController::class, 'store'])
                ->name('sk.emergency.store');
            
            Route::get('/emergency-requests', [EmergencyRequestController::class, 'index'])
                ->name('emergency-requests.index');


            Route::post('/points/redeem', [PointsRedemptionController::class, 'store'])
                 ->name('points.redeem');
    
            Route::delete('/points/redemption/{id}/cancel', [PointsRedemptionController::class, 'cancel'])
                ->name('points.redemption.cancel');
    
            Route::get('/points/redemptions', [PointsRedemptionController::class, 'index'])
                ->name('points.redemptions');

            Route::get('/gcash/redemption/configs', [GcashRedemptionConfigController::class, 'index'])
                ->name('gcash.redemption.configs');

            Route::get('/your.events.fetch', [EventController::class, 'fetchUserEvents'])->name('your.events.fetch');
            
            


});

// API routes
Route::get('/api/check-verification-status', function () {
    if (!auth()->check()) {
        return response()->json(['verified' => false]);
    }
    return response()->json([
        'verified' => !is_null(auth()->user()->email_verified_at)
    ]);
});

require __DIR__.'/auth.php';
