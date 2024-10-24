<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define roles
        $roles = [
            'Super Admin',
            'Panel User',
            'General User', // Add the General User role
        ];

        // Create roles
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Define permissions
        $permissions = [
            'manage users',
            'manage roles',
            'manage events',
            'access admin panel', // Specific permission for admin access
            // Add more permissions as needed
        ];

        // Create permissions
        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        // Assign all permissions to the Super Admin role
        $superAdminRole = Role::findByName('Super Admin');
        $superAdminRole->givePermissionTo(Permission::all());

        // Assign specific permissions to the Panel User role
        $panelUserRole = Role::findByName('Panel User');
        $panelUserRole->givePermissionTo(['access admin panel']);

        // General User role does not get any special permissions
    }
}
