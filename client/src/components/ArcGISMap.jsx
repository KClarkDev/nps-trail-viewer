import React, { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";
import "../styles/menuPanel.css";

const ArcGISMap = ({ shenandoahHikesLayer, map, sceneView }) => {
  // used as a ref to reference and access the div element containing the map
  const mapDiv = useRef();
  // const shenandoahBoundary = new FeatureLayer({
  //   url: "https://services6.arcgis.com/cGI8zn9Oo7U9dF6z/arcgis/rest/services/Shenandoah_National_Park_Boundary/FeatureServer",
  // });

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
