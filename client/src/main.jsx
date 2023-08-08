import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import ErrorPage from "./error-page.jsx";
import HomePage from "./views/HomePage.jsx";
import store from "../store/index.js";
import ProductPage from "./views/Product.jsx";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import SongPage from "./views/SongPage.jsx";
import DemoPage from "./views/DemoPage.jsx";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/songdb",
        element: <SongPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/demo",
        element: <DemoPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
