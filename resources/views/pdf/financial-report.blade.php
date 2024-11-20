<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Financial Report</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
    </style>
</head>
<body>
    <h2>Financial Report</h2>
    <table>
        <thead>
            <tr>
                <th>Budget ID</th>
                <th>Budget Name</th>
                <th>Total Budget (₱)</th>
                <th>Total Allocated to Projects (₱)</th>
                <th>Total Disbursed (₱)</th>
                <th>Remaining Balance (₱)</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($budgets as $budget)
                <tr>
                    <td>{{ $budget['Budget ID'] }}</td>
                    <td>{{ $budget['Budget Name'] }}</td>
                    <td>{{ number_format($budget['Total Budget'], 2) }}</td>
                    <td>{{ number_format($budget['Total Allocated to Projects'], 2) }}</td>
                    <td>{{ number_format($budget['Total Disbursed'], 2) }}</td>
                    <td>{{ number_format($budget['Remaining Balance'], 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
