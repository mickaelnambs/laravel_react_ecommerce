export const env = {
    API_URL: import.meta.env.VITE_API_URL,
    NODE_ENV: import.meta.env.MODE,
    STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY
} as const;