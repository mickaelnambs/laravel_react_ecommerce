import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAppSelector } from "../../../redux/store";
import { paymentApi } from "../api/paymentApi";
import { clearCartItems, setValidCoupon } from "../../../redux/slices/cartSlice";
import { setCurrentUser } from "../../../redux/slices/userSlice";
import { StripePaymentResponse } from "../api/types";

export default function CheckoutForm() {
    const { cartItems } = useAppSelector(state => state.cart);
    const { token } = useAppSelector(state => state.user)
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const storeOrder = async (): Promise<void> => {
        try {
            const response = await paymentApi.storeOrder(cartItems, token);

            dispatch(clearCartItems());
            dispatch(setValidCoupon({
                name: '',
                discount: 0
            }));
            dispatch(setCurrentUser(response.user));

            toast.success('Payment done successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to store order');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {},
                redirect: "if_required",
            }) as StripePaymentResponse;

            if (error?.type === "card_error" || error?.type === "validation_error") {
                setMessage(error.message || "An error occurred");
                return;
            }

            if (paymentIntent?.id) {
                await storeOrder();
            }
        } catch (error) {
            console.error(error);
            setMessage('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                type="submit"
                className="btn btn-primary mt-3 w-100"
            >
                <span id="button-text">
                    {isProcessing ? "Processing..." : "Pay now"}
                </span>
            </button>

            {message && (<div id="payment-message">{message}</div>)}
        </form>
    );
}
