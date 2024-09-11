import { Drawer } from "antd";
import CompaniesTable from "../../admin/companies/CompaniesTable";
import Navbar from "../../../components/Navbar";
import CompanyForm from "../../admin/companies/CompanyForm";
import { useState } from "react";

const Companies = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 md:pt-24 pt-24 h-[100vh]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-xl">Companies</h1>
            <button
              onClick={() => setOpenDrawer(true)}
              type="button"
              className="font-medium hover:text-white text-[#6A38C2] pl-2 pr-2 bg-white  border-2 border-[#6A38C2] hover:bg-[#6A38C2] rounded-sm p-1 hover:shadow-md"
            >
              New Company
            </button>
          </div>
          <CompaniesTable
            setOpenDrawer={setOpenDrawer}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
        </div>
      </div>
      {openDrawer && (
        <Drawer
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false), setSelectedCompany({});
          }}
          title="Add Company"
        >
          <CompanyForm
            setOpenDrawer={setOpenDrawer}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
        </Drawer>
      )}
    </div>
  );
};

export default Companies;
