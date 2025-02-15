import { useState } from "react";
import { Product } from "../types";
import ProductsListItem from "./ProductsListItem";

interface ProductsListProps {
    products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
    const [productsToShow, setProductsToShow] = useState<number>(5);

    const loadMoreProducts = () => {
        if (productsToShow < products?.length) {
            setProductsToShow(prev => prev + 5);
        }
    }

    return (
        <div className="row my-5">
            {products?.slice(0, productsToShow).map(product => (
                <ProductsListItem product={product} key={product.id} />
            ))}

            {productsToShow < (products?.length || 0) && (
                <div className="d-flex justify-content-center my-3">
                    <button
                        className="btn btn-sm btn-dark"
                        onClick={loadMoreProducts}
                    >
                        <i className="bi bi-arrow-clockwise" />
                        {" "}
                        Load more
                    </button>
                </div>
            )}
        </div>
    );
}