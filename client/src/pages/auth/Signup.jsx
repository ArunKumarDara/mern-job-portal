/* eslint-disable react/prop-types */
import { Form, Input, message, Select, Drawer } from "antd";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../apiCalls/user";
import { useState, useEffect } from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = ({ setSignupDrawer }) => {
  const [loginDrawer, setLoginDrawer] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setSignupDrawer(false);
      message.success(data.message);
      setLoginDrawer(true);
    },
    onError: (data) => {
      message.error(data.message);
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "please enter your name" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "please enter your email" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "please enter your phone number" },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "please enter password" }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please Select your Role" }]}
        >
          <Select
            placement="topRight"
            size="large"
            placeholder="Select your Role"
            options={[
              {
                value: "student",
                label: "Student",
              },
              {
                value: "recruiter",
                label: "Recruiter",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <div>
            <button
              type="submit"
              className="w-full font-semibold text-white bg-[#6A38C2] rounded-md mb-3 p-3 hover:shadow-md"
            >
              SIGN UP
            </button>
          </div>
        </Form.Item>
      </Form>
      {loginDrawer && (
        <Drawer
          title="Login"
          open={loginDrawer}
          onClose={() => setLoginDrawer(false)}
        >
          <Login setLoginDrawer={setLoginDrawer} />
        </Drawer>
      )}
    </>
  );
};

export default Signup;
