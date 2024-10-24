<?php

namespace App\Filament\Resources\UsersResource\Pages;

use App\Filament\Resources\UsersResource;
use pxlrbt\FilamentActivityLog\Pages\ListActivities;
use Filament\Resources\Pages\Page;

class Activities extends ListActivities
{
    protected static string $resource = UsersResource::class;

    protected static string $view = 'filament.resources.users-resource.pages.activities';
}
