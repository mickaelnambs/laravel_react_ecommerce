import axiosInstance from "../../../services/axios.instance";
import { getConfig } from "../../../utils/config";
import { Review } from "../types";
import { ReviewResponse } from "./types";

export const reviewApi = {
    addReview: async (review: Review, token: string): Promise<ReviewResponse> => {
        const response = await axiosInstance.post(
            'review/store',
            review,
            getConfig(token)
        );
        return response.data;
    },

    deleteReview: async (review: Review, token: string): Promise<ReviewResponse> => {
        const response = await axiosInstance.post(
            'review/delete',
            review,
            getConfig(token)
        );
        return response.data;
    },

    updateReview: async (review: Review, token: string): Promise<ReviewResponse> => {
        const response = await axiosInstance.post(
            'review/update',
            review,
            getConfig(token)
        );
        return response.data;
    }
};