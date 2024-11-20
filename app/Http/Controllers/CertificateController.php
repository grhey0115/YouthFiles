<?php
// app/Http/Controllers/CertificateController.php
namespace App\Http\Controllers;

use App\Models\Event;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CertificateController extends Controller
{
    public function downloadCertificate(Event $event)
    {
        $user = Auth::user();
        $attendance = $user->events()->where('event_id', $event->id)->first()->pivot->attendance_status;

        if ($attendance !== 'present') {
            abort(403, 'You are not eligible to download the certificate.');
        }

        $pdf = Pdf::loadView('pdf.certificate', [
            'name' => "{$user->first_name} {$user->last_name}",
            'event' => $event,
        ])->setPaper('a4', 'landscape');

        return $pdf->download("Certificate-{$user->first_name}-{$user->last_name}.pdf");
    }
}
