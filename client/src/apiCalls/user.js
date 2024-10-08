import axiosInstance from ".";

export const registerUser = async (payload) => {
  const response = await axiosInstance.post("/user/signup", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/user/login", payload, {
      withCredentials: true,
    });
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
    const response = await axiosInstance.post("/user/updateProfile", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get("/user/logout");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
