<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Project Disbursements Report</title>
    <style>
        body { 
            font-family: 'Times New Roman', serif; 
            font-size: 10pt;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 10pt;
        }
        .header-table { 
            margin-bottom: 20px; 
        }
        .header-table td { 
            border: none; 
            padding: 5pt;
        }
        th, td { 
            border: 1px solid #000; 
            padding: 8px; 
            text-align: left; 
        }
        .title {
            text-align: center;
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 15pt;
        }
        .total-row { 
            font-weight: bold; 
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="title">PROJECT DISBURSEMENTS REPORT</div>

    <table class="header-table">
        <tr>
            <td><strong>Budget Name:</strong> {{ $budget->name }}</td>
            <td><strong>Budget ID:</strong> {{ $budget->budget_id }}</td>
        </tr>
        <tr>
            <td><strong>Total Budget:</strong> ₱{{ number_format($budget->total_amount, 2) }}</td>
            <td><strong>Report Date:</strong> {{ now()->format('m/d/Y') }}</td>
        </tr>
    </table>

    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Project Name</th>
                <th>Disbursement Date</th>
                <th>Disbursed Amount</th>
                <th>Purpose</th>
            </tr>
        </thead>
        <tbody>
            @php $total = 0; @endphp
            @foreach($disbursements as $index => $disbursement)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $disbursement->project->name }}</td>
                <td>{{ $disbursement->date->format('m/d/Y') }}</td>
                <td class="text-right">₱{{ number_format($disbursement->disbursed_amount, 2) }}</td>
                <td>{{ $disbursement->purpose }}</td>
            </tr>
            @php $total += $disbursement->disbursed_amount; @endphp
            @endforeach
            <tr class="total-row">
                <td colspan="3" class="text-right">Total Disbursed</td>
                <td class="text-right">₱{{ number_format($total, 2) }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <div style="margin-top: 20pt;">
        <div>Prepared by: ____________________</div>
        <div>Date: ____________________</div>
    </div>
</body>
</html>