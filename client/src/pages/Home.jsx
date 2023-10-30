import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";
import ArcGISMap from "../components/ArcGISMap.jsx";
import MenuPanel from "../components/MenuPanel.jsx";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  const [shenandoahHikesLayer, setShenandoahHikesLayer] = useState(null);

  useEffect(() => {
    // Load the FeatureLayer module asynchronously
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const hikesLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Hikes/FeatureServer",
      });

      // Listen for the layer to load
      hikesLayer.load().then(() => {
        setShenandoahHikesLayer(hikesLayer);
      });
    });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <Navbar />
      <MenuPanel shenandoahHikesLayer={shenandoahHikesLayer} />
      <ArcGISMap />
    </div>
  );
};

export default Home;
