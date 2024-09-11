import { Carousel, Button } from "antd";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel
        arrows
        infinite={false}
        className="w-full mx-auto"
        slidesToShow={3} // Default to showing 3 items
        responsive={[
          {
            breakpoint: 1024, // Screen width less than 1024px
            settings: {
              slidesToShow: 3, // Show 3 items
            },
          },
          {
            breakpoint: 768, // Screen width less than 768px
            settings: {
              slidesToShow: 2, // Show 2 items
            },
          },
          {
            breakpoint: 480, // Screen width less than 480px
            settings: {
              slidesToShow: 1, // Show 1 item
            },
          },
        ]}
      >
        {category.map((category, index) => (
          <div key={index}>
            <Button>{category}</Button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
