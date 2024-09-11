import { Drawer } from "antd";
import Navbar from "../../../components/Navbar";
import { useState } from "react";
import JobForm from "./JobForm";
import JobTable from "./JobTable";

const AdminJobs = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 md:pt-24 pt-24 h-[100vh]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-xl">Jobs</h1>
            <button
              onClick={() => setOpenDrawer(true)}
              type="button"
              className="font-medium hover:text-white text-[#6A38C2] pl-2 pr-2 bg-white  border-2 border-[#6A38C2] hover:bg-[#6A38C2] rounded-sm p-1 hover:shadow-md"
            >
              New Job
            </button>
          </div>
          <JobTable
            setOpenDrawer={setOpenDrawer}
            setSelectedJob={setSelectedJob}
          />
        </div>
      </div>
      {openDrawer && (
        <Drawer
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false), setSelectedJob({});
          }}
          title="Add Job"
        >
          <JobForm
            setOpenDrawer={setOpenDrawer}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
        </Drawer>
      )}
    </div>
  );
};

export default AdminJobs;
