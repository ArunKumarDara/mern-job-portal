import { Card, Form, Input, Select, Typography } from "antd";
import { Link } from "react-router-dom";

const Signup = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center">
      <Card size="small" className="w-1/3">
        <Typography.Title level={4} className="text-center">
          Sign Up
        </Typography.Title>
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
              <Link to="/login">
                <Typography.Text>
                  Already have an account?
                  <span className="hover:text-blue-500">Log in</span>
                </Typography.Text>
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
