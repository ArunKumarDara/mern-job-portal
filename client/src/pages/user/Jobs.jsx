import {
  Card,
  List,
  notification,
  Tag,
  Button,
  Spin,
  Drawer,
  Form,
  Radio,
  Select,
} from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  PushpinFilled,
  FilterOutlined,
  PushpinOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToList, removeFromList } from "../../store/watchListSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "../../apiCalls/job";
import Footer from "../../components/Footer";
import { useState } from "react";

const Jobs = () => {
  const { user } = useSelector((state) => state.users);
  const { watchList } = useSelector((state) => state.watchList);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [filter, setFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({});
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
    refetch,
  } = useInfiniteQuery({
    queryKey: ["jobs", filterValues],
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

  const onFinish = (values) => {
    setFilter(false);
    if (values.salaryRange) {
      values.salaryRange = JSON.stringify(values.salaryRange);
    }
    if (values.experience) {
      values.experience = JSON.stringify(values.experience);
    }
    setFilterValues(values);
    refetch();
  };

  const handleClearFilter = () => {
    setFilter(false);
    form.resetFields();
    setFilterValues({});
    refetch();
  };

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
              <Button icon={<FilterOutlined />} onClick={() => setFilter(true)}>
                Filter
              </Button>
            </div>
            {status === "pending" ? (
              <div className="w-full flex justify-center items-center">
                <Spin indicator={<LoadingOutlined spin />} />
              </div>
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
      {filter && (
        <Drawer
          title="Filter Job Preference"
          open={filter}
          onClose={() => setFilter(false)}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={filterValues}
          >
            <Form.Item label="Location" name="location">
              <Select size="large" allowClear>
                {["Delhi", "Bangalore", "Hyderabad", "Mumbai", "Chennai"].map(
                  (city) => (
                    <Select.Option key={city} value={city}>
                      {city}
                    </Select.Option>
                  )
                )}
              </Select>
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Select size="large" allowClear>
                {[
                  "Frontend Developer",
                  "Backend Developer",
                  "Full Stack Developer",
                  "Data Scientist",
                ].map((role) => (
                  <Select.Option key={role} value={role}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Salary(LPA)" name="salaryRange">
              <Radio.Group
                size="large"
                className="flex flex-col justify-start items-start gap-1"
              >
                <Radio value={[3, 5]}> 3 - 5 </Radio>
                <Radio value={[5, 10]}> 5 - 10 </Radio>
                <Radio value={[10]}> 10+ </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Experience" name="experience">
              <Radio.Group
                size="large"
                className="flex flex-col justify-start items-start gap-1"
              >
                <Radio value={[0, 1]}>Fresher</Radio>
                <Radio value={[1, 3]}>1 to 3 Years</Radio>
                <Radio value={[3, 10]}> 3+ Years </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <div>
                <button
                  type="submit"
                  className="w-full font-semibold text-white bg-[#6A38C2] rounded-md mb-3 p-3 hover:shadow-md"
                >
                  FILTER
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleClearFilter}
                  className="w-full font-semibold text-red-500 border border-red-500 rounded-md mb-3 p-3 hover:shadow-md"
                >
                  CLEAR FILTER
                </button>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </div>
  );
};

export default Jobs;
