import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartItem, Coupon } from "../../features/cart/types";

interface CartState {
    cartItems: CartItem[];
    validCoupon: Coupon | null;
}

const initialState: CartState = {
    cartItems: [],
    validCoupon: {
        name: '',
        discount: 0
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const item = action.payload;
            const productItem = state.cartItems.find(product => 
                product.product_id === item.product_id &&
                product.color === item.color && 
                product.size === item.size
            );

            if (productItem) {
                toast.info('Product already added to your cart');
            } else {
                state.cartItems = [item, ...state.cartItems];
                toast.success('Product added to your cart');
            }
        },
        incrementQuantity(state, action: PayloadAction<CartItem>) {
            const item = action.payload;
            const productItem = state.cartItems.find(product => 
                product.product_id === item.product_id &&
                product.color === item.color && 
                product.size === item.size
            );

            if (!productItem) return;

            if (productItem.qty >= productItem.maxQty) {
                toast.info(`Only ${productItem.maxQty} available`);
                return;
            }

            productItem.qty++;
        },
        decrementQuantity(state, action: PayloadAction<CartItem>) {
            const item = action.payload;
            const productItem = state.cartItems.find(product => 
                product.product_id === item.product_id &&
                product.color === item.color && 
                product.size === item.size
            );

            if (!productItem) return;

            productItem.qty -= 1

            if (productItem.qty === 0) {
                state.cartItems = state.cartItems.filter(product => product.ref !== item.ref)
            }
        },
        removeFromCart(state, action: PayloadAction<CartItem>) {
            const item = action.payload;
            state.cartItems = state.cartItems.filter(product => product.ref !== item.ref);
            toast.warning('Product remove from your cart');
        },
        setValidCoupon(state, action: PayloadAction<Coupon>) {
            state.validCoupon = action.payload;
        },
        addCouponIdToCartItem(state, action: PayloadAction<number|null>) {
            const coupon_id = action.payload;
            state.cartItems = state.cartItems.map(item => ({
                ...item,
                coupon_id
            }));
        },
        clearCartItems: {
            reducer: (state) => {
                state.cartItems = [];
            },
            prepare: () => ({ payload: undefined })
        }
    }
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, setValidCoupon, addCouponIdToCartItem, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;