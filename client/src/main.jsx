import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Splash from "./pages/Splash.jsx";
import Home from "./pages/Home.jsx";
import SavedHikes from "./pages/SavedHikes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Splash />, // Render Splash as the default route
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/my-hikes",
        element: <SavedHikes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
