import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store';
import Alert from '../../../components/ui/Alert/Alert';
import ProfileSidebar from './ProfileSidebar';
import { Product } from '../../products/types';
import { Order } from '../types';


export default function UserOrders() {
    const { user, isLoggedIn } = useAppSelector(state => state.user);
    const [ordersToShow, setOrdersToShow] = useState<number>(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const loadMoreOrders = () => {
        if (user?.orders && ordersToShow < user.orders.length) {
            setOrdersToShow(prev => prev + 5);
        }
    };

    if (!user?.orders?.length) {
        return <Alert content="No orders yet" type={"info"} />;
    }

    return (
        <div className="row my-5">
            <ProfileSidebar />
            <div className="col-md-8">
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Ordered Date</th>
                                <th>Delivered Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.orders.slice(0, ordersToShow).map((order: Order, index: number) => (
                                <tr key={order.id}>
                                    <th>{index + 1}</th>
                                    <th>
                                        <div className="d-flex flex-column">
                                            {order.products.map((product: Product) => (
                                                <span key={product.id} className="badge bg-success my-1 rounded-0">
                                                    {product.name}
                                                </span>
                                            ))}
                                        </div>
                                    </th>
                                    <th>
                                        <div className="d-flex flex-column">
                                            {order.products.map((product: Product) => (
                                                <span key={product.id} className="badge bg-danger my-1 rounded-0">
                                                    ${product.price}
                                                </span>
                                            ))}
                                        </div>
                                    </th>
                                    <th>{order.qty}</th>
                                    <th>
                                        <span className="badge bg-secondary my-1 rounded-0">
                                            ${order.total}
                                        </span>
                                    </th>
                                    <th>{order.created_at}</th>
                                    <th>
                                        {order.delivered_at ? (
                                            <span className="badge bg-success my-1 rounded-0">
                                                {order.delivered_at}
                                            </span>
                                        ) : (
                                            <i className="text-muted">
                                                Pending...
                                            </i>
                                        )}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {user.orders.length > ordersToShow && (
                        <div className="d-flex justify-content-center my-3">
                            <button
                                className="btn btn-sm btn-dark"
                                onClick={loadMoreOrders}
                            >
                                <i className="bi bi-arrow-clockwise" />{" "}
                                Load more
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}