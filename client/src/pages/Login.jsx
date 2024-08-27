import { Card, Form, Input, Select, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiCalls/user";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        message.success(data.message);
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
    <div className="flex justify-center items-center">
      <Card size="small" className="w-1/3">
        <Typography.Title level={4} className="text-center">
          Log In
        </Typography.Title>
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
              <Link to="/signup">
                <Typography.Text className="text-center ">
                  Don&apos;t have an account?
                  <span className="hover:text-blue-500">Sign Up</span>
                </Typography.Text>
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
