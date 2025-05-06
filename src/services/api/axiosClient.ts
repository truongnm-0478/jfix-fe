import { getAccessToken, getLanguageStorage, getRefreshToken, setAccessToken, setRefreshToken } from "@/utils/storage";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": getLanguageStorage() ?? "vi",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data?.code === 401) {
      const accessToken = getAccessToken();
      if (accessToken) {
        try {
          const refreshToken = getRefreshToken();
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
            { refreshToken }
          );
          const newAccessToken = refreshResponse.data.data.accessToken;
          const newRefreshToken = refreshResponse.data.data.refreshToken;
          if (newAccessToken) {
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            response.config.headers.Authorization = `Bearer ${newAccessToken}`;
            try {
              const newResponse = await axios(response.config);
              return newResponse.data ?? newResponse;
            } catch (error) {
              return Promise.reject(error);
            }
          }
        } catch (refreshError) {
          toast.error("Failed to refresh token: " + refreshError, {
            duration: 4000,
          });
          return Promise.reject(refreshError);
        }
      }
    }

    return response.data ?? response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
