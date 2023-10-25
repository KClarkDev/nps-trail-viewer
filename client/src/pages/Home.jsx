// import config from "../config.json";
// const key = config.GIS_API_KEY;

import ArcGISMap from "../components/ArcGISMap.jsx";
import Navbar from "../components/Navbar";

import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <ArcGISMap />
    </div>
  );
};

export default Home;
