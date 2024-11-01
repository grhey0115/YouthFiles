<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AyudaController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserAyudaHistoryController;
use App\Http\Controllers\DocumentRequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AnnouncementController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Auth\OtpController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'otp-verified'])->name('dashboard');

Route::middleware([CheckRegistrationCompletion::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

//Route::middleware(['auth'])->group(function () {
    //Route::get('/email/verify', function () {
       // return Inertia::render('Auth/VerifyEmail'); // This renders the above VerifyEmail component
    //})->name('verification.notice');

    //Route::get('/email/verify/{id}/{hash}', [VerifiedEmailController::class, 'verify'])
       // ->middleware(['signed'])
       // ->name('verification.verify');

   // Route::post('/email/resend', [VerifiedEmailController::class, 'resend'])
    //    ->middleware('throttle:6,1')
    //    ->name('verification.send');
//});

Route::get('otp/verify', [OtpController::class, 'show'])->name('otp.verify');
Route::post('otp/check', [OtpController::class, 'verify'])->name('otp.check');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [EventController::class, 'index'])->name('dashboard');
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');
    Route::post('/events/{id}/join', [EventController::class, 'join'])->name('events.join');
    Route::post('/events/{event}/join', [EventController::class, 'join'])->middleware('auth')->name('events.join.auth');
    Route::get('/admin/events/{event}/participants', [EventController::class, 'showParticipants'])->name('filament.resources.events.relationManager');
    Route::post('/events/{event}/cancel', [EventController::class, 'cancel'])->name('events.cancel');
    Route::get('/events/{event}/attendance/{user}', [EventController::class, 'markAttendance'])->middleware('auth')->name('events.attendance');
    Route::post('/events/{event}/payment', [EventController::class, 'storePayment'])->name('events.payment');

    Route::get('/profile/view', [ProfileController::class, 'view'])->name('profile.view');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');

      // Multi-step form routes
      Route::get('/profile/form', [ProfileController::class, 'showForm'])->name('profile.form');
      Route::post('/profile-step1', [ProfileController::class, 'postStep1'])->name('profile.step1');
      Route::post('/profile-step2', [ProfileController::class, 'postStep2'])->name('profile.step2');
      Route::post('/profile-step3', [ProfileController::class, 'postStep3'])->name('profile.step3');
      Route::post('/profile-step4', [ProfileController::class, 'postStep4'])->name('profile.step4');


      // Routes for ayuda
    Route::get('/ayudas', [AyudaController::class, 'index'])->name('ayuda.index');
    Route::get('/ayudas/{id}', [AyudaController::class, 'show'])->name('ayuda.show');
    Route::post('/ayudas/{id}/join', [AyudaController::class, 'join'])->name('ayuda.join');
    Route::post('/ayudas/{id}/apply', [AyudaController::class, 'apply'])->name('ayudas.apply');
    Route::post('/ayudas/{id}/cancel', [AyudaController::class, 'cancel'])->name('ayudas.cancel');
    Route::get('/users/{user}/ayuda-history', [UserAyudaHistoryController::class, 'show'])->name('user.ayuda.history');
    Route::post('/ayudas/{ayuda}/donate', [AyudaController::class, 'donate'])->name('ayudas.donate');
    Route::post('/ayudas/{ayuda}/volunteer', [AyudaController::class, 'volunteer'])->name('ayudas.volunteer');



    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/{id}', [ProjectController::class, 'show'])->name('projects.show');


    Route::get('/help-center', function () {return Inertia::render('HelpCenter');})->name('help-center');
    Route::get('/document-request', [DocumentRequestController::class, 'create'])->name('document.request');
    Route::post('/document-request', [DocumentRequestController::class, 'store'])->name('document.request.store');


    Route::middleware(['auth'])->group(function () {
        // Announcements
        Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
        Route::get('/announcements/{id}', [AnnouncementController::class, 'show'])->name('announcements.show');
    
        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::middleware(['auth:sanctum'])->get('/notifications', [NotificationController::class, 'index'])->name('notifications.list');
        Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    });


    Route::post('/api/paymongo/payment-intent', [PaymentController::class, 'createPaymentIntent']);

});

require __DIR__.'/auth.php';
