import { useNavigate } from "react-router-dom";
import "../styles/splash.css";

export default function Splash() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the SavedBooks page when the button is clicked
    navigate("/saved");
  };

  return (
    <div className="splash">
      <h1 className="splashTitle">National Park Hikes</h1>
      <span className="divider"></span>
      <p className="splashDescription">
        Choose the hike that's right for you with this interactive mapping
        application
      </p>
      <button onClick={handleButtonClick}>View Map</button>
    </div>
  );
}
