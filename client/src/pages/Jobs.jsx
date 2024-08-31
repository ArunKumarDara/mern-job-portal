import { Card, List, notification, Tag, Button, Spin } from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  PushpinFilled,
  FilterOutlined,
  PushpinOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToList, removeFromList } from "../store/watchListSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "../apiCalls/job";
import Footer from "./Footer";

const Jobs = () => {
  const { user } = useSelector((state) => state.users);
  const { watchList } = useSelector((state) => state.watchList);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: jobs,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return lastPage.nextPage;
    },
  });

  if (status === "error")
    return <p>Error fetching latest jobs: {error.message}</p>;

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
  const allJobs = jobs?.pages.flatMap((page) => page.data) || [];
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 md:pt-20 pt-20">
        <div className="max-w-4xl mx-auto">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex justify-start items-center gap-3">
                <ArrowLeftOutlined
                  className="cursor-pointer"
                  size="large"
                  onClick={() => navigate(-1)}
                />
                <h1 className="font-semibold text-lg">Jobs</h1>
              </div>
              <Button icon={<FilterOutlined />}>Filter</Button>
            </div>
            {status === "pending" ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 2,
                  xxl: 3,
                }}
                dataSource={allJobs}
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
        </div>
        <div className="w-full flex justify-center items-center mb-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </Button>
        </div>
        <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Jobs;
