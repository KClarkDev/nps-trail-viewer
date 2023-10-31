import React, { useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import { Extent } from "@arcgis/core/geometry";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_TRAIL } from "../utils/mutations";

import "../styles/menuPanel.css";

const MenuPanel = ({ shenandoahHikesLayer, sceneView }) => {
  const [featureData, setFeatureData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [saveTrail, { data, loading, error }] = useMutation(SAVE_TRAIL);

  useEffect(() => {
    if (shenandoahHikesLayer) {
      loadModules(["esri/rest/query"]).then(([Query]) => {
        let query = shenandoahHikesLayer.createQuery();
        query.returnGeometry = true;
        query.outFields = ["hikeName"];

        // Use the 'shenandoahHikesLayer' to query the feature layer
        shenandoahHikesLayer.queryFeatures(query).then((result) => {
          const featuresData = result.features.map((feature) => ({
            name: feature.attributes.hikeName,
            geometry: feature.geometry.toJSON(),
          }));

          setFeatureData(featuresData);
        });
      });
    }
  }, [shenandoahHikesLayer]);

  const zoomToFeature = (geometry) => {
    const extent = new Extent(geometry);
    console.log("Extent");
    console.log(extent);

    sceneView.goTo({
      target: geometry,
      scale: 10000,
      tilt: 60,
      speedFactor: 0.5,
    });
  };

  const handleDropdownChange = (event) => {
    const selectedName = event.target.value;
    console.log(`Selected name: ${selectedName}`);
    setSelectedFeature(selectedName);
    console.log(`The selected feature is ${selectedFeature}`);
    console.log(typeof selectedFeature);

    const selectedFeatureData = featureData.find(
      (feature) => feature.name === selectedName
    );

    console.log(`The selected featureData is:`);
    console.log(selectedFeatureData);

    if (sceneView && selectedFeatureData) {
      console.log("In the function");
      console.log(selectedFeatureData);
      // Call a function to zoom to the selected feature
      zoomToFeature(selectedFeatureData.geometry.paths);
    }
  };

  const handleCompletedTrail = async (event) => {
    const trailToSave = selectedFeature; // type String

    try {
      const response = await saveTrail({
        variables: { trailName: trailToSave },
      });
      console.log("Mutation response:", response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="menu-panel">
      <select value={selectedFeature} onChange={handleDropdownChange}>
        <option value="">Select a Hike</option>
        {featureData.map((feature) => (
          <option key={feature.name} value={feature.name}>
            {feature.name}
          </option>
        ))}
      </select>
      {Auth.loggedIn() && selectedFeature !== "" && (
        <div>
          <span className="divider-menu-panel"></span>
          <button
            type="button"
            className="btn btn-dark btn-menu-panel"
            onClick={handleCompletedTrail}
          >
            I completed this hike!
          </button>
          {/* <button type="button" className="btn btn-dark btn-menu-panel">
            Add this hike to my wishlist
          </button> */}
        </div>
      )}
    </div>
  );
};

export default MenuPanel;
