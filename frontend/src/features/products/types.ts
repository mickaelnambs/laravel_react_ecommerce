import { Review } from "../reviews/types";

export interface Product{
    id: number;
    name: string;
    price: number;
    slug: string;
    status: number;
    desc: string;
    qty: number;
    thumbnail: string;
    first_image: string | '',
    second_image: string | '',
    third_image: string | '',
    colors: Color[];
    sizes: Size[];
    reviews: Review[];
}

export interface Color {
    id: number;
    name: string;
}

export interface Size {
    id: number;
    name: string;
}

export interface GalleryImage {
    original: string;
    thumbnail: string;
    originalHeight: number;
}