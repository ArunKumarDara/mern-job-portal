import axiosInstance from ".";

export const registerUser = async (payload) => {
  const response = await axiosInstance.post("/user/signup", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/user/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const uploadProfilePhoto = async (payload) => {
  try {
    const response = await axiosInstance.put("/user/uploadProfilePic", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/user/getUser", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProfile = async (payload) => {
  try {
    const response = await axiosInstance.post("/user/updateProfile", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
