import { ReactNode } from 'react';

type AlertType = 'success' | 'danger' | 'warning' | 'info';

interface AlertProps {
    type: AlertType;
    content: ReactNode;
}

export default function Alert({ type, content }: AlertProps) {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return 'bi-check-circle';
            case 'danger':
                return 'bi-exclamation-triangle';
            case 'warning':
                return 'bi-exclamation-triangle';
            case 'info':
                return 'bi-info-circle';
            default:
                return 'bi-exclamation-triangle';
        }
    };

    return (
        <div className="row mt-4">
            <div className="col-md-8 mx-auto">
                <div className={`alert alert-${type} d-flex align-items-center`}>
                    <i className={`bi ${getIcon()} me-2`}></i>
                    <div>{content}</div>
                </div>
            </div>
        </div>
    );
}