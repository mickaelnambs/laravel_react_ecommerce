import { Color, Product, Size } from "../types";

interface BaseApiResponse {
   colors: Color[];
   sizes: Size[];
}

export interface ProductsApiResponse extends BaseApiResponse {
   data: Product[];
}

export interface SingleProductApiResponse extends BaseApiResponse {
   data: Product;
}