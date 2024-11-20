<html>
<head>
    <style>
        /* Add certificate styling here */
    </style>
</head>
<body>
    <h1>Certificate of Participation</h1>
    <p>This certifies that</p>
    <h2>{{ $name }}</h2>
    <p>participated the event "{{ $event->name }}" on {{ $event->start_time->format('F j, Y') }}.</p>
</body>
</html>