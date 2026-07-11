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

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post("/users/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data.data;
}

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

export const getUserProfileById = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);

  return response.data;
}
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

  return response.data.user;
};

export const logoutUser = async () => {
  const response = await authClient.post("/logout");
  return response;
};

export const checkCurrentUser = async () => {

  const response = await authClient.get("/me");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.user;
};
