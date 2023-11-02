import { loadModules } from "esri-loader";
import { useEffect, useState, useRef } from "react";
import ArcGISMap from "../components/ArcGISMap.jsx";
import MenuPanel from "../components/MenuPanel.jsx";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  const [shenandoahHikesLayer, setShenandoahHikesLayer] = useState(null);
  const [map, setMap] = useState(null);
  const [sceneView, setSceneView] = useState(null);
  const mapDiv = useRef();

  useEffect(() => {
    loadModules(
      [
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
        "esri/symbols/SimpleLineSymbol",
        "esri/PopupTemplate",
        "esri/widgets/Home",
      ],
      { css: true }
    ).then(
      ([
        Map,
        SceneView,
        FeatureLayer,
        SimpleRenderer,
        SimpleLineSymbol,
        PopupTemplate,
        Home,
      ]) => {
        // Create a new map and scene view
        const map = new Map({
          basemap: "topo-vector",
          ground: "world-elevation",
          spatialReference: {
            wkid: 4269,
          },
        });

        const view = new SceneView({
          container: mapDiv.current,
          map: map,
          zoom: 10,
          center: [-78.45, 38.47], // long, lat (Shenandoah National Park)
        });

        const homeBtn = new Home({
          view: view,
        });

        // Add the home button to the top left corner of the view
        view.ui.add(homeBtn, "top-left");

        const trailRenderer = new SimpleRenderer({
          symbol: new SimpleLineSymbol({
            color: [128, 0, 32], // Burgundy color
            width: 2,
          }),
        });

        const popupTemplate = new PopupTemplate({
          title: "{hikeName}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "trailSegments",
                  label: "Trail Segments",
                },
                {
                  fieldName: "distance",
                  label: "Distance",
                },
                {
                  fieldName: "hikingTime",
                  label: "Hiking Time",
                },
                {
                  fieldName: "difficulty",
                  label: "Difficulty",
                },
                {
                  fieldName: "elevationGain",
                  label: "Elevation Gain",
                },
                {
                  fieldName: "petsAllowed",
                  label: "Pets Allowed?",
                },
                {
                  fieldName: "activityFee",
                  label: "Activity Fee",
                },
                {
                  fieldName: "location",
                  label: "Location",
                },
                {
                  fieldName: "reservations",
                  label: "Reservations",
                },
                {
                  fieldName: "season",
                  label: "Season",
                },
                {
                  fieldName: "hikeDescription",
                  label: "Details",
                },
              ],
            },
            {
              type: "attachments",
              attachmentInfos: [
                {
                  name: "Trail Map PDF Attachment",
                  content:
                    '<a href="{url}" target="_blank">View PDF Attachment</a>',
                },
              ],
            },
          ],
        });

        const shenandoahBoundary = new FeatureLayer({
          url: "https://services6.arcgis.com/cGI8zn9Oo7U9dF6z/arcgis/rest/services/Shenandoah_National_Park_Boundary/FeatureServer",
        });

        const shenandoahParking = new FeatureLayer({
          url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Parking_Lots/FeatureServer",
          visible: false, // Initially hide the layer
        });
        const hikesLayer = new FeatureLayer({
          url: "https://services8.arcgis.com/ppeEwsORWhtYmSAw/arcgis/rest/services/Shenandoah_National_Park_Hikes/FeatureServer",
          renderer: trailRenderer,
          outFields: ["*"], // Defines the fields to access in the pop-up.
          popupTemplate: popupTemplate,
        });
        map.add(shenandoahBoundary);
        map.add(shenandoahParking);

        setShenandoahHikesLayer(hikesLayer);
        setMap(map);
        setSceneView(view);

        view.on("click", (event) => {
          view.popup.open({
            location: event.mapPoint,
            fetchFeatures: true, // Fetch features at the clicked location.
          });
        });

        view.when(function () {
          // Set the desired zoom level at which the shenandoahParking layer should be visible
          const desiredZoomLevel = 15;

          // Add a watcher for the view's zoom property
          view.watch("zoom", function (newZoom) {
            // Check the current zoom level and set the visibility of shenandoahParking accordingly
            shenandoahParking.visible = newZoom >= desiredZoomLevel;
          });
        });
      }
    );
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <Navbar />
      <MenuPanel
        shenandoahHikesLayer={shenandoahHikesLayer}
        sceneView={sceneView}
      />
      <ArcGISMap
        shenandoahHikesLayer={shenandoahHikesLayer}
        map={map}
        sceneView={sceneView}
      />
    </div>
  );
};

export default Home;
