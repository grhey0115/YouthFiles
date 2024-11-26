<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Participation</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <style>
        @page {
            size: {{ $event->certificate_orientation === 'landscape' ? 'landscape' : 'portrait' }};
        }
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: {{ $event->certificate_theme ?? '#f2f2f2' }};
        }
        .certificate {
            width: 90vw;
            height: 95vh;
            background-image: url('{{ storage_path('app/public/' . $event->header_image) }}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border: 8px double {{ $event->certificate_primary_color ?? '#006699' }};
            box-shadow: 0 0 30px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2.5rem;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }
        .certificate-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255,0.6);
            z-index: 1;
        }
        .certificate-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            text-align: center;
        }
        .header {
            text-align: center;
            margin-bottom: 1rem;
        }
        .header-logo {
            height: 120px;
            margin-bottom: 1rem;
        }
        .certificate-header {
            font-family: 'Playfair Display', serif;
            color: {{ $event->certificate_primary_color ?? '#006699' }};
            font-size: 2.5em;
            font-weight: 700;
            text-transform: uppercase;
            margin: 0;
        }
        .certificate-body {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .certification-text {
            font-size: 1.2em;
            font-weight: 600;
            color: #333;
            margin-bottom: 1rem;
        }
        .participant-name {
            font-family: 'Playfair Display', serif;
            font-size: 3em;
            font-weight: 700;
            color: {{ $event->certificate_secondary_color ?? '#004466' }};
            margin: 1rem 0;
        }
        .signatories-table {
            width: 100%; /* Full width of the container */
            margin-top: 2rem; /* Add spacing above the table */
            border-collapse: collapse; /* Remove gaps between table cells */
        }
        .signatories-table td {
            text-align: center; /* Center-align all content */
            vertical-align: top; /* Align content to the top */
            padding: 1rem; /* Add spacing inside each cell */
        }
        .signatory-signature {
            width: auto;
            max-width: 150px; /* Adjust the maximum width of the signature */
            height: auto;
            margin-bottom: 0.5rem; /* Add spacing below the signature */
        }
        .signature-line {
            width: 100%; /* Full width of the block */
            height: 1px; /* Thin line */
            background-color: #000; /* Black line */
            margin: 0.5rem 0; /* Spacing above and below the line */
        }
        .signatory-name {
            font-weight: 600;
            font-size: 1em;
            margin: 0.5rem 0 0; /* Add spacing above the name */
        }
        .signatory-role {
            font-size: 0.9em;
            color: black;
            margin-top: 0.2rem; /* Add spacing above the role */
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="certificate-overlay"></div>
        <div class="certificate-content">
            <div class="header">
                <img src="{{ storage_path('app/public/logo.png') }}" alt="Event Logo" class="header-logo">
                <h1 class="certificate-header">Certificate of Participation</h1>
            </div>
            <div class="certificate-body">
                <p class="certification-text">This is to certify that</p>
                <h2 class="participant-name">{{ $name }}</h2>
                <p>has actively participated in the event "{{ $event->name }}"</p>
                <p>held at the "{{ $event->location }}" on {{ $event->start_time->format('F j, Y') }}.</p>
            </div>
            <table class="signatories-table">
                <tr>
                    @foreach ($event->certificateSignatories as $signatory)
                    <td>
                        <img src="{{ storage_path('app/public/' . $signatory->signature_path) }}" alt="{{ $signatory->name }}'s Signature" class="signatory-signature">
                        <div class="signature-line"></div>
                        <p class="signatory-name">{{ $signatory->name }}</p>
                        <p class="signatory-role">{{ $signatory->role }}</p>
                    </td>
                    @endforeach
                </tr>
            </table>
        </div>
    </div>
</body>
</html>