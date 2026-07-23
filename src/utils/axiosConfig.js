import axios from "axios";

let accessTokenMemory = null;

const getAccessToken = () => accessTokenMemory;

const setAccessToken = (token) => {
  accessTokenMemory = token || null;
};

const apiClient = axios.create({
  baseURL: "https://pingx-gateway.onrender.com/api",
  withCredentials: true,
});

const authClient = axios.create({
  baseURL: "https://pingx-gateway.onrender.com/auth",
  withCredentials: true,
});

// Request Interceptors - attach Authorization Bearer token header if available
const attachAuthToken = (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiClient.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error));
authClient.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error));

// Response Interceptors
const handleAuthError = async (error, client) => {
  const originalRequest = error.config;

  if (!originalRequest || originalRequest.url.includes("/refresh") || originalRequest.url.includes("/login")) {
    return Promise.reject(error);
  }

  const isAuthPage =
    window.location.pathname.includes("/login") ||
    window.location.pathname.includes("/register") ||
    window.location.pathname.includes("/verify");

  if (originalRequest._retry === true) {
    setAccessToken(null);
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
      const response = await authClient.post("/refresh");
      const newAccessToken = response.data?.accessToken;

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      }
    } catch (err) {
      setAccessToken(null);
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
  (response) => response,
  async (error) => handleAuthError(error, authClient)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => handleAuthError(error, apiClient)
);

export { authClient, apiClient, getAccessToken, setAccessToken };
