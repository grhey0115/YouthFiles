<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Approved Applicants for {{ $ayuda->title }}</title>
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
        header {
            text-align: center;
            margin-bottom: 20px;
        }
        img {
            width: 100px; /* Adjust width based on your logo size */
            margin-bottom: 10px;
        }
        h1 {
            margin-top: 0;
            font-size: 24px;
        }
    </style>
</head>
<body>

    <header>
        <img src="{{ asset('logo11.png') }}" alt="Logo">
        <h1>Approved Applicants for {{ $ayuda->title }}</h1>
    </header>

    <table>
        <thead>
            <tr>
                <th>Applicant Name</th>
                <th>Aid Received</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Assistance Received</th>
            </tr>
        </thead>
        <tbody>
            @foreach($applicants as $applicant)
                <tr>
                    <td>{{ $applicant->user->last_name }}, {{ $applicant->user->first_name }}</td>
                    <td>{{ $applicant->aid_received }}</td>
                    <td>{{ $applicant->payment_method }}</td>
                    <td>{{ ucfirst($applicant->payment_status) }}</td>
                    <td>{{ ucfirst($applicant->assistance_received) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
