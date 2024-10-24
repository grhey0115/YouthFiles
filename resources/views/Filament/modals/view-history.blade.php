<div style="overflow:auto; max-height: 24rem;">
    <table style="min-width: 100%; background-color: white; color: black;">
        <thead>
            <tr>
                <th style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">Date</th>
                <th style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">Assistance Title</th>
                <th style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">Status</th>
                <th style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">Aid Received</th>
                <th style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">Payment Method</th>
                <th style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">Payment Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($history as $record)
                <tr>
                    <td style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">{{ $record->created_at->format('Y-m-d H:i') }}</td>
                    <td style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">{{ $record->ayuda_title }}</td>
                    <td style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">{{ $record->status }}</td>
                    <td style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">{{ $record->aid_received }}</td>
                    <td style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">{{ $record->payment_method }}</td>
                    <td style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">{{ $record->payment_status }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="padding: 0.5rem; border-bottom: 1px solid black; color: black;">No history available.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>
