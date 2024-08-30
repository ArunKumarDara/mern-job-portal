// import CategoryCarousel from "../components/CategoryCarousel";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 md:pt-16 pt-16">
        <div className="max-w-4xl mx-auto">
          <HeroSection />
          <LatestJobs />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
