import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default Loading;
