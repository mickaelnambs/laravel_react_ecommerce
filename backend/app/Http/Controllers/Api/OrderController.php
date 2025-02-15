<?php

namespace App\Http\Controllers\Api;

use Stripe\Stripe;
use ErrorException;
use App\Models\Order;
use App\Models\Coupon;
use Stripe\PaymentIntent;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\OrderService;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService,
        private PaymentService $paymentService
    ) {
    }

    public function store(Request $request): JsonResponse
    {
        $this->orderService->createOrders($request->products, $request->user()->id);

        return response()->json([
            'user' => UserResource::make($request->user())
        ]);
    }

    public function payOrderByStripe(Request $request): JsonResponse
    {
        try {
            $paymentIntent = $this->paymentService->createPaymentIntent($request->cartItems);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret
            ]);
        } catch (ErrorException $e) {
            Log::error('Payment Intent creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json(
                ['error' => 'Something went wrong, please try again.'],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
