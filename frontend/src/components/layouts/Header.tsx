import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { authApi } from '../../features/auth/api/authApi';
import { setCurrentUser, setLoggedInOut, setToken } from '../../redux/slices/userSlice';

export default function Header() {
    const { isLoggedIn, token, user } = useAppSelector(state => state.user);
    const { cartItems } = useAppSelector(state=> state.cart);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const getLoggedInUser = async () => {
        try {
            const response = await authApi.getCurrentUser(token);
            dispatch(setCurrentUser(response.user));
        } catch (error: any) {
            if (error?.response?.status === 401) {
                dispatch(setCurrentUser(null));
                dispatch(setToken(''));
                dispatch(setLoggedInOut(false));
            }
            console.error(error);
        }
    };

    const logoutUser = async () => {
        try {
            const response = await authApi.logout(token);
            dispatch(setCurrentUser(null));
            dispatch(setToken(''));
            dispatch(setLoggedInOut(false));
            toast.success(response.message);
        } catch (error) {
            console.error(error);
            toast.error('Logout failed');
        }
    };

    useEffect(() => {
        if (token) getLoggedInUser();
    }, [token, dispatch]);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-shop h1" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                aria-current="page"
                                to="/"
                            >
                                <i className="bi bi-house" /> Home
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                                        aria-current="page"
                                        to="/profile"
                                    >
                                        <i className="bi bi-person" /> {user?.name}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="#"
                                        onClick={logoutUser}
                                    >
                                        <i className="bi bi-person-fill-down" /> Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                                        aria-current="page"
                                        to="/register"
                                    >
                                        <i className="bi bi-person-add" /> Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                                        aria-current="page"
                                        to="/login"
                                    >
                                        <i className="bi bi-person-fill-up" /> Login
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                                to="/cart"
                            >
                                <i className="bi bi-bag" /> Cart ({cartItems.length})
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}