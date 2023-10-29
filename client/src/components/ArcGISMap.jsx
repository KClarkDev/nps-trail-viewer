import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import "../styles/menuPanel.css";

const ArcGISMap = () => {
  // used as a ref to reference and access the div element containing the map
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
      });

      const view = new SceneView({
        container: mapDiv.current,
        map: map,
        zoom: 10,
        center: [-78.45, 38.47], // long, lat (Shenandoah National Park)
      });

      const shenandoahBoundary = new FeatureLayer({
        url: "https://services6.arcgis.com/cGI8zn9Oo7U9dF6z/arcgis/rest/services/Shenandoah_National_Park_Boundary/FeatureServer",
      });

      const shenandoahTrails = new FeatureLayer({
        url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Trails/FeatureServer",
      });

      const shenandoahHikes = new FeatureLayer({
        url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Hikes/FeatureServer",
      });

      // Add the feature layer to the map
      map.add(shenandoahHikes);
      map.add(shenandoahBoundary);
      map.add(shenandoahTrails);
    });
  }, []);

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
