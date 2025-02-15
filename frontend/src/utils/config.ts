interface Config {
    headers: {
        "Content-type": string;
        "Authorization": string;
    };
}

export const getConfig = (token: string, contentType?: string): Config => {
    const config: Config = {
        headers: {
            "Content-type": contentType || "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    return config;
};