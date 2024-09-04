import axiosInstance from ".";

export const applyJob = async (payload) => {
  try {
    const { job, applicant } = payload;
    const response = await axiosInstance.post(
      `application/apply/${job}`,
      applicant
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
