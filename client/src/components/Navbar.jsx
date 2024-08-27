import { Popover, Avatar, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto h-16">
        <div>
          <h1 className="text-2xl font-bold cursor-pointer">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex font-medium items-center gap-5 cursor-pointer">
            <li>Home</li>
            <Link to="/jobs">
              <li>Jobs</li>
            </Link>
            <li>Jobs</li>
          </ul>
          {user ? (
            <Popover
              placement="rightBottom"
              content={
                <>
                  <div className="flex justify-between items-center gap-3">
                    <Avatar
                      className="cursor-pointer"
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                    />
                    <div>
                      <h4 className="font-medium">Arun Kumar</h4>
                      <p className="text-sm text-gray-400">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600 justify-start items-start mt-3">
                    <Button type="link" className="text-black">
                      <UserOutlined />
                      View Profile
                    </Button>
                    <Button type="link" className="text-black">
                      <LogoutOutlined />
                      Logout
                    </Button>
                  </div>
                </>
              }
            >
              <Avatar
                className="cursor-pointer"
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              />
            </Popover>
          ) : (
            <div className="flex justify-center gap-3 items-center">
              <Link to="/login">
                <Button type="text" className="font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white text-center">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
