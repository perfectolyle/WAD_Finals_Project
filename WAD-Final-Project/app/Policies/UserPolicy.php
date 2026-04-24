<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine if the user can view another user's profile.
     */
    public function view(User $currentUser, User $user): bool
    {
        return $currentUser->isAdmin() || $currentUser->id === $user->id;
    }

    /**
     * Determine if the user can update another user's profile.
     */
    public function update(User $currentUser, User $user): bool
    {
        return $currentUser->isAdmin() || $currentUser->id === $user->id;
    }
}
