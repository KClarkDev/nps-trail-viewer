import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import "../styles/menuPanel.css";

const ArcGISMap = () => {
  // used as a ref to reference and access the div element containing the map
  const mapDiv = useRef();

  useEffect(() => {
    loadModules(
      [
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/FeatureLayer",
        "esri/rest/support/Query",
      ],
      { css: true }
    ).then(([Map, SceneView, FeatureLayer, Query]) => {
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

      // Query the feature layer to retrieve trail data
      const query = shenandoahTrails.createQuery();
      query.outFields = ["name"]; // Return trail names
      shenandoahTrails.queryFeatures(query).then((result) => {
        const trailFeatures = result.features;

        // Create a dropdown list
        const dropdown = document.createElement("select");
        dropdown.id = "trailDropdown";

        trailFeatures.forEach((feature) => {
          const trailName = feature.attributes.name;

          const option = document.createElement("option");
          option.value = trailName;
          option.text = trailName;
          dropdown.appendChild(option);
        });

        // Add an event listener to zoom to the selected trail
        dropdown.addEventListener("change", () => {
          const selectedTrailName = dropdown.value;
          const selectedTrailFeature = trailFeatures.find(
            (feature) => feature.attributes.trailName === selectedTrailName
          );

          if (selectedTrailFeature) {
            view.goTo({
              target: selectedTrailFeature.geometry,
              zoom: 15, // Adjust the zoom level as needed
            });
          }
        });

        // Append the dropdown to your menu panel
        const menuPanel = document.getElementById("menuPanel"); // Your menu panel container
        menuPanel.appendChild(dropdown);
      });
      // Add the feature layer to the map
      map.add(shenandoahBoundary);
      map.add(shenandoahTrails);
    });
  }, []);

  return (
    <div
      ref={mapDiv}
      className="map-div"
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
