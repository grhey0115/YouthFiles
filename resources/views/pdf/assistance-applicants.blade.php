<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Assistance Applicants for {{ $ayuda->title }}</title> <!-- Use Ayuda title -->
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1>Assistance Applicants for {{ $ayuda->title }}</h1> <!-- Use Ayuda title -->
    <table>
        <thead>
            <tr>
                <th>Applicant Name</th>
                <th>Aid Received</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($applicants as $applicant)
                <tr>
                    <td>{{ $applicant->user->last_name }}, {{ $applicant->user->first_name }}</td>
                    <td>{{ $applicant->aid_received }}</td>
                    <td>{{ $applicant->payment_method }}</td>
                    <td>{{ ucfirst($applicant->payment_status) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
