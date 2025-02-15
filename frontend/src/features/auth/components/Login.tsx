import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../api/authApi';
import { LoginCredentials } from '../types';
import Spinner from '../../../components/ui/Spinner/Spinner';
import useValidations from '../../../hooks/useValidations';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { setCurrentUser, setLoggedInOut, setToken } from '../../../redux/slices/userSlice';

interface ValidationErrors {
    [key: string]: string[];
}

export default function Login() {
    const { isLoggedIn} = useAppSelector(state => state.user);
    const [user, setUser] = useState<LoginCredentials>({
        email: '',
        password: ''
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [isLoggedIn])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authApi.login(user);
            if (response.error) {
                toast.error(response.error);
            } else {
                dispatch(setCurrentUser(response.user));
                dispatch(setToken(response.access_token));
                dispatch(setLoggedInOut(true));
                toast.success('Login successful');
                navigate('/');
            }
        } catch (error: any) {
            if (error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors);
            } else {
                toast.error('Login failed');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row my-5">
            <div className="col-md-6 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            Login
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={loginUser}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                                {useValidations(validationErrors, 'email')}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password*</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                                {useValidations(validationErrors, 'password')}
                            </div>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <button type="submit" className="btn btn-dark btn-sm">
                                    Submit
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}