import { useParams } from "react-router-dom";
import { Avatar, Card, Descriptions, Divider, message, Tag } from "antd";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { getJob } from "../apiCalls/job";
import Loading from "../components/Loading";
import { EnvironmentOutlined } from "@ant-design/icons";
import moment from "moment";

const JobDescription = () => {
  //   const { user } = useSelector((store) => store.auth);
  //   const isIntiallyApplied =
  //     singleJob?.applications?.some(
  //       (application) => application.applicant === user?._id
  //     ) || false;
  //   const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const isApplied = false;

  const {
    data: job,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["job"],
    queryFn: () => getJob(jobId),
  });

  if (error) return message.error(error.message);

  console.log(job);

  const now = moment();
  const createdDate = moment(job?.data?.createdAt);

  const items = [
    {
      key: "1",
      label: "Role",
      children: job?.data.title,
    },
    {
      key: "2",
      label: "Job Type",
      children: job?.data.jobType,
    },
    {
      key: "3",
      label: "Location",
      children: job?.data.location,
    },
    {
      key: "4",
      label: "Description",
      children: job?.data.description,
    },
    {
      key: "5",
      label: "Skills Required",
      children: job?.data.requirements.map((skill) => (
        <Tag
          color="success"
          className="pl-4 font-normal text-gray-800"
          key={skill}
        >
          {skill}
        </Tag>
      )),
    },
    {
      key: "6",
      label: "Experience",
      children: job?.data.experienceLevel + "+ years",
    },
    {
      key: "7",
      label: "Salary",
      children: job?.data.salary + " LPA",
    },
    {
      key: "8",
      label: "Total Applicants",
      children: job?.data.positions,
    },
    {
      key: "9",
      label: "Posted Date",
      children: moment(job?.data.createdAt).format(
        "dddd, MMMM Do YYYY, h:mm:ss a"
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 md:pt-24 pt-20">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-4">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="flex justify-start items-center gap-2">
                  <Avatar
                    shape="square"
                    src="https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg"
                  />
                  <h1 className="font-medium text-lg">
                    {job.data.company.name}
                  </h1>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-bold text-xl mb-1">{job.data.title}</h1>
                    <p className="text-sm text-gray-400">
                      <EnvironmentOutlined className="mr-1" />
                      {job.data.location}
                      <span> · </span>
                      <span> {createdDate.from(now)}</span>
                    </p>
                    <div className="flex justify-start items-center gap-2 mt-4">
                      <Tag color="purple">{`${job.data.salary} LPA`}</Tag>
                      <Tag color="green">{`${job.data.positions} Positions`}</Tag>
                      <Tag color="magenta">{`${job.data.experienceLevel}+ year exp`}</Tag>
                    </div>
                  </div>
                  {/* <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                  className={`rounded-lg ${
                    isApplied
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-[#7209b7] hover:bg-[#5f32ad]"
                  }`}
                >
                  {isApplied ? "Already Applied" : "Apply Now"}
                </Button> */}
                  <button
                    type="submit"
                    className="md:w-36 w-28 font-medium md:font-semibold border-2 text-white bg-[#6A38C2] rounded-md p-2 hover:shadow-md"
                  >
                    Apply
                  </button>
                </div>
                <Divider />
                <Descriptions
                  title="About the Job"
                  items={items}
                  column={1}
                  className="mb-4"
                />
              </>
            )}
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default JobDescription;
