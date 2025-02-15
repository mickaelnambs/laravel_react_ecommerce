<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Coupon;

class OrderService
{
    public function createOrders(array $products, int $userId): void
    {
        foreach ($products as $product) {
            $order = Order::create([
                'qty' => $product['qty'],
                'user_id' => $userId,
                'coupon_id' => $product['coupon_id'],
                'total' => $this->calculateTotal(
                    $product['price'],
                    $product['qty'],
                    $product['coupon_id']
                ),
            ]);

            $order->products()->attach($product['product_id']);
        }
    }

    public function calculateTotal(float $price, int $qty, ?int $couponId): float
    {
        $discount = 0;
        $total = $price * $qty;
        $coupon = Coupon::find($couponId);
        if ($coupon && $coupon->checkIfValid()) {
            $discount = $total * $coupon->discount / 100;
        }

        return $total - $discount;
    }

    public function calculateOrderTotal(array $items): float
    {
        $total = 0;
        foreach ($items as $item) {
            $total += $this->calculateTotal(
                $item['price'],
                $item['qty'],
                $item['coupon_id']
            );
        }

        return $total * 100;
    }
}
