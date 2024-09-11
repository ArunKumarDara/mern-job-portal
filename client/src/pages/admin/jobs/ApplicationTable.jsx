import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../../../apiCalls/application";
import { useParams } from "react-router-dom";
import { Table, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const ApplicationTable = () => {
  const params = useParams();
  const jobId = params.id;
  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplications(jobId),
  });

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;

  console.log(applications);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "name",
      render: (text, record) => (
        <h1 className="ml-2 text-sm font-medium">
          {record.applicant.fullName}
        </h1>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <h1 className="ml-2 text-sm font-medium">{record.applicant.email}</h1>
      ),
    },
    {
      title: "Contact",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text, record) => (
        <h1 className="ml-2 text-sm font-medium">
          {record.applicant.phoneNumber}
        </h1>
      ),
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      render: (text, record) =>
        record?.applicant?.profile?.resume ? (
          <a
            target="blank"
            href={record?.applicant?.profile?.resume}
            className="text-blue-500 w-full hover:underline cursor-pointer"
          >
            {record.applicant?.profile?.resumeOriginalName}
          </a>
        ) : (
          "NA"
        ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => (
        <h1 className="ml-2 text-sm font-medium">
          {moment(text).format("YYYY-MM-DD")}
        </h1>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return isLoading ? (
    <div className="flex justify-center items-center">
      <Spin indicator={<LoadingOutlined spin />} />
    </div>
  ) : (
    <Table columns={columns} dataSource={applications.data} />
  );
};

export default ApplicationTable;
