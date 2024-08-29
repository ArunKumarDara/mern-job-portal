import { Popover, Avatar, Button, Drawer } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Navbar = () => {
  const { user } = useSelector((state) => state.users);
  const [loginDrawer, setLoginDrawer] = useState(false);
  const [signupDrawer, setSignupDrawer] = useState(false);
  return (
    <>
      <div className="bg-white pt-4 pb-4 pl-6 pr-6  md:pl-12 md:pr-12 border-b fixed w-full">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold cursor-pointer">
                Job<span className="text-[#F83002]">Portal</span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ul className="flex font-medium items-center gap-5 cursor-pointer">
              <Link to="/jobs">
                <li>Jobs</li>
              </Link>
            </ul>
            {user ? (
              <Popover
                placement="rightBottom"
                content={
                  <>
                    <div className="flex justify-between items-center gap-4">
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
                      <Link to="/profile">
                        <Button type="link" className="text-black">
                          <UserOutlined />
                          View Profile
                        </Button>
                      </Link>
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
                <Button
                  type="text"
                  className="font-medium"
                  onClick={() => setLoginDrawer(true)}
                >
                  Login
                </Button>
                <Button
                  className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white text-center"
                  onClick={() => setSignupDrawer(true)}
                >
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {loginDrawer && (
        <Drawer
          title="Login"
          open={loginDrawer}
          onClose={() => setLoginDrawer(false)}
        >
          <Login setLoginDrawer={setLoginDrawer} />
        </Drawer>
      )}
      {signupDrawer && (
        <Drawer
          title="Sign Up"
          open={signupDrawer}
          onClose={() => setSignupDrawer(false)}
        >
          <Signup setSignupDrawer={setSignupDrawer} />
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
