import { useContext } from 'react';
import ReviewListItem from './ReviewListItem';
import { ReviewContext } from '../context/reviewContext';

export default function ReviewsList() {
    const context = useContext(ReviewContext);

    if (!context) {
        console.error('ReviewsList must be used within ReviewContext');
        return;
    }

    const { product } = context;

    if (!product?.reviews?.length) {
        return null;
    }

    return (
        <div className="list-group-item my-5">
            {product.reviews.map((review) => (
                <ReviewListItem
                    key={review.id}
                    review={review}
                />
            ))}
        </div>
    );
}