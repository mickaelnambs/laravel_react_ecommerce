import { useState } from 'react';
import { toast } from 'react-toastify';
import { authApi } from '../../auth/api/authApi';
import { CouponInput } from '../types';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addCouponIdToCartItem, setValidCoupon } from '../../../redux/slices/cartSlice';

export default function Coupon() {
    const { token } = useAppSelector(state => state.user);
    const [coupon, setCoupon] = useState<CouponInput>({
        name: ''
    });
    const dispatch = useAppDispatch();

    const applyCoupon = async () => {
        try {
            const response = await authApi.applyCoupon(coupon, token);

            if (response.error) {
                toast.error(response.error);
                setCoupon({ name: '' });
                return;
            }

            dispatch(setValidCoupon(response.coupon));
            dispatch(addCouponIdToCartItem(response.coupon.id));
            setCoupon({ name: '' });
            toast.success(response.message);

        } catch (error) {
            console.error(error);
            toast.error('Failed to apply coupon');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoupon({
            ...coupon,
            name: e.target.value
        });
    };

    return (
        <div className="row mb-3">
            <div className="col-md-12">
                <div className="d-flex">
                    <input
                        type="text"
                        value={coupon.name}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        placeholder="Enter a promo code"
                    />
                    <button
                        className="btn btn-primary rounded-0"
                        disabled={!coupon.name}
                        onClick={applyCoupon}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
