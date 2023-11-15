import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  user: string;
  exp: number;
}

const BASE_URL = "https://api.fublog.tech";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
var store: boolean = false;

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = null;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
      store = true;
    } else {
      if (sessionStorage.getItem("token")) {
        token = sessionStorage.getItem("token");
        store = false;
      }
    }

    if (token) {
      const exp: User = jwtDecode(token);
      if (exp.exp < Date.now() / 1000) {
        // Token is expired, refresh it

        await refreshAccessToken().then((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`;
          return config;
        });
        // .catch((err) => {
        //     // Handle token refresh failure, e.g., redirect to login page
        //     console.error('Failed to refresh token:', err);
        //     // Clear tokens and redirect to login
        //     localStorage.clear();
        //     // You may want to add code here to handle the redirect
        // })

        return config;
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

async function refreshAccessToken(): Promise<string> {
  const refreshToken = store
    ? localStorage.getItem("refreshToken")
    : sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    return Promise.reject("No refresh token available");
  }

  return await fetch("https://api.fublog.tech/api/v1/auth/refreshToken", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        store
          ? localStorage.getItem("refreshToken")
          : sessionStorage.getItem("refreshToken")
      }`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("freshen token successfully");
        return response.json();
      } else {
        throw new Error("Failed to refresh token");
      }
    })
    .then((data) => {
      const newToken = data.token;
      if (store === true) localStorage.setItem("token", newToken);
      else if (store === false) sessionStorage.setItem("token", newToken);
      return newToken;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default axiosInstance;
