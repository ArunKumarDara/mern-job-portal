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
import { getAllCompanies } from "../../../apiCalls/company";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";

const { Link } = Typography;

const CompaniesTable = ({
  setOpenDrawer,
  setSelectedCompany,
  selectedCompany,
}) => {
  const [view, setView] = useState(false);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex justify-start items-center">
          <Avatar src={record.logo} />
          <h1 className="ml-2 text-sm font-medium">{text}</h1>
        </div>
      ),
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text) => (
        <Link href={text} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setView(true), setSelectedCompany(record);
            }}
          >
            View
          </a>
          <a
            onClick={() => {
              setOpenDrawer(true), setSelectedCompany(record);
            }}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "Website",
      children: (
        <Link href={selectedCompany.website} target="_blank">
          {selectedCompany.website}
        </Link>
      ),
    },
    {
      key: "2",
      label: "Location",
      children: selectedCompany.location,
    },
    {
      key: "3",
      label: "Employees",
      children: selectedCompany.employees,
    },
    {
      key: "4",
      label: "Created At",
      children: moment(selectedCompany.createdAt).format("YYYY-MM-DD"),
    },
  ];

  const {
    data: companies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
  });

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : (
        <Table columns={columns} dataSource={companies.data} />
      )}
      {view && (
        <Modal open={view} footer={null} onCancel={() => setView(false)}>
          <div>
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="flex justify-start items-center gap-2">
                <Avatar src={selectedCompany.logo} size="large" />
                <h1 className="font-semibold text-lg">
                  {selectedCompany.name}
                </h1>
              </div>
              <p className="text-sm text-gray-500">
                {selectedCompany.description}
              </p>
            </div>
            <Divider />
            <Descriptions items={items} column={1} />
          </div>
        </Modal>
      )}
    </div>
  );
};
export default CompaniesTable;
