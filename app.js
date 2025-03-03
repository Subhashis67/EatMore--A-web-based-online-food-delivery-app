import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./src/components/Header";
import { Body } from "./src/components/Body";
import { Footer } from "./src/components/Footer";
import About from "./src/components/About";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import ProfileClass from "./src/components/ProfileClass";
import Shimmer from "./src/components/Shimmer";
import userContext from "./src/utils/userContext";
import React, { lazy, Suspense, useState } from "react";
import Cart from "./src/components/Cart";

// Redux
import { Provider } from "react-redux";
import store from "./src/utils/store";

const Instamart = lazy(() => import("./src/components/Instamart"));

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "Subhahsis",
    email: "spraharaj@gmail.com",
    age: 23,
    cast: "Bramhan",
  });

  return (
    <Provider store={store}>
      <userContext.Provider value={{ user, setUser }  }>
        <Header />
        <Outlet />
        <Footer />
      </userContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
        children: [
          {
            path: "profileclass",
            element: <ProfileClass />,
          },
        ],
      },
      {
        path: "/restaurant/:Resid",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Instamart />
          </Suspense>
        ),
      }, 
      {
        path: "/cart",
        element: <Cart/>,
      }, 
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
