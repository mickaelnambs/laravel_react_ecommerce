<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Services\OrderService;

class PaymentService
{
    public function __construct(private OrderService $orderService)
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function createPaymentIntent(array $cartItems): PaymentIntent
    {
        return PaymentIntent::create([
            'amount' => $this->orderService->calculateOrderTotal($cartItems),
            'currency' => 'usd',
            'description' => config('app.name'),
            'payment_method_types' => ['card']
        ]);
    }
}
