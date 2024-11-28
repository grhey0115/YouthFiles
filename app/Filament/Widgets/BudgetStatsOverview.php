<?php  
  
namespace App\Filament\Widgets;  
  
use Filament\Widgets\StatsOverviewWidget as BaseWidget;  
use Filament\Widgets\StatsOverviewWidget\Stat;  
use App\Models\Budget;  
use Illuminate\Support\Facades\DB;  
use Carbon\Carbon;  
  
class BudgetStatsOverview extends BaseWidget  
{  
   protected static ?int $sort = 3;  
  
   protected function getStats(): array  
   {  
      // Budgets created per month for the current year  
      $budgetCounts = Budget::query()  
        ->whereYear('created_at', now()->year)  
        ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))  
        ->groupBy('month')  
        ->orderBy('month')  
        ->pluck('count', 'month');  
  
      // Prepare data for the chart  
      $chartData = [];  
      foreach (range(1, 12) as $month) {  
        $chartData[] = $budgetCounts->get($month, 0);  
      }  
  
      // Comprehensive budget statistics  
      $budgetStats = Budget::selectRaw('  
        COUNT(*) as total_budgets,  
        SUM(total_amount) as total_budget_amount,  
        COUNT(CASE WHEN created_at >= ? THEN 1 END) as new_budgets_this_month  
      ', [Carbon::now()->startOfMonth()])  
      ->first();  
  
      // Calculate total disbursed amount  
      $totalDisbursed = Budget::with('projects.disbursements')  
        ->get()  
        ->flatMap(function ($budget) {  
           return $budget->projects->flatMap->disbursements;  
        })  
        ->sum('disbursed_amount');  
  
      // Calculate total remaining balance  
      $totalRemainingBalance = $budgetStats->total_budget_amount - $totalDisbursed;  
  
      return [  
        Stat::make('Total Budgets', $budgetStats->total_budgets)  
           ->description('All Created Budgets')  
           ->descriptionIcon('heroicon-m-briefcase')  
           ->chart($chartData)  
           ->color('success')  
           ->url(route('filament.admin.resources.budgets.index')),  
  
        Stat::make('Total Budget Amount', '₱' . number_format($budgetStats->total_budget_amount, 2))  
           ->description('Total Amount of All Budgets')  
           ->descriptionIcon('heroicon-m-currency-dollar')  
           ->color('primary'),  
  
        Stat::make('New Budgets', $budgetStats->new_budgets_this_month)  
           ->description('This Month')  
           ->descriptionIcon('heroicon-m-arrow-trending-up')  
           ->color('info'),  
  
        Stat::make('Total Disbursed', '₱' . number_format($totalDisbursed, 2))  
           ->description('Total Amount Disbursed')  
           ->descriptionIcon('heroicon-m-minus-circle')  
           ->color('danger'),  
  
        Stat::make('Total Remaining Balance', '₱' . number_format($totalRemainingBalance, 2))  
           ->description('Total Remaining Balance')  
           ->descriptionIcon('heroicon-m-plus-circle')  
           ->color('success'),  
      ];  
   }  
}
