import { Product } from "../products/types";

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    address: string | null;
    zip_code: string | null;
    city: string | null;
    country: string | null;
    phone_number: string | null;
    profile_image: string;
    profile_completed: boolean | null;
    orders: Order[];
}

export interface UserInfos {
    address: string | null;
    zip_code: string | null;
    city: string | null;
    country: string | null;
    phone_number: string | null;
}

export interface Order {
    id: number;
    qty: number;
    total: number;
    created_at: string;
    delivered_at: string | null;
    products: Product[];
}