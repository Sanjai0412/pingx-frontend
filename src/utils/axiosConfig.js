import axios from "axios";

// Request Interceptors

const apiClient = axios.create({
  baseURL: "https://pingx-backend-gsb2.onrender.com/api",
  withCredentials: true,
});
const authClient = axios.create({
  baseURL: "https://auth-service-lgiu.onrender.com/auth",
  withCredentials: true,
});
//=====================================================================

// Response Interceptors

// To handle refresh token error
const handleAuthError = async (error, client) => {
  const originalRequest = error.config;

  if (originalRequest.url.includes("/refresh")) {
    return Promise.reject(error);
  }
  if (!originalRequest) {
    return Promise.reject(error);
  }

  const isAuthPage =
    window.location.pathname.includes("/login") ||
    window.location.pathname.includes("/register") ||
    window.location.pathname.includes("/verify");

  if (originalRequest._retry == true) {
    if (!isAuthPage) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }

  const status = error.response?.status;
  const message = error.response?.data?.message;

  const isAuthError =
    status === 401 ||
    (status === 403 && message === "Invalid or expired token");

  if (isAuthError && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      await authClient.post("/refresh");

      return client(originalRequest);
    } catch (err) {
      if (!isAuthPage) {
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
};

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
