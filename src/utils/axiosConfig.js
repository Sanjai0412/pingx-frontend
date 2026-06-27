import axios from "axios";

// Request Interceptors

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const authClient = axios.create({
  baseURL: "http://localhost:3000/auth",
});

authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//=====================================================================

// Response Interceptors

// To handle refresh token error
const handleAuthError = async (error, client) => {
  const originalRequest = error.config; // failed request

  const status = error.response?.status;
  const message = error.response?.data?.message;
  const isAuthError = status === 401 || (status === 403 && message === "Invalid or expired token");
  if (isAuthError && !originalRequest._retry) {

    originalRequest._retry = true; // to prevent infinite loop

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // make refresh request
      const response = await axios.post("http://localhost:3000/auth/refresh", {
        refreshToken
      })

      const { accessToken } = response.data;

      // add new token to original request
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      localStorage.setItem("accessToken", accessToken);

      // retry the request with new token
      return client(originalRequest);
    } catch (err) {
      console.error("Token refresh failed", err);

      // remove tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // redirect to login
      window.location.href = "/login";

      return Promise.reject(err);
    }
  }
  // If not 401 or already tried, return error
  return Promise.reject(error);
}


// for response
authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => handleAuthError(error, authClient),
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => handleAuthError(error, apiClient),
);

export { authClient, apiClient };
