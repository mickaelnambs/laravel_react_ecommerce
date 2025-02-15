<?php

namespace App\Http\Controllers\Admin;

use App\Models\Review;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class ReviewController extends Controller
{
    public function index(): View
    {
        return view('admin.reviews.index')->with([
            'reviews' => Review::latest()->get()
        ]);
    }

    public function toggleApprovedStatus(Review $review, int $status): RedirectResponse
    {
        $review->update([
            'approved' => $status
        ]);

        return redirect()->route('admin.reviews.index')->with([
            'success' => 'Review has been updated successfully'
        ]);
    }

    public function delete(Review $review): RedirectResponse
    {
        $review->delete();

        return redirect()->route('admin.reviews.index')->with([
            'success' => 'Review has been deleted successfully'
        ]);
    }
}
