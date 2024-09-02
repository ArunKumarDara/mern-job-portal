import axiosInstance from ".";

export const getLatestJobs = async (search) => {
  try {
    const response = await axiosInstance.get(
      `/job/latestJobs?search=${search}&limit=6`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getJobs = async ({ pageParam, queryKey }) => {
  try {
    const { experience, location, role, salaryRange } = queryKey[1];
    const response = await axiosInstance.get(
      `/job/getAllJobs?page=${pageParam}&limit=10&role=${role || ""}&location=${
        location || ""
      }&experience=${experience || ""}&salary=${salaryRange || ""}`
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
