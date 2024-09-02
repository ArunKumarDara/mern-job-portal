import { Card, List, Tag, notification, Input, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getLatestJobs } from "../apiCalls/job";
import {
  PushpinOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PushpinFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { addToList, removeFromList } from "../store/watchListSlice";
import { useState } from "react";

const { Search } = Input;

const items = [
  "Fullstack Developer",
  "Backend Developer",
  "Frontend Developer",
  "Data Scientist",
];

const LatestJobs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const { watchList } = useSelector((state) => state.watchList);
  const [api, contextHolder] = notification.useNotification();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const {
    data: latestJobs,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["latestJobs", search],
    queryFn: () => getLatestJobs(search),
  });

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;

  const handleWatchList = (job) => {
    if (watchList.some((item) => item._id === job._id)) {
      dispatch(removeFromList(job));
    } else {
      dispatch(addToList(job));
    }
  };

  const openNotification = (placement) => {
    api.error({
      message: "Login Required",
      description:
        "Please log in to add jobs to your watchlist and keep track of your favorite opportunities.",
      placement,
    });
  };

  const now = moment();

  const onSearch = (value) => {
    setSearch(value);
    refetch();
  };

  return (
    <div>
      <div className="flex justify-center mt-4">
        <Search
          value={search}
          allowClear
          className="w-full md:w-[40vw]"
          placeholder="Search Jobs here!!"
          onSearch={onSearch}
          onChange={(e) => setSearch(e.target.value)}
          enterButton
          size="large"
        />
      </div>
      <div className="flex justify-center items-center gap-5 mt-3">
        {items.map((item) => (
          <div
            onClick={() => setSearch(item)}
            key={item}
            className="cursor-pointer rounded-full bg-sky-50 border border-sky-50 dark:text-sky-300 px-2  py-0.5"
          >
            {item}
          </div>
        ))}
      </div>
      <h1 className="text-xl md:text-2xl font-bold mt-5 mb-5">
        Latest & Top<span className="text-[#6A38C2]"> Job Openings</span>
      </h1>
      {isLoading ? (
        <Spin indicator={<LoadingOutlined spin />} />
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
          dataSource={latestJobs.data}
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
                    <p className="text-sm mb-2">
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
                  <>
                    {contextHolder}
                    <div
                      className="rounded-full border border-gray-200 hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        {
                          !user
                            ? openNotification("topRight")
                            : handleWatchList(job);
                        }
                      }}
                    >
                      {watchList.some((item) => item._id === job._id) ? (
                        <PushpinFilled size="large" className="p-2" />
                      ) : (
                        <PushpinOutlined size="large" className="p-2" />
                      )}
                    </div>
                  </>
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
