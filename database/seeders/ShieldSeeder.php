<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use BezhanSalleh\FilamentShield\Support\Utils;
use Spatie\Permission\PermissionRegistrar;

class ShieldSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $rolesWithPermissions = '[{"name":"panel_user","guard_name":"web","permissions":[]},{"name":"super_admin","guard_name":"web","permissions":[]}]';
        $directPermissions = '[{"name":"view_event","guard_name":"web"},{"name":"view_any_event","guard_name":"web"},{"name":"create_event","guard_name":"web"},{"name":"update_event","guard_name":"web"},{"name":"restore_event","guard_name":"web"},{"name":"restore_any_event","guard_name":"web"},{"name":"replicate_event","guard_name":"web"},{"name":"reorder_event","guard_name":"web"},{"name":"delete_event","guard_name":"web"},{"name":"delete_any_event","guard_name":"web"},{"name":"force_delete_event","guard_name":"web"},{"name":"force_delete_any_event","guard_name":"web"},{"name":"view_role","guard_name":"web"},{"name":"view_any_role","guard_name":"web"},{"name":"create_role","guard_name":"web"},{"name":"update_role","guard_name":"web"},{"name":"delete_role","guard_name":"web"},{"name":"delete_any_role","guard_name":"web"},{"name":"view_users","guard_name":"web"},{"name":"view_any_users","guard_name":"web"},{"name":"create_users","guard_name":"web"},{"name":"update_users","guard_name":"web"},{"name":"restore_users","guard_name":"web"},{"name":"restore_any_users","guard_name":"web"},{"name":"replicate_users","guard_name":"web"},{"name":"reorder_users","guard_name":"web"},{"name":"delete_users","guard_name":"web"},{"name":"delete_any_users","guard_name":"web"},{"name":"force_delete_users","guard_name":"web"},{"name":"force_delete_any_users","guard_name":"web"},{"name":"manage users","guard_name":"web"},{"name":"manage roles","guard_name":"web"},{"name":"manage events","guard_name":"web"},{"name":"access admin panel","guard_name":"web"}]';

        static::makeRolesWithPermissions($rolesWithPermissions);
        static::makeDirectPermissions($directPermissions);

        $this->command->info('Shield Seeding Completed.');
    }

    protected static function makeRolesWithPermissions(string $rolesWithPermissions): void
    {
        if (! blank($rolePlusPermissions = json_decode($rolesWithPermissions, true))) {
            /** @var Model $roleModel */
            $roleModel = Utils::getRoleModel();
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($rolePlusPermissions as $rolePlusPermission) {
                $role = $roleModel::firstOrCreate([
                    'name' => $rolePlusPermission['name'],
                    'guard_name' => $rolePlusPermission['guard_name'],
                ]);

                if (! blank($rolePlusPermission['permissions'])) {
                    $permissionModels = collect($rolePlusPermission['permissions'])
                        ->map(fn ($permission) => $permissionModel::firstOrCreate([
                            'name' => $permission,
                            'guard_name' => $rolePlusPermission['guard_name'],
                        ]))
                        ->all();

                    $role->syncPermissions($permissionModels);
                }
            }
        }
    }

    public static function makeDirectPermissions(string $directPermissions): void
    {
        if (! blank($permissions = json_decode($directPermissions, true))) {
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($permissions as $permission) {
                if ($permissionModel::whereName($permission)->doesntExist()) {
                    $permissionModel::create([
                        'name' => $permission['name'],
                        'guard_name' => $permission['guard_name'],
                    ]);
                }
            }
        }
    }
}
