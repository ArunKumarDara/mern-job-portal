import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Avatar, Badge, Button } from "antd";
import {
  EditOutlined,
  ContactsOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import AppliedJobTable from "./AppliedJobs";
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.users);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 md:pt-16 md:pl-12 md:pr-12 pt-16 pl-6 pr-6">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-5 mt-4">
          <div className="flex justify-between">
            <div className="flex justify-start items-center gap-3">
              <Avatar
                className="h-20 w-20"
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
              <div>
                <h1 className="font-medium text-xl">{user?.fullName}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </div>
            <Button onClick={() => setOpen(true)} size="small">
              <EditOutlined />
            </Button>
          </div>
          <div className="my-5">
            <div className="flex items-center gap-3 my-2">
              <FileDoneOutlined />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <ContactsOutlined />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <h1 className="text-md font-bold">Resume</h1>
            {isResume ? (
              <a
                target="blank"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-3">
          <h1 className="font-bold text-lg p-3">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>
      {/* <UpdateProfileDialog open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default Profile;
