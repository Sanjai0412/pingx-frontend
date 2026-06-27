import { apiClient, authClient } from "../utils/axiosConfig";

export const registerUser = async (username, email, password) => {
  const response = await authClient.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const saveRegister = async (userId, username) => {
  const response = await authClient.post("/users", {
    userId,
    username,
  });
  return response.data;
};

export const saveUserProfile = async ({
  username,
  displayName,
  bio,
  profileImgUrl,
}) => {
  const response = await apiClient.post("/users", {
    username,
    displayName,
    bio,
    profileImgUrl,
  });
  return response.data;
};

export const verifyOtp = async (userId, otp) => {
  const response = await authClient.post("/verify", {
    userId,
    otp,
  });

  return response.data;
};

export const resendOTP = async (userId) => {
  const response = await authClient.post("/resend-otp", {
    userId,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await authClient.post("/login", { email, password });

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response.data.user;
};

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await authClient.post("/logout", {
    refreshToken,
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return response;
};

export const checkCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }
  const response = await authClient.get("/me");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.user;
};
