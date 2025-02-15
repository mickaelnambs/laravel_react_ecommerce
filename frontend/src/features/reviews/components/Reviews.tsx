import { useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { Product } from "../../products/types";
import { Review } from "../types";
import { ReviewContext } from "../context/reviewContext";
import AddUpdateReview from "./AddUpdateReview";
import ReviewsList from "./ReviewList";

interface ReviewsProps {
    product: Product,
    setLoading: (loading: boolean) => void;
}

export default function Reviews({product, setLoading}: ReviewsProps) {
    const { user, isLoggedIn } = useAppSelector(state => state.user);
    const [review, setReview] = useState<Review>({
        product_id: product?.id,
        user_id: user?.id,
        title: '',
        body: '',
        rating: 0
    });
    const [updating, setUpdating] = useState<boolean>(false);

    const editReview = (data: Review) => {
        setReview(data);
        setUpdating(true)
    }

    const handleRating = (rating: number): void => {
        setReview({
            ...review,
            rating
        });
    };
 
    const clearReview = (): void => {
        setReview({
            product_id: product?.id,
            user_id: user?.id,
            title: '',
            body: '',
            rating: 0
        });

        if (updating) {
            setUpdating(true);
        }
    };

    const checkIfUserBoughtTheProduct = () => {
        return user?.orders?.some(order => order?.products?.some(item => item.id === product.id));
    }
 
    const contextValue = {
        product,
        review,
        setReview,
        setLoading,
        handleRating,
        clearReview,
        updating,
        setUpdating,
        editReview
    };
 
    return (
        <ReviewContext.Provider value={contextValue}>
            <ReviewsList />
            { isLoggedIn && checkIfUserBoughtTheProduct() && <AddUpdateReview />}
        </ReviewContext.Provider>
    );
}