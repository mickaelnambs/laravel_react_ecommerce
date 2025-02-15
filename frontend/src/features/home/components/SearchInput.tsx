interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}

export default function SearchInput({ value, onChange, disabled }: SearchInputProps) {
    return (
        <div className="col-md-4 mb-2">
            <div className="mb-2">
                <span className="fw-bold">Search:</span>
            </div>
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="search"
                    className="form-control me-2"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    placeholder="Search..."
                />
            </form>
        </div>
    );
}

