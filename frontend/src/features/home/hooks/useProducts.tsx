import { useEffect, useState } from "react";
import { Color, Product, Size } from "../../products/types";
import { useDebounce } from "../../../hooks/useDebounce";
import { productsApi } from "../../products/api/productApi";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [filters, setFilters] = useState({
        color: '',
        size: '',
        search: ''
    });

    const debouncedSearch = useDebounce(filters.search, 500);

    const fetchProducts = async () => {
        setMessage('');
        setLoading(true);

        try {
            let response;

            if (filters.color) {
                response = await productsApi.getProductsByColor(filters.color);
            } else if (filters.size) {
                response = await productsApi.getProductsBySize(filters.size);
            } else if (debouncedSearch) {
                response = await productsApi.searchProducts(debouncedSearch);
                if (response.data.length === 0) {
                    setMessage('No products found');
                }
            } else {
                response = await productsApi.getProducts();
            }

            if (response) {
                setProducts(response.data);
                setColors(response.colors);
                setSizes(response.sizes);
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to load products');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [filters.color, filters.size, debouncedSearch]);

    return {
        products,
        colors,
        sizes,
        loading,
        message,
        filters,
        setFilters
    };
}