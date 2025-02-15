import axios from 'axios';

export const backendURL = 'https://nft-market-as0q.onrender.com';

const axiosInstance = axios.create({
    baseURL: `${backendURL}/auth`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;