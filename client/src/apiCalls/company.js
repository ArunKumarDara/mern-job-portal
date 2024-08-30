import axiosInstance from ".";

export const getAllCompanies = async () => {
  try {
    const response = await axiosInstance.get("/company/getAllCompanies");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
