<!-- resources/views/filament/modals/view-assistance-info.blade.php -->

<div>
    <h3>Assistance Information</h3>

    <table class="min-w-full divide-y divide-gray-200">
        <thead>
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ayuda Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aid Received</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received At</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($ayudas as $ayuda)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">{{ $ayuda->ayuda->title }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ $ayuda->aid_received }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ $ayuda->payment_method }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ $ayuda->payment_status }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ $ayuda->received_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
