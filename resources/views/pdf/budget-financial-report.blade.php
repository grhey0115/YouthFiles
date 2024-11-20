<!DOCTYPE html>
<html>
<head>
    <title>Budget Financial Report</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
    </style>
</head>
<body>
    <h1>Budget Financial Report</h1>
    
    <h2>Budget Details</h2>
    <table>
        @foreach($data['budget'] as $key => $value)
            <tr>
                <td>{{ $key }}</td>
                <td>{{ $value }}</td>
            </tr>
        @endforeach
    </table>

    <h2>Projects</h2>
    @foreach($data['projects'] as $project)
        <h3>Project Details</h3>
        <table>
            @foreach($project['project_details'] as $key => $value)
                <tr>
                    <td>{{ $key }}</td>
                    <td>{{ $value }}</td>
                </tr>
            @endforeach
        </table>

        <h3>Disbursements</h3>
        <table>
            <thead>
                <tr>
                    @foreach(array_keys($project['disbursements'][0] ?? []) as $header)
                        <th>{{ $header }}</th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @foreach($project['disbursements'] as $disbursement)
                    <tr>
                        @foreach($disbursement as $value)
                            <td>{{ $value }}</td>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    <h2>Summary</h2>
    <table>
        @foreach($data['summary'] as $key => $value)
            <tr>
                <td>{{ $key }}</td>
                <td>{{ $value }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>