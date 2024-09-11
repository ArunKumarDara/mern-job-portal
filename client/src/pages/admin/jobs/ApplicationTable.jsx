import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApplications,
  updateApplicationStatus,
} from "../../../apiCalls/application";
import { useParams } from "react-router-dom";
import { Table, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const ApplicationTable = () => {
  const queryClient = useQueryClient();
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

  const { mutate: updateStatus } = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["appliedJobs"] });
      message.success(response.message);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;

  const handleAccept = (applicationId) => {
    updateStatus({ applicationId, status: "accepted" });
  };

  const handleReject = (applicationId) => {
    updateStatus({ applicationId, status: "rejected" });
  };

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
      render: (record) => (
        <div className="flex flex-col justify-center items-center gap-2">
          <a onClick={() => handleAccept(record._id)}>
            {record.status === "accepted" ? "Accepted" : "Accept"}
          </a>
          <a onClick={() => handleReject(record._id)}>
            {record.status === "rejected" ? "Rejected" : "reject"}
          </a>
        </div>
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
