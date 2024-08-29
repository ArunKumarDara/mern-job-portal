import { Card, List } from "antd";

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
];

const LatestJobs = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mt-5 mb-5">
        Latest & Top<span className="text-[#6A38C2]"> Job Openings</span>
      </h1>
      <List
        grid={{
          gutter: 12,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default LatestJobs;
