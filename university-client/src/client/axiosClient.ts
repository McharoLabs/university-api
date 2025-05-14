import axios from "axios";
import { REDIRECT_PATH, VITE_ACCESS_TOKEN } from "../constants/localStorage";
import { VITE_API_URL } from "../constants/baseApi";
import { pathToRegexp } from "path-to-regexp";

const axiosClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const protectedEndpointPatterns = [""];

const protectedRoutes = protectedEndpointPatterns.map(
  (pattern) => pathToRegexp(pattern).regexp
);

axiosClient.interceptors.request.use(
  (config) => {
    if (
      config.url &&
      protectedRoutes.some((regex) => regex.test(config.url!))
    ) {
      const token = localStorage.getItem(VITE_ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      sessionStorage.setItem(REDIRECT_PATH, window.location.pathname);
      window.location.href = "";
    }

    return Promise.reject(error);
  }
);

export { axiosClient };
