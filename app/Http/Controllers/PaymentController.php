<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api.paymongo.com/v1/links",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode([
                'data' => [
                    'attributes' => [
                        'amount' => $request->amount, // Amount in cents
                        'description' => $request->description,
                        'remarks' => $request->remarks,
                        'success_url' => route('events.show', $request->event_id), // Redirect to EventShow after payment
                        'failed_url' => route('events.show', $request->event_id), // Redirect to EventShow on failure
                    ]
                ]
            ]),
            CURLOPT_HTTPHEADER => [
                "accept: application/json",
                "authorization: Basic c2tfdGVzdF90ZWdUOHpyOFN0eFV3UThhUFFtNlI5TjU6Q2FtcGJhbGRvMDExNSQ=", // Replace with your API key
                "content-type: application/json"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            return response()->json(['error' => $err], 500);
        }

        $responseData = json_decode($response, true);
        $checkoutUrl = $responseData['data']['attributes']['checkout_url'];

        return response()->json(['checkout_url' => $checkoutUrl], 200);
    }

}
