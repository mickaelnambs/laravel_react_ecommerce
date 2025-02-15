import { LoginCredentials, RegisterUser, User, UserInfos } from "../types";
import { LoginResponse, ProfileUpdateResponse, RegisterResponse } from "./types";
import axiosInstance from "../../../services/axios.instance";
import { getConfig } from "../../../utils/config";
import { CouponInput, CouponResponse } from "../../coupons/types";

export const authApi = {
    register: async (userData: RegisterUser): Promise<RegisterResponse> => {
        const response = await axiosInstance.post('user/register', userData);
        return response.data;
    },

    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>('user/login', credentials);
        return response.data;
    },

    getCurrentUser: async (token: string): Promise<{ user: User }> => {
        const response = await axiosInstance.get('user', getConfig(token));
        return response.data;
    },

    logout: async (token: string): Promise<{ message: string }> => {
        const response = await axiosInstance.post('user/logout', null, getConfig(token));
        return response.data;
    },

    applyCoupon: async (coupon: CouponInput, token: string): Promise<CouponResponse> => {
        const response = await axiosInstance.post('apply/coupon', coupon, getConfig(token));
        return response.data;
    },

    updateProfileImage: async (formData: FormData, token: string): Promise<ProfileUpdateResponse> => {
        const response = await axiosInstance.post(
            'user/profile/update',
            formData,
            getConfig(token, 'multipart/form-data')
        );
        return response.data;
    },

    updateProfile: async (userInfos: UserInfos, token: string): Promise<ProfileUpdateResponse> => {
        const response = await axiosInstance.put(
            'user/profile/update',
            userInfos,
            getConfig(token)
        );
        return response.data;
    }
};