<?php

namespace App\Http\Controllers\Admin;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use App\Traits\UploadFile;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    use UploadFile;

    public function index(): View
    {
        return view('admin.products.index')->with([
            'products' => Product::with(['colors', 'sizes'])->latest()->get()
        ]);
    }

    public function create(): View
    {
        $colors = Color::all();
        $sizes = Size::all();

        return view('admin.products.create')->with([
            'colors' => $colors,
            'sizes' => $sizes
        ]);
    }

    public function store(AddProductRequest $request): RedirectResponse
    {
        if ($request->validated()) {
            $data = $request->all();
            $data['thumbnail'] = $this->saveImage($request->file('thumbnail'));

            $imageFields = ['first_image', 'second_image', 'third_image'];
            foreach ($imageFields as $field) {
                if ($request->has($field)) {
                    $data[$field] = $this->saveImage($request->file($field));
                }
            }

            $data['slug'] = Str::slug($request->name);

            $product = Product::create($data);
            $product->colors()->sync($request->color_id);
            $product->sizes()->sync($request->size_id);

            return redirect()->route('admin.products.index')->with([
                'success' => 'Product has been added successfully'
            ]);
        }
    }

    public function edit(Product $product): View
    {
        return view('admin.products.edit')->with([
            'colors' => Color::all(),
            'sizes' => Size::all(),
            'product' => $product
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        if ($request->validated()) {
            $data = $request->all();

            $imageFields = [
                'thumbnail',
                'first_image',
                'second_image',
                'third_image'
            ];

            foreach ($imageFields as $field) {
                if ($request->has($field)) {
                    $this->removeFile($product->$field);
                    $data[$field] = $this->saveImage($request->file($field));
                }
            }

            $data['slug'] = Str::slug($request->name);
            $data['status'] = $request->status;

            $product->update($data);
            $product->colors()->sync($request->color_id);
            $product->sizes()->sync($request->size_id);

            return redirect()->route('admin.products.index')->with([
                'success' => 'Product has been updated successfully'
            ]);
        }
    }


    public function destroy(Product $product): RedirectResponse
    {
        $imageFields = ['thumbnail', 'first_image', 'second_image', 'third_image'];
        foreach ($imageFields as $field) {
            $this->removeFile($product->$field);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with([
            'success' => 'Product has been deleted successfully'
        ]);
    }
}
