import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { loadModules } from "esri-loader";

export const TrailContext = createContext();

export const useTrail = () => useContext(TrailContext);

export default function TrailProvider(props) {
  const [trails, setTrails] = useState(null); // Use state to store the loaded FeatureLayer

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const trails = new FeatureLayer({
        url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Hikes/FeatureServer",
        outFields: ["*"],
      });

      setTrails(trails);
      console.log("In provider");
      console.log(trails);
    });
  }, []);
  // The provider component will wrap all other components inside of it that need access to our global state
  return <TrailContext.Provider value={{ trails }} {...props} />;
}
