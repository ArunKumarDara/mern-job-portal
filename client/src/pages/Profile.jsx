import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Badge, Drawer, Upload, message } from "antd";
import {
  EditOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import AppliedJobTable from "./AppliedJobs";
import UpdateProfile from "./UpdateProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, uploadProfilePhoto } from "../apiCalls/user";
import Loading from "../components/Loading";
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser({ userId: user?._id }),
  });

  const { mutate: uploadPhoto } = useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setLoading(false);
      message.success(response.message);
    },
    onError: (error) => {
      setLoading(false);
      message.error(error.message);
    },
  });
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      const formData = new FormData();
      formData.append("profilePic", info.file.originFileObj);
      setLoading(true);
      uploadPhoto(formData);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 4,
        }}
      >
        Profile Picture
      </div>
    </button>
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  console.log(userData);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 md:pt-16 md:pl-12 md:pr-12 pt-16 pl-6 pr-6">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-5 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
              <div className="flex justify-center items-center">
                <Upload
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {userData?.data?.profile?.profilePhoto ? (
                    <img
                      src={userData?.data?.profile?.profilePhoto}
                      alt="profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div>
                <h1 className="font-medium text-xl">
                  {userData?.data?.fullName}
                </h1>
                <p>{userData?.data?.profile?.bio}</p>
              </div>
            </div>
            <div
              className="rounded-full border border-gray-200 flex justify-center items-center"
              onClick={() => setOpen(true)}
            >
              <EditOutlined size="small" className="p-2 cursor-pointer" />
            </div>
          </div>
          <div className="my-5">
            <div className="flex items-center gap-3 my-2">
              <FileDoneOutlined />
              <span>{userData?.data?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <ContactsOutlined />
              <span>{userData?.data?.phoneNumber}</span>
            </div>
          </div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {userData?.data?.profile?.skills.length !== 0 ? (
                userData?.data?.profile?.skills.map((item, index) => (
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
                href={userData?.data?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {userData?.data?.profile?.resumeOriginalName}
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
      {open && (
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Update Profile"
        >
          <UpdateProfile setOpen={setOpen} />
        </Drawer>
      )}
    </>
  );
};

export default Profile;
