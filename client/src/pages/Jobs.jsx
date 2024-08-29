import FilterCard from "../components/FilterCard";
import { Card, List, Button, Avatar, Badge } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 7",
  },
  {
    title: "Title 8",
  },
  {
    title: "Title 6",
  },
];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        {/* <div className="flex gap-5"> */}
        {/* <div className="w-20%">
            <FilterCard />
          </div> */}
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                size="small"
                className="rounded-md shadow-xl bg-white border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 ">2 days ago</p>
                  <Button className="rounded-full" size="small">
                    <SaveOutlined />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button className="p-1">
                    <Avatar src="https://www.shutterstock.com/shutterstock/photos/2174926871/display_1500/stock-vector-circle-line-simple-design-logo-blue-format-jpg-png-eps-2174926871.jpg" />{" "}
                  </Button>
                  <div>
                    <h1 className="font-medium text-lg">company name</h1>
                    <p className="text-sm text-gray-500">india</p>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-lg mt-1">title</h1>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Beatae cum architecto alias impedit aliquam, ex ratione
                    repudiandae recusandae! Vero, cupiditate.
                  </p>
                </div>
                <div className="flex justify-start gap-5 items-center mt-3">
                  <Badge count={12} color="#faad14" />
                  <Badge count={12} color="#faad14" />
                  <Badge count={12} color="#faad14" />
                </div>
                <div className="flex justify-start gap-5 items-center mt-3">
                  <Button>Details</Button>
                  <Button className="bg-[#7209b7] text-white">
                    Save for Later
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Jobs;
