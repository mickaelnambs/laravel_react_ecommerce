import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { UserInfos } from '../types';
import { authApi } from '../api/authApi';
import { setCurrentUser } from '../../../redux/slices/userSlice';
import Spinner from '../../../components/ui/Spinner/Spinner';

interface UpdateUserInfosProps {
    profile?: boolean;
}

export default function UpdateUserInfos({ profile }: UpdateUserInfosProps) {
    const { user, token } = useAppSelector(state => state.user);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const [userInfos, setUserInfos] = useState<UserInfos>({
        phone_number: user?.phone_number || null,
        address: user?.address || null,
        city: user?.city || null,
        country: user?.country || null,
        zip_code: user?.zip_code || null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfos(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateUserInfos = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return;

        setLoading(true);
        try {
            const response = await authApi.updateProfile(userInfos, token);
            dispatch(setCurrentUser(response.user));
            toast.success(response.message);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-md-8">
            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <h5 className="text-center mt-2">
                        {profile ? 'User Details' : 'Billing Details'}
                    </h5>
                </div>
                <div className="card-body">
                    <form className="mt-5" onSubmit={updateUserInfos}>
                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">Phone Number*</label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={userInfos.phone_number || ''}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address*</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={userInfos.address || ''}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zip_code" className="form-label">Zip Code*</label>
                            <input
                                type="text"
                                id="zip_code"
                                name="zip_code"
                                value={userInfos.zip_code || ''}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City*</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={userInfos.city || ''}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country*</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={userInfos.country || ''}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        {loading ? (
                            <Spinner />
                        ) : (!user?.profile_completed || profile) ? (
                            <button type="submit" className="btn btn-dark btn-sm">
                                Submit
                            </button>
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    );
}