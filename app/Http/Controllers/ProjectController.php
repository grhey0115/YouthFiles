<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProjectController extends Controller
{
    public function index()
    {
        try {
            // Fetch all projects with necessary relationships
            $allProjects = Project::with(['budget', 'procurements', 'disbursements'])->get();

            // Filter ongoing projects
            $ongoingProjects = $allProjects->filter(function ($project) {
                return strtolower($project->status) === 'ongoing';
            });

            // Filter completed projects
            $completedProjects = $allProjects->filter(function ($project) {
                return strtolower($project->status) === 'completed';
            });

            // Get project statistics
            $statistics = [
                'total' => $allProjects->count(),
                'ongoing' => $ongoingProjects->count(),
                'completed' => $completedProjects->count(),
                'total_budget' => $allProjects->sum('total_budget'),
                'on_hold' => $allProjects->where('status', 'on_hold')->count(),
                'draft' => $allProjects->where('status', 'draft')->count(),
            ];

            return Inertia::render('Projects', [
                'ongoingProjects' => $ongoingProjects->map(function ($project) {
                    return $this->formatProjectData($project);
                })->values(), // Ensure the collection is re-indexed
                'completedProjects' => $completedProjects->map(function ($project) {
                    return $this->formatProjectData($project);
                })->values(), // Ensure the collection is re-indexed
                'statistics' => $statistics,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Projects', [
                'ongoingProjects' => [],
                'completedProjects' => [],
                'statistics' => [
                    'total' => 0,
                    'ongoing' => 0,
                    'completed' => 0,
                    'total_budget' => 0,
                ],
                'error' => 'Failed to load projects. Please try again later.'
            ]);
        }
    }

    private function formatProjectData($project)
    {
        return [
            'id' => $project->id,
            'name' => $project->name,
            'description' => $project->description,
            'status' => $project->status,
            'start_date' => $project->start_date,
            'end_date' => $project->end_date,
            'header_image' => $project->header_image,
            'total_budget' => $project->total_budget,
            'remaining_budget' => $project->remaining_budget,
            'project_duration' => $project->project_duration,
            'created_at' => $project->created_at,
            'budget' => [
                'name' => $project->budget->name ?? null,
                'fiscal_year' => $project->budget->fiscal_year ?? null,
            ],
            'progress' => $this->calculateProgress($project),
            'disbursements_count' => $project->disbursements->count(),
            'procurements_count' => $project->procurements->count(),
        ];
    }

    private function calculateProgress(Project $project)
    {
        if ($project->status === 'completed') {
            return 100;
        }

        if ($project->status === 'draft' || $project->status === 'on_hold') {
            return 0;
        }

        // Calculate progress based on dates for ongoing projects
        $startDate = Carbon::parse($project->start_date);
        $endDate = Carbon::parse($project->end_date);
        $now = Carbon::now();

        if ($now->gt($endDate)) {
            return 100;
        }

        $totalDuration = $startDate->diffInDays($endDate);
        $elapsed = $startDate->diffInDays($now);

        return min(100, round(($elapsed / $totalDuration) * 100));
    }
    public function show($id)
    {
        $project = Project::with([
            'procurements.procurementItems', // Make sure this relationship is properly loaded
            'disbursements',
            'budget'
        ])->findOrFail($id);

        return Inertia::render('ProjectShow', [
            'project' => array_merge($project->toArray(), [
                'progress' => $this->calculateProgress($project),
                'remaining_budget' => $project->remaining_budget,
                'project_duration' => $project->project_duration,
                'total_procurements' => $project->procurements->sum('procurement_cost'),
                'total_disbursements' => $project->disbursements->sum('disbursed_amount'),
                'total_items' => $project->procurements->flatMap->procurementItems->count(),
            ])
        ]);
    }
}