import axiosInstance from "../../../services/axios.instance";
import { getConfig } from "../../../utils/config";
import { CartItem } from "../../cart/types";
import { PaymentIntentResponse, StoreOrderResponse } from "./types";

export const paymentApi = {
    storeOrder: async (cartItems: CartItem[], token: string): Promise<StoreOrderResponse> => {
        const response = await axiosInstance.post('store/order', { products: cartItems }, getConfig(token));
        return response.data;
    },

    createPaymentIntent: async (cartItems: CartItem[], token: string): Promise<PaymentIntentResponse> => {
        const response = await axiosInstance.post('pay/order', { cartItems }, getConfig(token));
        return response.data;
    }
};