import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-container">
      <button className="hero-button" onClick={() => navigate("/shop")}>
        Shop Now
      </button>
    </section>
  );
};
export default HeroSection;
