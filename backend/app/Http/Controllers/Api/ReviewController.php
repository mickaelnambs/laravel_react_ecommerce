<?php

namespace App\Http\Controllers\Api;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class ReviewController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $exists = $this->checkIfUserAlreadyReviewedTheProduct($request->product_id, $request->user()->id);

        if ($exists) {
            return response()->json([
                'error' => 'You have already reviewed this product'
            ]);
        }

        Review::create([
            'product_id' => $request->product_id,
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'body' => $request->body,
            'rating' => $request->rating,
        ]);

        return response()->json([
            'message' => 'Your review has been added successfully and will be published soon'
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $review = $this->checkIfUserAlreadyReviewedTheProduct($request->product_id, $request->user()->id);

        if ($review) {
            $review->update([
                'product_id' => $request->product_id,
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'body' => $request->body,
                'rating' => $request->rating,
                'approved' => 0
            ]);

            return response()->json([
                'message' => 'Your review has been updated successfully and will be published soon'
            ]);
        }

        return response()->json([
            'error' => 'Something went wrong try again later'
        ]);
    }

    public function delete(Request $request): JsonResponse
    {
        $review = $this->checkIfUserAlreadyReviewedTheProduct($request->product_id, $request->user()->id);

        if ($review) {
            $review->delete();

            return response()->json([
                'message' => 'Your review has been deleted successfully'
            ]);
        }

        return response()->json([
            'error' => 'Something went wrong try again later'
        ]);
    }

    private function checkIfUserAlreadyReviewedTheProduct(int $productId, int $userId): ?Review
    {
        return Review::where(['product_id' => $productId, 'user_id' => $userId])->first();
    }
}
