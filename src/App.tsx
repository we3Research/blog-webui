import React from "react";
import { RouterProvider } from "react-router";
import { route } from "./routes/Route";

const App: React.FC = () => {
  return <RouterProvider router={route} />;
};

export default App;
