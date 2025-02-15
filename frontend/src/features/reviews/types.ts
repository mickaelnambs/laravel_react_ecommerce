import { Product } from "../products/types";

export interface Review {
    id?: number;
    product_id: number | undefined;
    user_id: number | undefined;
    title: string;
    body: string;
    rating: number;
    created_at?: string;
    user?: ReviewUser;
}

export interface ReviewContextType {
    product: Product;
    review: Review;
    setReview: (review: Review) => void;
    setLoading: (loading: boolean) => void;
    handleRating: (rating: number) => void;
    clearReview: () => void;
    editReview: (review: Review) => void;
    updating: boolean;
}

export interface ReviewUser {
    id: number;
    name: string;
    image_path: string;
}
