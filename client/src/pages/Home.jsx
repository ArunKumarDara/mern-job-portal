// import CategoryCarousel from "../components/CategoryCarousel";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user]);
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
