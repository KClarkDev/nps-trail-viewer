import { loadModules } from "esri-loader";
import { useEffect, useState, useRef } from "react";
import ArcGISMap from "../components/ArcGISMap.jsx";
import MenuPanel from "../components/MenuPanel.jsx";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  const [shenandoahHikesLayer, setShenandoahHikesLayer] = useState(null);
  const [map, setMap] = useState(null);
  const [sceneView, setSceneView] = useState(null);
  const mapDiv = useRef();

  useEffect(() => {
    loadModules(
      [
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
        "esri/symbols/SimpleLineSymbol",
      ],
      { css: true }
    ).then(
      ([Map, SceneView, FeatureLayer, SimpleRenderer, SimpleLineSymbol]) => {
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

        const trailRenderer = new SimpleRenderer({
          symbol: new SimpleLineSymbol({
            color: [128, 0, 32], // Burgundy color
            width: 2,
          }),
        });

        const shenandoahBoundary = new FeatureLayer({
          url: "https://services6.arcgis.com/cGI8zn9Oo7U9dF6z/arcgis/rest/services/Shenandoah_National_Park_Boundary/FeatureServer",
        });

        const hikesLayer = new FeatureLayer({
          url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Hikes/FeatureServer",
          renderer: trailRenderer,
        });
        map.add(shenandoahBoundary);

        setShenandoahHikesLayer(hikesLayer);
        setMap(map);
        setSceneView(view);
      }
    );
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <Navbar />
      <MenuPanel
        shenandoahHikesLayer={shenandoahHikesLayer}
        sceneView={sceneView}
      />
      <ArcGISMap
        shenandoahHikesLayer={shenandoahHikesLayer}
        map={map}
        sceneView={sceneView}
      />
    </div>
  );
};

export default Home;
