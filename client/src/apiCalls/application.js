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

export const getApplications = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/application/get/${jobId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateApplicationStatus = async (payload) => {
  try {
    const { status, applicationId } = payload;
    const response = await axiosInstance.post(
      `/application/${applicationId}/status/update`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
