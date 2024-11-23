<?php

namespace App\Http\Controllers;

use App\Models\TanodRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Storage;

class TanodRequestController extends Controller
{
    public function create()
    {
        return view('tanod_requests.create'); // Return a view for creating a request
    }

    public function store(Request $request)
{
    $request->validate([
        'contact' => 'required|string|max:15',
        'details' => 'required|string',
        'request_letter' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048', // Validate file upload
        'place' => 'required|string|max:255',
    ]);

    // Handle file upload to public disk in the request_letters directory
    $path = $request->file('request_letter')->store('request_letters', 'public');

    // Create a new Tanod request
    TanodRequests::create([
        'user_id' => Auth::id(), 
        'contact' => $request->contact,
        'details' => $request->details,
        'request_letter' => $path, // This will now be like 'request_letters/filename'
        'place' => $request->place,
    ]);

    return redirect()->route('tanod.requests.index')->with('success', 'Tanod request submitted successfully.');
}

    public function index()
    {
        $requests = TanodRequests::with('user')->where('user_id', Auth::id())->get();
        return Inertia::render('HelpCenter');
    }

    // Additional methods for showing, editing, and deleting requests can be added here
}