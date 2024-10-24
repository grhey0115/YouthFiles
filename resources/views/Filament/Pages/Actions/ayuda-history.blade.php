<!-- resources/views/filament/pages/actions/ayuda-history.blade.php -->
<x-filament::card>
    <x-filament::form>
        <x-filament::grid>
            <!-- Replace with your actual data structure -->
            @foreach ($ayudaHistory as $history)
                <x-filament::grid.col span="1">
                    <x-filament::text>
                        <strong>Ayuda Title:</strong> {{ $history['ayuda_title'] }}
                    </x-filament::text>
                    <x-filament::text>
                        <strong>Status:</strong> {{ $history['status'] }}
                    </x-filament::text>
                    <x-filament::text>
                        <strong>Date Applied:</strong> {{ $history['created_at'] }}
                    </x-filament::text>
                </x-filament::grid.col>
            @endforeach
        </x-filament::grid>
    </x-filament::form>
</x-filament::card>
