@props(['files'])

<!-- Modal Content -->
<div class="p-4">
    <h5 class="text-lg font-semibold mb-4">Uploaded Files</h5>
    @if($files->count() > 0)
        <ul class="space-y-4">
            @foreach ($files as $file)
                <li class="border rounded-lg p-4 bg-gray-50">
                    @php
                        $fileUrl = Storage::url($file->file_path);
                        $fileExtension = strtolower(pathinfo($file->file_path, PATHINFO_EXTENSION));
                    @endphp

                    @if (in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif']))
                        <!-- Render Image -->
                        <div class="mb-2">
                            <p class="text-sm font-medium text-gray-600 mb-2">
                                {{ $file->requirement->requirement_name }}
                            </p>
                            <img 
                                src="{{ $fileUrl }}" 
                                alt="{{ $file->requirement->requirement_name }}" 
                                class="max-w-full h-auto rounded-md shadow-md"
                            >
                        </div>
                    @elseif ($fileExtension === 'pdf')
                        <!-- Render PDF Link -->
                        <div>
                            <a 
                                href="{{ $fileUrl }}" 
                                target="_blank" 
                                class="text-primary-600 hover:underline flex items-center"
                            >
                                <x-heroicon-o-document-text class="w-5 h-5 mr-2"/>
                                View PDF: {{ $file->requirement->requirement_name }}
                            </a>
                        </div>
                    @else
                        <!-- Render Generic File Link -->
                        <div>
                            <a 
                                href="{{ $fileUrl }}" 
                                target="_blank" 
                                class="text-primary-600 hover:underline flex items-center"
                            >
                                <x-heroicon-o-document class="w-5 h-5 mr-2"/>
                                Download File: {{ $file->requirement->requirement_name }}
                            </a>
                        </div>
                    @endif
                </li>
            @endforeach
        </ul>
    @else
        <div class="text-center text-gray-500 py-4">
            No files uploaded
        </div>
    @endif
</div>