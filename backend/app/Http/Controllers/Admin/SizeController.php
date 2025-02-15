<?php

namespace App\Http\Controllers\Admin;

use App\Models\Size;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddSizeRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UpdateSizeRequest;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        return view('admin.sizes.index')->with([
            'sizes' => Size::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('admin.sizes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddSizeRequest $request): RedirectResponse
    {
        if ($request->validated()) {
            Size::create($request->validated());

            return redirect()->route('admin.sizes.index')->with([
                'success' => 'Size has been added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Size $size): void
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Size $size): View
    {
        return view('admin.sizes.edit')->with([
            'size' => $size
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSizeRequest $request, Size $size): RedirectResponse
    {
        if ($request->validated()) {
            $size->update($request->validated());

            return redirect()->route('admin.sizes.index')->with([
                'success' => 'Size has been updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size): RedirectResponse
    {
        $size->delete();

        return redirect()->route('admin.sizes.index')->with([
            'success' => 'Size has been deleted successfully'
        ]);
    }
}
