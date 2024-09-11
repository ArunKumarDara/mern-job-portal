/* eslint-disable react/prop-types */
import {
  Avatar,
  Space,
  Table,
  Typography,
  Spin,
  Modal,
  Descriptions,
  Divider,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";
import { getAdminJobs } from "../../../apiCalls/job";

const { Link } = Typography;

const JobTable = ({ setOpenDrawer, setSelectedJob, selectedJob }) => {
  const [view, setView] = useState(false);

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
        <Space size="middle">
          <a
            onClick={() => {
              setView(true), setSelectedJob(record);
            }}
          >
            View
          </a>
          <a
            onClick={() => {
              setOpenDrawer(true), setSelectedJob(record);
            }}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  //   const items = [
  //     {
  //       key: "1",
  //       label: "Website",
  //       children: (
  //         <Link href={selectedJob.website} target="_blank">
  //           {selectedJob.website}
  //         </Link>
  //       ),
  //     },
  //     {
  //       key: "2",
  //       label: "Location",
  //       children: selectedJob.location,
  //     },
  //     {
  //       key: "3",
  //       label: "Employees",
  //       children: selectedJob.employees,
  //     },
  //     {
  //       key: "4",
  //       label: "Created At",
  //       children: moment(selectedJob.createdAt).format("YYYY-MM-DD"),
  //     },
  //   ];

  const {
    data: adminJobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminJobs"],
    queryFn: getAdminJobs,
  });

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;
  //   console.log(adminJobs);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : (
        <Table columns={columns} dataSource={adminJobs.data} />
      )}
      {view && (
        <Modal open={view} footer={null} onCancel={() => setView(false)}>
          <div>
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="flex justify-start items-center gap-2">
                <Avatar src={selectedJob.logo} size="large" />
                <h1 className="font-semibold text-lg">{selectedJob.name}</h1>
              </div>
              <p className="text-sm text-gray-500">{selectedJob.description}</p>
            </div>
            <Divider />
            {/* <Descriptions items={items} column={1} /> */}
          </div>
        </Modal>
      )}
    </div>
  );
};
export default JobTable;
