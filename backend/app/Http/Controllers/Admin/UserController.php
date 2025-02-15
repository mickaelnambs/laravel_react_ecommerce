<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index(): View
    {
        return view('admin.users.index')->with([
            'users' => User::latest()->get()
        ]);
    }

    public function delete(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('admin.users.index')->with([
            'success' => 'User has been deleted successfully'
        ]);
    }
}
