/* eslint-disable no-unused-vars */
import { Form, Input, Select, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiCalls/user";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

// eslint-disable-next-line react/prop-types
const Login = ({ setLoginDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        setLoginDrawer(false);
        message.success(data.message);
        dispatch(setUser({ id: data.user._id, role: data.user.role }));
        navigate("/");
      } else {
        message.error(data.message);
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "please enter your email" }]}
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
              LOG IN
            </button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
