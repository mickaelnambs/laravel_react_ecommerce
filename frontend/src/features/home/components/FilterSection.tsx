import { Color, Size } from "../../products/types";
import FilterSelect from "./FilterSelect";
import SearchInput from "./SearchInput";

interface FilterSectionProps {
    colors: Color[];
    sizes: Size[];
    filters: {
        color: string;
        size: string;
        search: string;
    };
    onFilterChange: (filterName: string, value: string) => void;
}

export function FilterSection({ colors, sizes, filters, onFilterChange }: FilterSectionProps) {
    const handleChange = (filterName: string) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        onFilterChange(filterName, e.target.value);
    };

    return (
        <div className="row">
            <div className="col-md-8 mx-auto">
                <div className="row">
                    <FilterSelect
                        label="Filter by color"
                        name="color_id"
                        value={filters.color}
                        onChange={handleChange('color')}
                        disabled={!!filters.size || !!filters.search}
                        options={colors}
                    />

                    <FilterSelect
                        label="Filter by size"
                        name="size_id"
                        value={filters.size}
                        onChange={handleChange('size')}
                        disabled={!!filters.color || !!filters.search}
                        options={sizes}
                    />

                    <SearchInput
                        value={filters.search}
                        onChange={handleChange('search')}
                        disabled={!!filters.color || !!filters.size}
                    />
                </div>
            </div>
        </div>
    );
}
