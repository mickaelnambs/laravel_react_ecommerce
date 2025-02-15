interface FilterSelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled: boolean;
    options?: Array<{ id: number; name: string; }>;
}

export default function FilterSelect({ label, name, value, onChange, disabled, options }: FilterSelectProps) {
    return (
        <div className="col-md-4 mb-2">
            <div className="mb-2">
                <span className="fw-bold">{label}:</span>
            </div>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="form-select"
            >
                <option value="">All {label.split(' ').pop()}</option>
                {options?.map(option => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}