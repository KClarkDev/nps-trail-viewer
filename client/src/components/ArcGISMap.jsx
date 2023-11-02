import { useEffect, useRef } from "react";
import "../styles/menuPanel.css";

const ArcGISMap = ({ shenandoahHikesLayer, map, sceneView }) => {
  // used as a ref to reference and access the div element containing the map
  const mapDiv = useRef();

  useEffect(() => {
    if (map && sceneView && shenandoahHikesLayer) {
      sceneView.container = mapDiv.current;
      sceneView.view = map;
      // Add the provided layers to the map
      map.add(shenandoahHikesLayer);
    }
  }, [map, sceneView, shenandoahHikesLayer]);

  return (
    <div
      ref={mapDiv}
      // Position map container below the navbar
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: "65px",
        left: "350px",
      }}
    >
      {/* Map container */}
    </div>
  );
};

export default ArcGISMap;
