{{-- resources/views/filament/modals/view-files.blade.php --}}


<div>
    <h2 class="text-xl font-bold mb-4">Uploaded Files</h2>
    @if($files->isEmpty())
        <p>No files uploaded.</p>
    @else
        <ul class="list-disc pl-5">
            @foreach($files as $file)
                <li class="mb-2">
                    <strong>{{ optional($file->requirement)->requirement_name ?? 'Requirement' }}:</strong>
                    @php
                        $fileName = basename($file->file_path);
                        $url = asset('storage/uploads/' . $fileName);
                    @endphp
                    <!-- Debugging Info -->
                    {{-- <p>File Path: {{ $file->file_path }}</p>
                    <p>URL: {{ $url }}</p> --}}
                    <!-- Display the image or link -->
                    @php
                        $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                    @endphp
                    @if(in_array(strtolower($fileExtension), ['jpg', 'jpeg', 'png', 'gif']))
                        <div class="mt-2">
                            <img src="{{ $url }}" alt="Uploaded Image" class="max-w-full h-auto border">
                        </div>
                    @else
                        <a href="{{ $url }}" target="_blank" class="text-blue-500 underline">
                            View Document ({{ strtoupper($fileExtension) }})
                        </a>
                    @endif
                </li>
            @endforeach
        </ul>
    @endif
</div>
