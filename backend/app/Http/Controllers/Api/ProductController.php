<?php

namespace App\Http\Controllers\Api;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductController extends Controller
{
    public function index(): JsonResource
    {
        return ProductResource::collection(
            Product::with(['colors', 'sizes', 'reviews'])
                ->latest()
                ->get()
        )->additional([
            'colors' => Color::has('products')->get(),
            'sizes' => Size::has('products')->get(),
        ]);
    }

    public function show(Product $product): JsonResource
    {
        if (!$product) {
            abort(404);
        }

        return ProductResource::make(
            $product->load(['colors', 'sizes', 'reviews'])
        );
    }

    public function filterProductsByColor(Color $color): JsonResource
    {
        return ProductResource::collection(
            $color->products()
                ->with(['colors', 'sizes', 'reviews'])
                ->latest()
                ->get()
        )->additional([
            'colors' => Color::has('products')->get(),
            'sizes' => Size::has('products')->get(),
        ]);
    }

    public function filterProductsBySize(Size $size): JsonResource
    {
        return ProductResource::collection(
            $size->products()
                ->with(['colors', 'sizes', 'reviews'])
                ->latest()
                ->get()
        )->additional([
            'colors' => Color::has('products')->get(),
            'sizes' => Size::has('products')->get(),
        ]);
    }

    public function findProductsByTerm($searchTerm): JsonResource
    {
        return ProductResource::collection(
            Product::where('name', 'LIKE', '%' . $searchTerm . '%')
                ->with(['colors', 'sizes', 'reviews'])
                ->latest()
                ->get()
        )->additional([
            'colors' => Color::has('products')->get(),
            'sizes' => Size::has('products')->get(),
        ]);
    }
}
