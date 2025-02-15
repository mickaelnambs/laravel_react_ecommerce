<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class OrderController extends Controller
{
    public function index(): View
    {
        $orders = Order::with(['products', 'user', 'coupon'])->latest()->get();

        return view('admin.orders.index')->with([
            'orders' => $orders
        ]);
    }

    public function updateDeliveredAtDate(Order $order): RedirectResponse
    {
        $order->update([
            'delivered_at' => Carbon::now()
        ]);

        return redirect()->route('admin.orders.index')->with([
            'success' => 'Order updated successfully'
        ]);
    }

    public function delete(Order $order): RedirectResponse
    {
        $order->delete();

        return redirect()->route('admin.orders.index')->with([
            'success' => 'Order deleted successfully'
        ]);
    }
}
