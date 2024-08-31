import axiosInstance from ".";

export const getLatestJobs = async () => {
  try {
    const response = await axiosInstance.get(`/job/latestJobs?limit=6`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getJobs = async ({ pageParam }) => {
  try {
    console.log(pageParam);
    const response = await axiosInstance.get(
      `/job/getAllJobs?page=${pageParam}&limit=10`
    );
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
