import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { List, Avatar, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Browse = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const { watchList } = useSelector((state) => state.watchList);
  const data = watchList.filter((job) => job.userId === user.id);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 md:pt-20 pt-20 h-[fit]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-start items-center gap-3 mb-4">
            <ArrowLeftOutlined
              className="cursor-pointer"
              size="large"
              onClick={() => navigate(-1)}
            />
            <h1 className="font-semibold text-lg">WatchList</h1>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data.reverse()}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                extra={
                  <Button
                    type="link"
                    onClick={() => navigate(`/jobs/${item._id}`)}
                  >
                    DETAILS
                  </Button>
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.company.logo} />}
                  title={<a href={item.company.website}>{item.company.name}</a>}
                  description={`${item.title} - ${item.location}`}
                />
                <div className="flex flex-col justify-start items-start gap-3">
                  <p> {item.description}</p>
                  <div className="flex justify-start items-center gap-2 mt-3">
                    <Tag color="purple">{`${item.salary} LPA`}</Tag>
                    <Tag color="green">{`${item.positions} Positions`}</Tag>
                    <Tag color="magenta">{`${item.experienceLevel}+ year exp`}</Tag>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Browse;
