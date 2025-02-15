import { User } from "../types";

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface LoginResponse {
    message?: string;
    error?: string;
    user: User;
    access_token: string;
}

export interface ProfileUpdateResponse {
    message: string;
    user: User;
}