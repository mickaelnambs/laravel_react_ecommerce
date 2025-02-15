import { FormEvent, useEffect, useState } from "react";
import { RegisterUser } from "../types";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { toast } from "react-toastify";
import Spinner from "../../../components/ui/Spinner/Spinner";
import useValidations from "../../../hooks/useValidations";
import { useAppSelector } from "../../../redux/store";

interface ValidationErrors {
    [key: string]: string[];
}

export default function Register() {
    const { isLoggedIn } = useAppSelector(state => state.user);
    const [user, setUser] = useState<RegisterUser>({
        name: '',
        email: '',
        password: ''
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [isLoggedIn]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const registerNewUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authApi.register(user);
            toast.success(response.message);
            navigate('/login')
        } catch (error: any) {
            if (error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors);
            } else {
                toast.error('Register failed');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="row my-5">
            <div className="col-md-6 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            Register
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={registerNewUser}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name*</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                                {useValidations(validationErrors, 'name')}
                            </div>
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
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
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