import ArcGISMap from "../components/ArcGISMap.jsx";
import MenuPanel from "../components/MenuPanel.jsx";
import Navbar from "../components/Navbar";

import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <MenuPanel />
      <ArcGISMap />
    </div>
  );
};

export default Home;
