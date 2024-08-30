import { Card, List, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getLatestJobs } from "../apiCalls/job";
import {
  PushpinOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import moment from "moment";

const LatestJobs = () => {
  const navigate = useNavigate();
  const {
    data: latestJobs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["latestJobs"],
    queryFn: getLatestJobs,
  });

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;

  const now = moment();

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mt-5 mb-5">
        Latest & Top<span className="text-[#6A38C2]"> Job Openings</span>
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <List
          grid={{
            gutter: 12,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
          dataSource={latestJobs.data.slice(0, 6)}
          renderItem={(job) => (
            <List.Item>
              <Card
                className="cursor-pointer"
                hoverable
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="font-medium text-lg">{job.title}</h1>
                    <p className="text-sm">
                      <HomeOutlined className="mr-2" />
                      {job.company.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <EnvironmentOutlined className="mr-2" />
                      {job.location}
                      <span> · </span>
                      <span> {moment(job.createdAt).from(now)}</span>
                    </p>
                  </div>
                  <div className="rounded-full border border-gray-200 hover:bg-gray-200">
                    <PushpinOutlined size="large" className="p-2" />
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2 mt-3">
                  <Tag color="purple">{`${job.salary} LPA`}</Tag>
                  <Tag color="green">{`${job.positions} Positions`}</Tag>
                  <Tag color="magenta">{`${job.experienceLevel}+ year exp`}</Tag>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default LatestJobs;
