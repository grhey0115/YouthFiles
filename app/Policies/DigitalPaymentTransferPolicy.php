<?php

namespace App\Policies;

use App\Models\User;
use App\Models\DigitalPaymentTransfer;
use Illuminate\Auth\Access\HandlesAuthorization;

class DigitalPaymentTransferPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view_any_digital::payment::transfer');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, DigitalPaymentTransfer $digitalPaymentTransfer): bool
    {
        return $user->can('view_digital::payment::transfer');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create_digital::payment::transfer');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, DigitalPaymentTransfer $digitalPaymentTransfer): bool
    {
        return $user->can('update_digital::payment::transfer');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, DigitalPaymentTransfer $digitalPaymentTransfer): bool
    {
        return $user->can('delete_digital::payment::transfer');
    }

    /**
     * Determine whether the user can bulk delete.
     */
    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_digital::payment::transfer');
    }

    /**
     * Determine whether the user can permanently delete.
     */
    public function forceDelete(User $user, DigitalPaymentTransfer $digitalPaymentTransfer): bool
    {
        return $user->can('force_delete_digital::payment::transfer');
    }

    /**
     * Determine whether the user can permanently bulk delete.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->can('force_delete_any_digital::payment::transfer');
    }

    /**
     * Determine whether the user can restore.
     */
    public function restore(User $user, DigitalPaymentTransfer $digitalPaymentTransfer): bool
    {
        return $user->can('restore_digital::payment::transfer');
    }

    /**
     * Determine whether the user can bulk restore.
     */
    public function restoreAny(User $user): bool
    {
        return $user->can('restore_any_digital::payment::transfer');
    }

    /**
     * Determine whether the user can replicate.
     */
    public function replicate(User $user, DigitalPaymentTransfer $digitalPaymentTransfer): bool
    {
        return $user->can('replicate_digital::payment::transfer');
    }

    /**
     * Determine whether the user can reorder.
     */
    public function reorder(User $user): bool
    {
        return $user->can('reorder_digital::payment::transfer');
    }
}
