import ErrorPage from "@/pages/ErrorPage";
import {Home} from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import {createBrowserRouter} from "react-router";
import {AuthorPage} from "@/pages/AuthorPage.tsx";

export enum RoutePath {
    Home = "/",
    Blog = "/blog",
    Author = "/author",
    NotFound = "*",
}

export const route = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: RoutePath.Author,
                element: <AuthorPage />,
                //loader: authorLoader,
            },
            {
                path: "*",
                element: <NotFound/>,
            },
        ],
    },
], {basename: location.pathname});
