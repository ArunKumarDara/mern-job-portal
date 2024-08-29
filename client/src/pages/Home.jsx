// import CategoryCarousel from "../components/CategoryCarousel";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 md:pt-16 md:pl-12 md:pr-12 pt-16 pl-6 pr-6">
        <HeroSection />
        <LatestJobs />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
