import { PaymentIntent, StripeError } from "@stripe/stripe-js";
import { User } from "../../auth/types";

export interface StoreOrderResponse {
    user: User;
}

export interface PaymentResponse {
    error?: StripeError;
    paymentIntent?: PaymentIntent;
}

export interface StripePaymentResponse {
    error?: StripeError;
    paymentIntent?: PaymentIntent;
}

export interface PaymentIntentResponse {
    clientSecret: string;
}