<?php

namespace App\Http\Controllers\Api;

use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class CouponController extends Controller
{
    public function applyCoupon(Request $request): JsonResponse
    {
        $coupon = Coupon::whereName($request->name)->first();

        if ($coupon && $coupon->checkIfValid()) {
            return response()->json([
                'message' => 'Coupon applied successfully',
                'coupon' => $coupon
            ]);
        }

        return response()->json([
            'error' => 'Invalid or expired coupon'
        ]);
    }
}
