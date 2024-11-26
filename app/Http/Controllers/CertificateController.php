<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Event;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CertificateController extends Controller
{
    /**
     * Show a preview of the certificate.
     *
     * @param int $id The ID of the certificate
     * @return \Illuminate\View\View
     */
    public function showCertificatePreview($id)
    {
        $certificate = Certificate::with('signatures')->findOrFail($id);
        return view('certificate-preview', [
            'title' => $certificate->title,
            'description' => $certificate->description,
            'background_image' => $certificate->background_image,
            'signatures' => $certificate->signatures,
        ]);
    }
    public function showCertificate()
    {
        $event = (object)[
            'certificate_orientation' => 'landscape', // or 'portrait'
            'certificate_theme' => '#fff',
            'certificate_primary_color' => '#000',
            'name' => 'Annual Conference',
            'header_image' => 'event-logo.png', // Ensure this image is available in your public/storage
            'start_time' => now(), // Example date
            'location' => 'New York City'
        ];

        $name = "John Doe"; // Example name

        // Mocking signatories data
        $certificateSignatories = [
            (object)[
                'signature_path' => 'signature1.png',
                'name' => 'Jane Doe',
                'role' => 'Organizer'
            ]
        ];

        return view('certificate', compact('event', 'name', 'certificateSignatories'));
    }

    /**
     * Download a PDF certificate only if the user was present at the event.
     *
     * @param Event $event An instance of the Event model
     * @return mixed
     */
    public function downloadCertificate(Event $event)
    {
        $user = Auth::user();
        $attendance = $user->events()->where('event_id', $event->id)->first()->pivot->attendance_status;

        if ($attendance !== 'present') {
            abort(403, 'You are not eligible to download the certificate.');
        }

        $pdf = PDF::loadView('pdf.certificate', [
            'name' => $user->first_name . ' ' . $user->last_name,
            'event' => $event,
        ])->setPaper('a4', 'landscape');

        return $pdf->download("Certificate-{$user->first_name}-{$user->last_name}.pdf");
    }
}