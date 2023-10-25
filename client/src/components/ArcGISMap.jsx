import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const ArcGISMap = () => {
  const mapDiv = useRef();

  useEffect(() => {
    loadModules(["esri/Map", "esri/views/SceneView"], { css: true }).then(
      ([Map, SceneView]) => {
        // Create a new map and scene view
        const map = new Map({
          basemap: "topo",
          ground: "world-elevation",
        });

        const view = new SceneView({
          container: mapDiv.current,
          map: map,
          zoom: 10,
          center: [-78.45, 38.47], // long, lat (Shenandoah National Park)
        });
      }
    );
  }, []);

  return (
    <div ref={mapDiv} style={{ width: "100%", height: "100vh" }}>
      {/* Map container */}
    </div>
  );
};

export default ArcGISMap;
