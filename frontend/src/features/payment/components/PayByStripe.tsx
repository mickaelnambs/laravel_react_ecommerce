import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store';
import Stripe from './Stripe';

export default function PayByStripe() {
    const { isLoggedIn } = useAppSelector(state => state.user);
    const { cartItems } = useAppSelector(state => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        if (!cartItems.length) {
            navigate('/');
        }
    }, [isLoggedIn, cartItems.length, navigate]);

    return (
        <div className="my-5">
            <div className="col-md-6 mx-auto">
                <Stripe />
            </div>
        </div>
    );
}