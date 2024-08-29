import { Input } from "antd";
const { Search } = Input;

const HeroSection = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className="text-center pt-5">
      <div className="flex flex-col gap-5">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-2xl md:text-4xl font-bold">
          Search, Apply & <br /> Get Your
          <span className="text-[#6A38C2]"> Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          quisquam optio laborum dignissimos iusto iste.
        </p>
        <div className="flex justify-center">
          <Search
            className="w-full md:w-[40vw]"
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
