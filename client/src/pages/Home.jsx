import { loadModules } from "esri-loader";
import { useEffect, useState, useRef } from "react";
import ArcGISMap from "../components/ArcGISMap.jsx";
import MenuPanel from "../components/MenuPanel.jsx";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  const [shenandoahHikesLayer, setShenandoahHikesLayer] = useState(null);
  const [sceneView, setSceneView] = useState(null);
  const mapDiv = useRef();

  useEffect(() => {
    loadModules(
      ["esri/Map", "esri/views/SceneView", "esri/layers/FeatureLayer"],
      { css: true }
    ).then(([Map, SceneView, FeatureLayer]) => {
      // Create a new map and scene view
      const map = new Map({
        basemap: "topo-vector",
        ground: "world-elevation",
        spatialReference: {
          wkid: 4269,
        },
      });

      const view = new SceneView({
        container: mapDiv.current,
        map: map,
        zoom: 10,
        center: [-78.45, 38.47], // long, lat (Shenandoah National Park)
      });

      const mapSpatialReference = view.map.spatialReference;
      console.log("Map Spatial Reference:", mapSpatialReference);

      const hikesLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Hikes/FeatureServer",
      });

      setShenandoahHikesLayer(hikesLayer);
      setSceneView(view);
    });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <Navbar />
      <MenuPanel
        shenandoahHikesLayer={shenandoahHikesLayer}
        sceneView={sceneView}
      />
      <ArcGISMap />
    </div>
  );
};

export default Home;
