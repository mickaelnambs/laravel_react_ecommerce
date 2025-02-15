export interface CartItem {
    product_id: number;
    name: string;
    slug: string;
    qty: number;
    ref: string;
    price: number;
    color: string;
    size: string;
    maxQty: number;
    image: string;
    coupon_id: number | null;
}
 
export interface Coupon {
    name: string;
    discount: number;
}