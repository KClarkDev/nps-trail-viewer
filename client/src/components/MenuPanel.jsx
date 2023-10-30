import React, { useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import "../styles/menuPanel.css";
// import Query from "@arcgis/core/rest/support/Query.js";

const MenuPanel = ({ shenandoahHikesLayer }) => {
  const [featureNames, setFeatureNames] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("");

  useEffect(() => {
    if (shenandoahHikesLayer) {
      loadModules(["esri/rest/query"]).then(([Query]) => {
        let query = shenandoahHikesLayer.createQuery();
        query.returnGeometry = false;
        query.outFields = ["hikeName"];

        // Use the 'shenandoahHikesLayer' to query the feature layer
        shenandoahHikesLayer.queryFeatures(query).then((result) => {
          const names = result.features.map(
            (feature) => feature.attributes.hikeName
          );
          setFeatureNames(names);
        });
      });
    }
  }, [shenandoahHikesLayer]);

  const handleDropdownChange = (event) => {
    const selectedName = event.target.value;
    setSelectedFeature(selectedName);
  };

  return (
    <div className="menu-panel">
      <select value={selectedFeature} onChange={handleDropdownChange}>
        <option value="">Select a Hike</option>
        {featureNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MenuPanel;
