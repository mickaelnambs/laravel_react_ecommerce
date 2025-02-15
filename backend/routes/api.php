<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ProductController;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()),
            'access_token' => $request->bearerToken()
        ];
    });

    Route::post('user/logout', [UserController::class, 'logout']);
    Route::put('user/profile/update', [UserController::class, 'updateProfile']);

    Route::post('apply/coupon', [CouponController::class, 'applyCoupon']);

    Route::post('store/order', [OrderController::class, 'store']);
    Route::post('pay/order', [OrderController::class, 'payOrderByStripe']);

    Route::post('review/store', [ReviewController::class, 'store']);
    Route::post('review/delete', [ReviewController::class, 'delete']);
    Route::post('review/update', [ReviewController::class, 'update']);
});

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{color}/color', [ProductController::class, 'filterProductsByColor']);
Route::get('products/{size}/size', [ProductController::class, 'filterProductsBySize']);
Route::get('products/{searchTerm}/find', [ProductController::class, 'findProductsByTerm']);
Route::get('product/{product}/show', [ProductController::class, 'show']);

Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);
