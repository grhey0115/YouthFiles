<?php

namespace App\Http\Controllers;

use App\Models\EmergencyRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmergencyRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'contact' => [
                'required', 
                'string', 
                'regex:~^(09|\+639)\d{9}$~' // Use different delimiters
            ],
            'assistanceType' => [
                'required', 
                Rule::in(['health', 'financial', 'education', 'community', 'personal'])
            ],
            'description' => 'required|string|max:1000',
            'supporting_document' => 'nullable|file|mimes:pdf,png,jpg,jpeg|max:5120'
        ], [
            'contact.regex' => 'Invalid contact number format. Must start with 09 or +639 and be 11 digits long.'
        ]);

        $emergencyRequest = EmergencyRequest::create([
            'user_id' => auth()->id(),
            'contact_number' => $validated['contact'],
            'assistance_type' => $validated['assistanceType'],
            'description' => $validated['description'],
            'supporting_document' => $request->file('supporting_document') ?? null
        ]);

        return back()->with('success', 'Emergency request submitted successfully');
    }

    // Alternative approach using phone number validation
    public function alternativeStore(Request $request)
    {
        $validated = $request->validate([
            'contact' => [
                'required', 
                'string', 
                function ($attribute, $value, $fail) {
                    // Remove any non-digit characters
                    $cleaned = preg_replace('/\D/', '', $value);
                    
                    // Check if it starts with 09 or 639 and has 10 or 12 digits
                    if (!preg_match('/^(09\d{9}|\+?639\d{9})$/', $cleaned)) {
                        $fail('Invalid Philippine mobile number format');
                    }
                }
            ],
            'assistanceType' => [
                'required', 
                Rule::in(['health', 'financial', 'education', 'community', 'personal'])
            ],
            'description' => 'required|string|max:1000',
            'supporting_document' => 'nullable|file|mimes:pdf,png,jpg,jpeg|max:5120'
        ]);

        $emergencyRequest = EmergencyRequest::create([
            'user_id' => auth()->id(),
            'contact_number' => $validated['contact'],
            'assistance_type' => $validated['assistanceType'],
            'description' => $validated['description'],
            'supporting_document' => $request->file('supporting_document') ?? null
        ]);

        return back()->with('success', 'Emergency request submitted successfully');
    }

    public function index()
    {
        $requests = auth()->user()->emergencyRequests()->latest()->paginate(10);
        return Inertia::render('EmergencyRequests/Index', [
            'requests' => $requests
        ]);
    }
}