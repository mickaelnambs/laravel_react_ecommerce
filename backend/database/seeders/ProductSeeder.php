<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Classic T-Shirt',
                'price' => 29.99,
                'qty' => 100,
                'desc' => 'A comfortable classic t-shirt made from 100% cotton',
                'thumbnail' => 'https://picsum.photos/400/600',
                'first_image' => 'https://picsum.photos/400/601',
                'second_image' => 'https://picsum.photos/400/602',
                'third_image' => 'https://picsum.photos/400/603',
                'status' => 1
            ],
            [
                'name' => 'Denim Jeans',
                'price' => 79.99,
                'qty' => 50,
                'desc' => 'Premium quality denim jeans with perfect fit',
                'thumbnail' => 'https://picsum.photos/400/604',
                'first_image' => 'https://picsum.photos/400/605',
                'second_image' => 'https://picsum.photos/400/606',
                'third_image' => 'https://picsum.photos/400/607',
                'status' => 1
            ],
            [
                'name' => 'Casual Hoodie',
                'price' => 49.99,
                'qty' => 75,
                'desc' => 'Warm and comfortable hoodie for casual wear',
                'thumbnail' => 'https://picsum.photos/400/608',
                'first_image' => 'https://picsum.photos/400/609',
                'second_image' => 'https://picsum.photos/400/610',
                'third_image' => 'https://picsum.photos/400/611',
                'status' => 1
            ]
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']);
            $newProduct = Product::create($product);

            $newProduct->colors()->attach(
                Color::inRandomOrder()->take(rand(2, 4))->pluck('id')
            );

            $newProduct->sizes()->attach(
                Size::inRandomOrder()->take(rand(3, 6))->pluck('id')
            );
        }
    }
}
