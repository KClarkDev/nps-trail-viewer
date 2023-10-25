import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const ArcGISMap = () => {
  const mapDiv = useRef();

  useEffect(() => {
    loadModules(
      ["esri/Map", "esri/views/SceneView", "esri/layers/FeatureLayer"],
      { css: true }
    ).then(([Map, SceneView, FeatureLayer]) => {
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
      // Create a feature layer and specify the URL of your feature service
      const featureLayer = new FeatureLayer({
        url: "https://services6.arcgis.com/cGI8zn9Oo7U9dF6z/arcgis/rest/services/Shenandoah_National_Park_Boundary/FeatureServer",
      });

      // Add the feature layer to the map
      map.add(featureLayer);
    });
  }, []);

  return (
    <div ref={mapDiv} style={{ width: "100%", height: "100vh" }}>
      {/* Map container */}
    </div>
  );
};

export default ArcGISMap;
