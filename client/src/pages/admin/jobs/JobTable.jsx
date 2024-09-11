/* eslint-disable react/prop-types */
import { Avatar, Table, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { getAdminJobs } from "../../../apiCalls/job";
import { useNavigate } from "react-router-dom";

const JobTable = ({ setOpenDrawer, setSelectedJob }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company",
      key: "name",
      render: (text, record) => (
        <div className="flex justify-start items-center">
          <Avatar src={record.company.logo} />
          <h1 className="ml-2 text-sm font-medium">{text.name}</h1>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "title",
      key: "title",
      render: (text) => <h1 className="ml-2 text-sm font-medium">{text}</h1>,
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
        <div className="flex justify-center items-center flex-col gap-2">
          <a onClick={() => navigate(`/admin/jobs/${record._id}`)}>
            Applications
          </a>
          <a
            onClick={() => {
              setOpenDrawer(true), setSelectedJob(record);
            }}
          >
            Edit
          </a>
        </div>
      ),
    },
  ];

  const {
    data: adminJobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminJobs"],
    queryFn: getAdminJobs,
  });

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : (
        <Table columns={columns} dataSource={adminJobs.data} />
      )}
    </div>
  );
};
export default JobTable;
