import { Rating } from "react-simple-star-rating";
import { Product } from "../types";
import { Link } from 'react-router-dom';

interface ProductsListItemProps {
    product: Product;
}

export default function ProductsListItem({ product }: ProductsListItemProps) {
    const calculateReviewAverage = (): number => {
        if (!product?.reviews?.length) {
            return 0;
        }

        const average = product.reviews.reduce((acc, review) => {
            return acc + review.rating / product.reviews.length;
        }, 0);

        return Number(average.toFixed(1));
    };

    return (
        <div className='col-md-4 mb-3'>
            <Link to={`/product/${product.slug}`} className='text-decoration-none text-dark'>
                <div className="card shadow-sm h-100">
                    <img 
                        src={product.thumbnail} 
                        alt={product.name} 
                        className='card-img-top' 
                        loading="lazy"
                    />
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className='text-dark'>{product.name}</h5>
                            <h6 className='badge bg-danger p-2'>${product.price}</h6>
                        </div>
                        <div className="my-2">
                        {
                            calculateReviewAverage() > 0 &&
                            <Rating
                                initialValue={calculateReviewAverage()}
                                readonly
                                size={24}
                            />
                        }
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='d-flex justify-content-start align-items-center mb-3'>
                                {product.sizes.map(size => (
                                    <span 
                                        key={size.id} 
                                        className='bg-light text-dark me-2 p-1 fw-bold'
                                    >
                                        <small>{size.name}</small>
                                    </span>
                                ))}
                            </div>
                            <div>
                                {product.status ? (
                                    <span className="badge bg-success">Available</span>
                                ) : (
                                    <span className="badge bg-danger">Out of Stock</span>
                                )}
                            </div>
                        </div>
                        <div className="d-flex justify-content-start align-items-center mb-3">
                            {product.colors?.map(color => (
                                <div 
                                    key={color.id}
                                    className='me-1 border border-light-subtle border-2 rounded-circle'
                                    style={{
                                        backgroundColor: color.name.toLowerCase(),
                                        height: '20px',
                                        width: '20px'
                                    }}
                                    title={color.name}
                                >
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}