import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      const originalRequest = error.config;

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/token/refresh`,
          {
            refreshToken: refreshToken,
          }
        );

        const newAccessToken = response.data.data.jwt;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = "Bearer " + newAccessToken;

        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
