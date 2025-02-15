import { useContext, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { ReviewContext } from '../context/reviewContext';
import { reviewApi } from '../api/reviewApi';
import { useAppSelector } from '../../../redux/store';
import { Rating } from 'react-simple-star-rating';

export default function AddUpdateReview() {
    const { token } = useAppSelector(state => state.user);
    const context = useContext(ReviewContext);

    if (!context) {
        console.error('AddUpdateReview must be used within ReviewContext');
        return;
    }

    const {
        product,
        review,
        setReview,
        setLoading,
        handleRating,
        clearReview,
        updating
    } = context;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReview({
            ...review,
            [name]: value
        });
    };

    const addReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await reviewApi.addReview(review, token);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success(response.message);
                clearReview();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add review');
        } finally {
            setLoading(false);
        }
    };

    const updateReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await reviewApi.updateReview(review, token);

            if (response.error) {
                toast.error(response.error);
            } else {
                product.reviews = product.reviews.filter(item => item.id !== review.id);
                toast.success(response.message);
                clearReview();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update review');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="row my-5">
            <div className="col-md-8 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            {!updating ? 'Add' : 'Edit'} Review
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={updating ? updateReview : addReview}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title*</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={review.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Title"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label">Review*</label>
                                <textarea
                                    id="body"
                                    name="body"
                                    rows={5}
                                    value={review.body}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Review"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <Rating
                                    initialValue={review.rating}
                                    onClick={handleRating}
                                    size={32}
                                />
                            </div>
                            {
                                !updating ?
                                    <button type="submit"
                                        disabled={!review.title || !review.body || review.rating === 0}
                                        className="btn btn-dark btn-sm">Submit</button>
                                    :
                                    <div>
                                        <button type="submit"
                                            disabled={!review.title || !review.body || review.rating === 0}
                                            className="btn btn-warning btn-sm">Update</button>
                                        <button type="button"
                                            onClick={() => clearReview()}
                                            className="btn btn-danger btn-sm mx-2">Cancel</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}