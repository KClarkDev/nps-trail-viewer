import React from "react";
import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import { useTrail } from "../utils/trailContext";
import "../styles/menuPanel.css";

const MenuPanel = () => {
  const { trails } = useTrail();
  console.log(trails);

  useEffect(() => {
    if (trails) {
      loadModules(["esri/layers/FeatureLayer", "esri/rest/support/Query"], {
        css: true,
      }).then(([FeatureLayer, Query]) => {
        // Query the feature layer to retrieve trail data
        console.log("IM HERE");
        const query = trails.createQuery();
        query.outFields = ["name"]; // Return trail names
        console.log(query.outFields);
        trails.queryFeatures(query).then((result) => {
          const trailFeatures = result.features;

          // Create a dropdown list
          const dropdown = document.createElement("select");
          dropdown.id = "trailDropdown";

          trailFeatures.forEach((feature) => {
            const trailName = feature.attributes.name;
            console.log(trailName);

            const option = document.createElement("option");
            option.value = trailName;
            option.text = trailName;
            dropdown.appendChild(option);
          });

          // Add an event listener to zoom to the selected trail
          dropdown.addEventListener("change", () => {
            const selectedTrailName = dropdown.value;
            const selectedTrailFeature = trailFeatures.find(
              (feature) => feature.attributes.name === selectedTrailName
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
      });
    }
  }, [trails]);
};

// h1 section, title
//
//   return (
//     <div className="menu-panel">
//       <h2>Menu Panel</h2>
//       <ul>
//         <li>Menu Item 1</li>
//         <li>Menu Item 2</li>
//         <li>Menu Item 3</li>
//       </ul>
//     </div>
//   );
// };

export default MenuPanel;
