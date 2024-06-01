import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
	baseURL: 'https://utn-portal.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError): Promise<AxiosError> => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => {
		return response;
	},
	(error: AxiosError): Promise<AxiosError> => {
		if (error.response && error.response.status === 401) {
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export default apiClient;
