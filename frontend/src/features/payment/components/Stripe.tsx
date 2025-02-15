import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { paymentApi } from '../api/paymentApi';
import CheckoutForm from "./CheckoutForm";
import { useAppSelector } from "../../../redux/store";
import { env } from "../../../config/env";

export default function Stripe() {
    const { token } = useAppSelector(state => state.user);
    const { cartItems } = useAppSelector(state => state.cart);
    const [clientSecret, setClientSecret] = useState<string>("");
    const stripePromise = loadStripe(env.STRIPE_PUBLIC_KEY);

    const fetchClientSecret = async () => {
        try {
            const response = await paymentApi.createPaymentIntent(cartItems, token);
            setClientSecret(response.clientSecret);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClientSecret();
    }, [token, cartItems]);


    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    )
}