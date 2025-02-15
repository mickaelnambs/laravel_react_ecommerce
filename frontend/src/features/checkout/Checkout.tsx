import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { CartItem } from '../cart/types';
import { addCouponIdToCartItem, setValidCoupon } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import Coupon from '../coupons/components/Coupon';
import Alert from '../../components/ui/Alert/Alert';
import UpdateUserInfos from '../auth/components/UpdateUserInfos';

export default function Checkout() {
    const { cartItems, validCoupon } = useAppSelector(state => state.cart);
    const { user, isLoggedIn } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) navigate('/login');
    }, [isLoggedIn]);

    const totalOfCartItems = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.qty, 0);

    const calculateDiscount = (): number => {
        return validCoupon?.discount ? totalOfCartItems * validCoupon.discount / 100 : 0;
    }

    const totalAfterDiscount = (): number => {
        return totalOfCartItems - calculateDiscount();
    };

    const removeCoupon = (): void => {
        dispatch(setValidCoupon({
            name: '',
            discount: 0
        }));
        dispatch(addCouponIdToCartItem(null));
        toast.success('Coupon removed');
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row my-5">
                    <div className="col-md-7">
                        <UpdateUserInfos profile={false} />
                    </div>
                    <div className="col-md-4">
                        <Coupon />
                        <ul className="list-group">
                            {cartItems.map((item: CartItem) => (
                                <li key={item.ref} className="list-group-item d-flex">
                                    <img
                                        src={item.image}
                                        width={60}
                                        height={60}
                                        alt={item.name}
                                        className="img-fluid rounded me-2"
                                    />
                                    <div className="d-flex flex-column">
                                        <h5 className="my-1">
                                            <strong>{item.name}</strong>
                                        </h5>
                                        <span className="text-muted">
                                            <strong>Color: {item.color}</strong>
                                        </span>
                                        <span className="text-muted">
                                            <strong>Size: {item.size}</strong>
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column ms-auto">
                                        <span className="text-muted">
                                            {item.price} <i>x</i> {item.qty}
                                        </span>
                                        <span className="text-danger fw-bold">
                                            ${item.price * item.qty}
                                        </span>
                                    </div>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="fw-bold">
                                    Discount ({validCoupon?.discount}%)
                                </span>
                                {validCoupon?.name && (
                                    <span className="fw-normal text-danger">
                                        {validCoupon.name}{' '}
                                        <i
                                            className="bi bi-trash"
                                            style={{ cursor: 'pointer' }}
                                            onClick={removeCoupon}
                                        />
                                    </span>
                                )}
                                <span className="fw-bold text-danger">
                                    -${calculateDiscount()}
                                </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="fw-bold">Total</span>
                                <span className="fw-bold">
                                    ${totalAfterDiscount()}
                                </span>
                            </li>
                        </ul>
                        <div className="my-3">
                            {user?.profile_completed ? (
                                <Link to="/pay/order" className="btn btn-primary rounded-0">
                                    Proceed to payment
                                </Link>
                            ) : (
                                <Alert
                                    content="Add your billing details"
                                    type="warning"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}