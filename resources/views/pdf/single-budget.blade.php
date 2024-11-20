<!DOCTYPE html>
<html>
<head>
    <title>Budget Details - {{ $budget->budget_id }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .summary { margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Budget Details</h1>
    
    <table>
        <tr>
            <th>Budget ID</th>
            <td>{{ $budget->budget_id }}</td>
        </tr>
        <tr>
            <th>Budget Name</th>
            <td>{{ $budget->name }}</td>
        </tr>
        <tr>
            <th>Total Budget Amount</th>
            <td>₱ {{ number_format($budget->total_amount, 2) }}</td>
        </tr>
        <tr>
            <th>Start Date</th>
            
        </tr>
        <tr>
            <th>End Date</th>
           
        </tr>
    </table>

    <h2>Budget Summary</h2>
    <table class="summary">
        <tr>
            <th>Total Projects</th>
            <td>{{ $totalProjects }}</td>
        </tr>
        <tr>
            <th>Total Allocated to Projects</th>
            <td>₱ {{ number_format($totalAllocated, 2) }}</td>
        </tr>
        <tr>
            <th>Total Disbursed</th>
            <td>₱ {{ number_format($totalDisbursed, 2) }}</td>
        </tr>
        <tr>
            <th>Remaining Balance</th>
            <td>₱ {{ number_format($remainingBalance, 2) }}</td>
        </tr>
    </table>

    <h2>Projects</h2>
    @if($projects->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Total Budget</th>
                    <th>Disbursed Amount</th>
                    <th>Remaining Budget</th>
                </tr>
            </thead>
            <tbody>
                @foreach($projects as $project)
                    <tr>
                        <td>{{ $project->name }}</td>
                        <td>₱ {{ number_format($project->total_budget, 2) }}</td>
                        <td>₱ {{ number_format($project->disbursements->sum('disbursed_amount'), 2) }}</td>
                        <td>₱ {{ number_format($project->total_budget - $project->disbursements->sum('disbursed_amount'), 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>No projects found for this budget.</p>
    @endif
</body>
</html>