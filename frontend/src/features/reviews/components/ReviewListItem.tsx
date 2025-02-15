import { Rating } from "react-simple-star-rating";
import { Review } from "../types";
import { useAppSelector } from "../../../redux/store";
import { useContext } from "react";
import { ReviewContext } from "../context/reviewContext";
import { toast } from "react-toastify";
import { reviewApi } from "../api/reviewApi";

interface ReviewListItemProps {
    review: Review;
}

export default function ReviewListItem({ review }: ReviewListItemProps) {
    const { user, token } = useAppSelector(state => state.user);
    const context = useContext(ReviewContext);

    if (!context) {
        console.error('ReviewListItem must be used within ReviewContext');
        return;
    }

    const { product, setLoading, clearReview, editReview } = context;

    const renderReviewActions = () => (
        review?.user_id === user?.id && (
            <div className="dropdown ms-auto">
                <i
                    className="bi bi-three-dots-vertical"
                    data-bs-toggle="dropdown"
                />
                <ul className="dropdown-menu">
                    <li>
                        <span className="dropdown-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => editReview(review)}
                        >
                            <i className="bi bi-pen mx-2"></i> Update
                        </span>
                    </li>
                    <li>
                        <span
                            className="dropdown-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteReview(review)}
                        >
                            <i className="bi bi-trash mx-2" /> delete
                        </span>
                    </li>
                </ul>
            </div>
        )
    );

    const handleDeleteReview = async (review: Review): Promise<void> => {
        if (!window.confirm("Are you sure you want to delete this review?")) {
            return;
        }

        setLoading(true);

        try {
            const response = await reviewApi.deleteReview(review, token);

            if (response.error) {
                toast.error(response.error);
                clearReview();
            } else {
                if (product) {
                    product.reviews = product.reviews.filter(
                        (item) => item.id !== review.id
                    );
                }
                toast.success(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <li
            className="list-group-item bg-light d-flex justify-content-start
            align-items-center p-2 mb-2 rounded shadow-sm"
        >
            <div className="me-2">
                <img
                    src={review?.user?.image_path}
                    alt={review?.user?.name}
                    className="rounded-circle"
                    width={60}
                    height={60}
                />
            </div>
            <div className="d-flex flex-column">
                <h6>{review?.title}</h6>
                <p className="m-0">{review?.body}</p>
                <Rating initialValue={review?.rating} readonly size={24} />
                <span className="text-muted">
                    {review?.created_at} by{" "}
                    <span className="fw-bold">{review?.user?.name}</span>
                </span>
            </div>
            {renderReviewActions()}
        </li>
    );
}