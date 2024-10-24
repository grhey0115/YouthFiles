<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\CertificateRequests;


class DocumentRequestController extends Controller
{
    public function create()
{
    $user = Auth::user();
    $user->load('personalInformation');

    return Inertia::render('SKDocumentRequestForm', [
        'user' => [
            'first_name' => $user->first_name,
            'middle_name' => $user->middle_name,
            'last_name' => $user->last_name,
            'personal_information' => $user->personalInformation ? [
                'gender' => $user->personalInformation->gender,
                'sitio' => $user->personalInformation->sitio,
                'date_of_birth' => $user->personalInformation->date_of_birth,
            ] : null,
            'contact_number' => $user->phone_number,
            'email' => $user->email,
            'unread_notifications_count' => $user->unread_notifications_count,
        ],
        'auth' => auth()->user(),
    ]);
}
   
   
public function store(Request $request)
{
    $validatedData = $request->validate([
        'user_id' => 'required|exists:users,id',
        'fullName' => 'required|string',
        'dateOfBirth' => 'required|date',
        'gender' => 'required|string',
        'address' => 'required|string',
        'contactNumber' => 'required|string',
        'email' => 'required|email',
        'documentType' => 'required|string',
        'numberOfCopies' => 'required|integer',
        'purpose' => 'required|string',
        'deliveryMethod' => 'required|string',
        'paymentMethod' => 'required|string',
        'status' => 'required|string',
    ]);

    // Save the data to the database
    DocumentRequest::create($validatedData);

    return redirect()->route('some.route')->with('success', 'Document request submitted successfully.');
}
}
