export interface CouponInput {
    name: string;
}

export interface CouponResponse {
    error?: string;
    message?: string;
    coupon: {
        id: number;
        name: string;
        discount: number;
    };
}