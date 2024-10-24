<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;
use App\Models\User;

class ProjectController extends Controller
{
    public function index()
    {
        // Fetch all projects
        $projects = Project::all();

        // Pass projects data to the Inertia page
        return Inertia::render('Projects', [
            'projects' => $projects,
            'auth' => auth()->user(),
        ]);
    }

    public function show($id)
    {
        // Fetch the project with related procurements and disbursements using eager loading
        $project = Project::with(['procurements', 'disbursements'])->findOrFail($id);

        return Inertia::render('ProjectShow', [
            'project' => $project,
            'auth' => auth()->user(), // Pass the authenticated user
        ]);
    }
}