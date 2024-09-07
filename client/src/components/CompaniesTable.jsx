import { Avatar, Space, Table, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Navbar";
import { getAllCompanies } from "../apiCalls/company";

const { Link } = Typography;

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
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Employees",
    dataIndex: "employees",
    key: "employees",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>View</a>
        <a>Edit</a>
      </Space>
    ),
  },
];
const CompaniesTable = () => {
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
        <Loading />
      ) : (
        <Table columns={columns} dataSource={companies.data} />
      )}
    </div>
  );
};
export default CompaniesTable;
