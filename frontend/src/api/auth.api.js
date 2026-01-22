import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.accessToken;

        localStorage.setItem("token", newAccessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};
