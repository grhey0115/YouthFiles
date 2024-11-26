<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate Preview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 20px;
            background-image: url('{{ asset('storage/' . $background_image) }}');
            background-size: cover;
        }
        .certificate {
            border: 5px solid #000;
            padding: 50px;
            background-color: rgba(255, 255, 255, 0.8);
            width: 80%;
            margin: auto;
        }
        .title {
            font-size: 36px;
            font-weight: bold;
        }
        .description {
            font-size: 24px;
            margin: 20px 0;
        }
        .signature {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .signature img {
            width: 150px;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <h1 class="title">{{ $title }}</h1>
        <p class="description">{{ $description }}</p>
        <div class="signature">
            @foreach ($signatures as $signature)
                <div>
                    @if ($signature->signature_image)
                        <img src="{{ asset('storage/' . $signature->signature_image) }}" alt="{{ $signature->name }} Signature">
                    @endif
                    <p>{{ $signature->name }}</p>
                    <p>{{ $signature->role }}</p>
                </div>
            @endforeach
        </div>
    </div>
</body>
</html>