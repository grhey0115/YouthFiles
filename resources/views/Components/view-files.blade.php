@props(['files'])

<!-- Modal Content -->
<div>
    <h5>Uploaded Files</h5>
    <ul>
        @foreach ($files as $file)
            <li>
                @php
                    $fileUrl = Storage::url($file->file_path);
                    $fileExtension = pathinfo($file->file_path, PATHINFO_EXTENSION);
                @endphp

                @if (in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif']))
                    <!-- Render Image -->
                    <img src="{{ $fileUrl }}" alt="{{ $file->requirement->requirement_name }}" style="max-width: 100%; height: auto; margin-bottom: 10px;">
                @elseif ($fileExtension === 'pdf')
                    <!-- Render PDF Link -->
                    <a href="{{ $fileUrl }}" target="_blank" style="color: blue; text-decoration: underline;">
                        View PDF: {{ $file->requirement->requirement_name }}
                    </a>
                @else
                    <!-- Render Generic File Link -->
                    <a href="{{ $fileUrl }}" target="_blank" style="color: blue; text-decoration: underline;">
                        Download File: {{ $file->requirement->requirement_name }}
                    </a>
                @endif
            </li>
        @endforeach
    </ul>
</div>