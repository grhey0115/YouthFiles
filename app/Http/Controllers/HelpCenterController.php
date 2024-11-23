<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\EventCancelledNotification;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Facades\Auth;
use App\Models\EventRegistration;
use App\Models\Payment;
use Carbon\Carbon;
use App\Models\Item;
use App\Models\User; 
use Barryvdh\DomPDF\Facade\Pdf;
use App\Notifications\SlotAvailableNotification;

class HelpCenterController extends Controller
{
    public function index()
    {
        $items = Item::where('is_available', true)
        ->where('quantity', '>', 0)
        ->get();

        return Inertia::render('HelpCenter', [
            'items' => $items
        ]);
    }

   

        
}
