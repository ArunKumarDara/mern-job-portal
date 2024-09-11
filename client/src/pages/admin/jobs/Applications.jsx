import Navbar from "../../../components/Navbar";
import ApplicationTable from "./ApplicationTable";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 md:pt-24 pt-24 h-[100vh]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex justify-start items-center gap-4">
            <ArrowLeftOutlined onClick={() => navigate(-1)} />
            <h1 className="font-semibold text-xl">Applications</h1>
          </div>
          <ApplicationTable />
        </div>
      </div>
    </div>
  );
};

export default Applications;
