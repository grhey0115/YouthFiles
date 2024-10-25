<!-- resources/views/pdf/event-participants.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $event->name }} - Participants List</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            margin: 0;
            padding: 0;
        }
        header {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            margin-bottom: 30px;
        }
        header h1 {
            margin: 0;
            font-size: 24px;
        }
        header h3 {
            margin: 5px 0 0 0;
            font-size: 18px;
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            margin: 0 auto;
        }
        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            word-wrap: break-word;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        tbody tr:nth-child(even) {
            background-color: #fafafa;
        }
        /* Additional styling */
        .status-present {
            color: green;
            font-weight: bold;
        }
        .status-absent {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>

<header>
    <h1>{{ $event->name }}</h1>
    <h3>The Participants List</h3>
</header>

<table>
    <thead>
        <tr>
            <th style="width: 30%;">Name</th>
            <th style="width: 40%;">Email</th>
            <th style="width: 30%;">Attendance Status</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($participants as $participant)
        <tr>
            <td>{{ $participant->last_name }}, {{ $participant->first_name }} {{ $participant->middle_name ?? '' }}</td>
            <td>{{ $participant->email }}</td>
            <td class="status-{{ strtolower($participant->attendance_status) }}">
                {{ ucfirst($participant->attendance_status) }}
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

</body>
</html>
