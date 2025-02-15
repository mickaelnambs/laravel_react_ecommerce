<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthAdminRequest;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class AdminController extends Controller
{
    public function index(): View
    {
        $todayOrders = Order::whereDay('created_at', Carbon::today())->get();
        $yesterdayOrders = Order::whereDay('created_at', Carbon::yesterday())->get();
        $monthOrders = Order::whereMonth('created_at', Carbon::now()->month)->get();
        $yearOrders = Order::whereYear('created_at', Carbon::now()->year)->get();

        return view('admin.index')->with([
            'todayOrders' => $todayOrders,
            'yesterdayOrders' => $yesterdayOrders,
            'monthOrders' => $monthOrders,
            'yearOrders' => $yearOrders,
        ]);
    }

    public function login(): View|RedirectResponse
    {
        if (!auth()->guard('admin')->check()) {
            return view('admin.login');
        }

        return redirect()->route('admin.index');
    }

    public function auth(AuthAdminRequest $request): RedirectResponse
    {
        if ($request->validated()) {
            if (auth()->guard('admin')->attempt([
                'email' => $request->email,
                'password' => $request->password
            ])) {
                $request->session()->regenerate();

                return redirect()->route('admin.index');
            } else {
                return redirect()->route('admin.login')->with([
                    'error' => 'Invalid credentials'
                ]);
            }
        }
    }

    public function logout(): RedirectResponse
    {
        auth()->guard('admin')->logout();

        return redirect()->route('admin.login');
    }
}
