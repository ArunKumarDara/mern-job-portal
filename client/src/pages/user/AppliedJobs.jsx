import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Spin } from "antd";
import { getAppliedJobs } from "../../apiCalls/application";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const AppliedJobTable = () => {
  const {
    data: appliedJobs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: getAppliedJobs,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => <a>{moment(text).format("MMM Do YY")}</a>,
    },
    {
      title: "Job Role",
      key: "title",
      render: (record) => <a>{record?.job?.title}</a>,
    },
    {
      title: "Company",
      key: "company",
      render: (record) => <a>{record?.job?.company?.name}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "accepted") {
          return <Tag color="success">Accepted</Tag>;
        } else if (status === "rejected") {
          return <Tag color="error">Rejected</Tag>;
        } else if (status === "pending") {
          return <Tag color="processing">Pending</Tag>;
        } else {
          return <Tag color="default">Unknown</Tag>;
        }
      },
    },
  ];
  return <Table dataSource={appliedJobs?.data} columns={columns} />;
};
export default AppliedJobTable;
