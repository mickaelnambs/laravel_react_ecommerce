import { useProducts } from '../hooks/useProducts';
import Alert from '../../../components/ui/Alert/Alert';
import Spinner from '../../../components/ui/Spinner/Spinner';
import { FilterSection } from './FilterSection';
import ProductsList from '../../products/components/ProductsList';

export default function Home() {
    const { 
        products, 
        colors, 
        sizes, 
        loading, 
        message, 
        filters, 
        setFilters 
    } = useProducts();

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters(() => ({
            color: '',
            size: '',
            search: '',
            [filterName]: value
        }));
    };

    return (
        <div className="row my-5">
            <div className="col-md-12">
                <FilterSection
                    colors={colors}
                    sizes={sizes}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
                
                {message && <Alert type="info" content={message} />}
                {loading ? <Spinner /> : <ProductsList products={products} />}
            </div>
        </div>
    );
}