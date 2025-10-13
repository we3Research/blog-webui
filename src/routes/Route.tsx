import Blog from "@/pages/Blog";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";
import { blogLoader } from "./blogLoader";

export enum RoutePath {
  Home = "/",
  Blog = "/blog",
  NotFound = "*",
}

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "blog/:id",
        element: <Blog />,
        loader: blogLoader,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
