<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PURCHASE REQUEST</title>
    <style>
        body { font-family: 'Times New Roman', serif; }
        table { width: 100%; border-collapse: collapse; table-layout: fixed;}
        th, td { padding: 8px; border: 1px solid #000; text-align: left; }
        th { background-color: #f2f2f2; }
        .header-table { margin-bottom: 20px; }
        .header-table td { border: none; }
        .total-row { font-weight: bold; }
        .signatures { margin-top: 30px; }
        .signatures div { float: left; width: 50%; }
        .signatures p { margin-bottom: 5px; }
        .underline { border-bottom: 1px solid #000; }

        h2 { text-align: center; font-size: 14pt; margin-bottom: 10px; font-weight: bold;}
        .header-table { width: 100%; table-layout: fixed; }
        .header-table td:first-child { width: 20%; font-weight: bold; font-size: 10pt;}
        .header-table td:nth-child(even) { width: 30%; font-size: 10pt; }
        .main-table { margin-top: 20px; }
        .main-table th, .main-table td { font-size: 10pt; }
        .main-table td:first-child { width: 10%; }
        .main-table td:nth-child(2) { width: 40%; }
        .main-table td:nth-child(3), .main-table td:nth-child(4), .main-table td:nth-child(5) { width: 16.66%; text-align: right; }
        .purpose { margin-top: 20px; font-size: 10pt; }
        .signatures { font-size: 10pt; }
        .signatures p { margin: 5px 0; }
    </style>
</head>
<body>

<h2>PURCHASE REQUEST</h2>

<table class="header-table">
    <tr>
        <td>Entity Name:</td>
        <td>SK BARANGAY CASAY</td>
        <td>Fund Cluster:</td>
        <td class="underline">{{ $procurement->project->name ?? 'N/A' }}</td>
    </tr>
    <tr>
        <td>PR No.:</td>
        <td class="underline">{{ $procurement->pr_no }}</td>
        <td>Date:</td>
        <td class="underline">{{ date('m/d/Y', strtotime($procurement->procurement_date)) }}</td>
    </tr>
</table>

<table class="main-table">
    <thead>
        <tr>
            <th>Item No.</th>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Unit Cost</th>
            <th>Total Cost</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($procurement->procurementItems as $index => $item)
        <tr>
            <td>{{ $index + 1 }}</td>
            <td>{{ $item->description }}</td>
            <td>{{ $item->quantity }}</td>
            <td>{{ number_format($item->unit_cost, 2) }}</td>
            <td>{{ number_format($item->total_cost, 2) }}</td>
        </tr>
        @endforeach
        <tr class="total-row">
            <td colspan="4">Total Amount</td>
            <td>{{ number_format($procurement->procurement_cost, 2) }}</td>
        </tr>
    </tbody>
</table>

<div class="purpose">
    <p>Purpose: <span class="underline">{{ $procurement->purpose }}</span></p>
</div>

<div class="signatures">
    <div>
        <p>Requested by:</p>
        <p>Signature: <span class="underline"></span></p>
        <p>Printed Name: <span class="underline">{{ $procurement->request_by }}</span></p>
        <p>Designation: <span class="underline">{{ $procurement->requestor_designation }}</span></p>
    </div>
    <div>
        <p>Approved by:</p>
        <p>Signature: <span class="underline"></span></p>
        <p>Printed Name: <span class="underline">{{ $procurement->approve_by }}</span></p>
        <p>Designation: <span class="underline">{{ $procurement->approver_designation }}</span></p>
    </div>
</div>

</body>
</html>