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
        "esri/renderers/UniqueValueRenderer",
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
        UniqueValueRenderer,
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

        // Define symbology for unique values for hiking trails layer
        const uniqueValues = [
          {
            value: "Easiest",
            symbol: new SimpleLineSymbol({
              color: [0, 102, 0], // Dark green
              width: 2,
            }),
          },
          {
            value: "Moderate",
            symbol: new SimpleLineSymbol({
              color: [255, 255, 0], // Yellow
              width: 2,
            }),
          },
          {
            value: "Moderately Strenuous",
            symbol: new SimpleLineSymbol({
              color: [255, 102, 0], // Orange
              width: 2,
            }),
          },
          {
            value: "Strenuous",
            symbol: new SimpleLineSymbol({
              color: [255, 0, 0], // Red
              width: 2,
            }),
          },
          {
            value: "Very Strenuous",
            symbol: new SimpleLineSymbol({
              color: [51, 0, 0], // Dark purple
              width: 2,
            }),
          },
        ];

        const trailRenderer = new UniqueValueRenderer({
          field: "difficulty",
          uniqueValueInfos: uniqueValues,
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
