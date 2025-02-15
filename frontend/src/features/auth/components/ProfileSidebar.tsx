import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { authApi } from "../api/authApi";
import { setCurrentUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useValidations from "../../../hooks/useValidations";

interface ValidationErrors {
    [key: string]: string[];
}

export default function ProfileSidebar() {
    const { user, token } = useAppSelector(state => state.user);
    const [image, setImage] = useState<File | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const fileInput = useRef<HTMLInputElement>(null);

    const updateProfileImage = async (): Promise<void> => {
        if (!image || !token) return;

        setValidationErrors({});
        setLoading(true);

        const formData = new FormData();
        formData.append('profile_image', image);
        formData.append('_method', 'PUT');

        try {
            const response = await authApi.updateProfileImage(formData, token);
            dispatch(setCurrentUser(response.user));
            setImage(null);
            if (fileInput.current) {
                fileInput.current.value = '';
            }
            toast.success(response.message);
        } catch (error: any) {
            if (error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors);
            } else {
                toast.error('Failed to update profile image');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
        }
    };
 
    return (
        <div className="col-md-4">
            <div className="card-p-2">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img
                        src={user?.profile_image}
                        alt={user?.name || 'Profile'}
                        width={150}
                        height={150}
                        className="rounded-circle"
                    />
                    <div className="input-group my-3">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInput}
                            onChange={handleFileChange}
                            className="form-control"
                        />
                        {useValidations(validationErrors, 'profile_image')}
                        {loading ? (
                            <span className="text-danger fw-bold mx-1 mt-1">
                                uploading...
                            </span>
                        ) : (
                            <button 
                                className="btn btn-sm btn-primary"
                                disabled={!image}
                                onClick={updateProfileImage}
                            >
                                Upload
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <ul className="list-group w-100 text-center mt-2">
                <li className="list-group-item">
                    <i className="bi bi-person" /> {user?.name}
                </li>
                <li className="list-group-item">
                    <i className="bi bi-envelope-at-fill" /> {user?.email}
                </li>
                <li className="list-group-item">
                    <Link to="/user/orders" className="text-decoration-none text-dark">
                        <i className="bi bi-bag-check-fill" /> Orders
                    </Link>
                </li>
            </ul>
        </div>
    );
}