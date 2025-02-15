import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Parser } from 'html-to-react';
import { productsApi } from '../api/productApi';
import { Product as ProductType, Color, Size } from '../types';
import Slider from './Slider';
import Alert from '../../../components/ui/Alert/Alert';
import Spinner from '../../../components/ui/Spinner/Spinner';
import { CartItem } from '../../cart/types';
import { addToCart } from '../../../redux/slices/cartSlice';
import { useAppDispatch } from '../../../redux/store';
import { makeUniqueId } from '../../../utils/makeUniqueId';
import Reviews from '../../reviews/components/Reviews';
import { Rating } from 'react-simple-star-rating';

export default function Product() {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [qty, setQty] = useState<number>(1);
    const [error, setError] = useState<string>('');
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();

    const fetchProduct = async () => {
        if (!slug) return;

        setLoading(true);
        setError('');

        try {
            const response = await productsApi.getProductBySlug(slug);
            setProduct(response.data);
        } catch (error: any) {
            if (error?.response?.status === 404) {
                setError('Product not found');
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [slug]);

    const calculateReviewAverage = (): number => {
        if (!product?.reviews?.length) {
            return 0;
        }

        const average = product.reviews.reduce((acc, review) => {
            return acc + review.rating / product.reviews.length;
        }, 0);

        return Number(average.toFixed(1));
    };

    if (error) {
        return <Alert type="danger" content={error} />;
    }

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return null;
    }

    return (
        <div className="card my-5">
            <div className="row g-0">
                <div className="col-md-4 p-2">
                    <Slider product={product} />
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="text-dark">{product.name}</h5>
                            <h6 className="badge bg-danger p-2">${product.price}</h6>
                        </div>
                        {
                            calculateReviewAverage() > 0 && <div className="d-flex align-items-center">
                                <span className="mx-1 text-muted">
                                    <i>
                                        {product?.reviews?.length} {" "}
                                        {product?.reviews?.length > 1 ? 'Reviews' : 'Review'}
                                    </i>
                                </span>
                                <Rating
                                    initialValue={calculateReviewAverage()}
                                    readonly
                                    size={32}
                                />
                            </div>
                        }

                        <div className="my-3">
                            {Parser().parse(product.desc)}
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="d-flex justify-content-start align-items-center mb-3">
                                {product.sizes?.map(size => (
                                    <span
                                        onClick={() => setSelectedSize(size)}
                                        key={size.id}
                                        className={`bg-light text-dark me-2 p-1 fw-bold ${selectedSize?.id === size.id ? 'border border-dark-subtle border-2' : ''
                                            }`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <small>{size.name}</small>
                                    </span>
                                ))}
                            </div>

                            <div className="mx-2">
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
                                    onClick={() => setSelectedColor(color)}
                                    key={color.id}
                                    className={`me-1 ${selectedColor?.id === color.id ? 'border border-dark-subtle border-2' : ''
                                        }`}
                                    style={{
                                        backgroundColor: color.name.toLowerCase(),
                                        height: '20px',
                                        width: '20px',
                                        cursor: 'pointer'
                                    }}
                                />
                            ))}
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-6 mx-auto">
                                <div className="mb-4">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Qty"
                                        value={qty}
                                        onChange={(e) => setQty(parseInt(e.target.value))}
                                        min={1}
                                        max={product?.qty > 1 ? product.qty : 1}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-dark"
                                disabled={!selectedColor || !selectedSize || product?.status === 0}
                                onClick={() => {
                                    const cartItem: CartItem = {
                                        product_id: product.id,
                                        ref: makeUniqueId(10),
                                        name: product.name,
                                        slug: product.slug,
                                        qty: parseInt(String(qty)),
                                        price: parseInt(String(product.price)),
                                        color: selectedColor!.name,
                                        size: selectedSize!.name,
                                        maxQty: parseInt(String(product.qty)),
                                        image: product.thumbnail,
                                        coupon_id: null
                                    };

                                    dispatch(addToCart(cartItem));

                                    setSelectedColor(null);
                                    setSelectedSize(null);
                                    setQty(1);
                                }}
                            >
                                <i className="bi bi-cart-plus-fill" /> {" "}
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    {product?.reviews?.length > 0 &&
                        <div className="row m-4">
                            <div className="col-md-8 mx-auto">
                                <div className="card">
                                    <div className="card-header bg-white text-center">
                                        <h5 className="mt-2">
                                            Reviews {product.reviews.length}
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <Reviews product={product} setLoading={setLoading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}