import { Bars } from 'react-loader-spinner';

interface SpinnerProps {
    height?: string;
    width?: string;
    color?: string;
}

export default function Spinner({ 
    height = "80",
    width = "80",
    color = "#000" 
}: SpinnerProps) {
    return (
        <div className='d-flex justify-content-center my-5'>
            <Bars
                height={height}
                width={width}
                color={color}
                ariaLabel="loading-indicator"
                visible={true}
            />
        </div>
    );
}