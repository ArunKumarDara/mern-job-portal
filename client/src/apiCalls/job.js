import axiosInstance from ".";

export const getLatestJobs = async () => {
  try {
    const response = await axiosInstance.get("/job/getAllJobs");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getJob = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/job/${jobId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
