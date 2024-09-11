import axiosInstance from ".";

export const getAllCompanies = async () => {
  try {
    const response = await axiosInstance.get("/company/getAllCompanies");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getCompaniesByUser = async () => {
  try {
    const response = await axiosInstance.get("/company/getCompaniesByUser");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const addCompany = async (payload) => {
  try {
    const response = await axiosInstance.post("/company/register", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateCompany = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/company/update/${payload.id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.messages;
  }
};
