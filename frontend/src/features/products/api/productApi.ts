import axiosInstance from "../../../services/axios.instance";
import { ProductsApiResponse, SingleProductApiResponse } from "./types";

export const productsApi = {
    getProducts: async (): Promise<ProductsApiResponse> => {
        const response = await axiosInstance.get('/products');
        return response.data;
    },

    getProductsByColor: async (colorId: string): Promise<ProductsApiResponse> => {
        const response = await axiosInstance.get(`products/${colorId}/color`);
        return response.data;
    },

    getProductsBySize: async (sizeId: string): Promise<ProductsApiResponse> => {
        const response = await axiosInstance.get(`products/${sizeId}/size`);
        return response.data;
    },

    searchProducts: async (searchTerm: string): Promise<ProductsApiResponse> => {
        const response = await axiosInstance.get(`products/${searchTerm}/find`);
        return response.data;
    },

    getProductBySlug: async (slug: string): Promise<SingleProductApiResponse> => {
        const response = await axiosInstance.get(`product/${slug}/show`);
       return response.data;
    }
};