<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use ShuvroRoy\FilamentSpatieLaravelHealth\FilamentSpatieLaravelHealthPlugin;
use ShuvroRoy\FilamentSpatieLaravelBackup\FilamentSpatieLaravelBackupPlugin;
use Afsakar\FilamentOtpLogin\FilamentOtpLoginPlugin;
use Leandrocfe\FilamentApexCharts\FilamentApexChartsPlugin;
use Saade\FilamentFullCalendar\FilamentFullCalendarPlugin;
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use Filament\Navigation\MenuItem;
use pxlrbt\FilamentSpotlight\SpotlightPlugin;


class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->globalSearch(true)
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                \BezhanSalleh\FilamentGoogleAnalytics\Widgets\PageViewsWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
                \Hasnayeen\Themes\Http\Middleware\SetTheme::class,
            ])
            ->authMiddleware([
                Authenticate::class,
                
            ])

            ->unsavedChangesAlerts()
            ->databaseTransactions()

            ->plugins([
                \BezhanSalleh\FilamentShield\FilamentShieldPlugin::make(),
                \Hasnayeen\Themes\ThemesPlugin::make(),
                FilamentSpatieLaravelHealthPlugin::make(),
               // ->closeByEscaping(enabled: false)
               FilamentApexChartsPlugin::make(),
               FilamentFullCalendarPlugin::make(),
               FilamentOtpLoginPlugin::make(),
               SpotlightPlugin::make(),
               GlobalSearchModalPlugin::make(),
               \BezhanSalleh\FilamentGoogleAnalytics\FilamentGoogleAnalyticsPlugin::make(),
               \DiscoveryDesign\FilamentGaze\FilamentGazePlugin::make(),
             
            ])

            ->databaseNotifications()
       

            ->navigationGroups([
                'User Management',
                'Events',
                'Ayuda',
                'Project Expenditure',
                'Rewards Management',
                'Community Services',
                'Financial Services',
            
                
            ])
            ->userMenuItems([
                MenuItem::make()
                   
                // ...
            ])

            ->brandName('Youthfiles - Admin ')

            ->favicon(asset('logo11.png'))
            

            ->resources([
                config('filament-logger.activity_resource')
            ]);
    }
}
