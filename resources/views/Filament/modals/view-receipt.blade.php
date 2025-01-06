{{-- resources/views/filament/modals/view-receipt.blade.php --}}

<div class="p-4">
    <h2 class="text-lg font-semibold">Receipt for Payment #{{ $payment->reference_number }}</h2>
    <div class="mt-4">
        @php
            // The 'receipt_image' is like 'uploads/receipts/filename.extension' from the DB
            $receiptImageUrl = asset('storage/' . $payment->receipt_image); // Prepend 'storage/'
        @endphp

        

        @php
            $imageExtension = pathinfo($payment->receipt_image, PATHINFO_EXTENSION);
        @endphp

        @if(in_array(strtolower($imageExtension), ['jpg', 'jpeg', 'png', 'gif']))
            <div class="mt-2">
                <img src="{{ $receiptImageUrl }}" alt="Receipt Image" class="max-w-full h-auto border" />
            </div>
        @else
            <a href="{{ $receiptImageUrl }}" target="_blank" class="text-blue-500 underline">
                View Receipt ({{ strtoupper($imageExtension) }})
            </a>
        @endif
    </div>

    <div class="mt-4">
        <p><strong>Amount:</strong> ₱{{ number_format($payment->amount, 2) }}</p>
        <p><strong>Status:</strong> {{ $payment->status }}</p>
        <p><strong>Payment Date:</strong> {{ $payment->created_at->format('Y-m-d H:i') }}</p>
    </div>
</div>
