<?php

namespace App\Http\Controllers\Admin;

use App\Models\Coupon;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\AddCouponRequest;
use App\Http\Requests\UpdateCouponRequest;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        return view('admin.coupons.index')->with([
            'coupons' => Coupon::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('admin.coupons.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddCouponRequest $request): RedirectResponse
    {
        if ($request->validated()) {
            Coupon::create($request->validated());

            return redirect()->route('admin.coupons.index')->with([
                'success' => 'Coupon has been added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon): View
    {
        return view('admin.coupons.edit')->with([
            'coupon' => $coupon
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon): RedirectResponse
    {
        if ($request->validated()) {
            $coupon->update($request->validated());

            return redirect()->route('admin.coupons.index')->with([
                'success' => 'Coupon has been updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon): RedirectResponse
    {
        $coupon->delete();

        return redirect()->route('admin.coupons.index')->with([
            'success' => 'Coupon has been deleted successfully'
        ]);
    }
}
