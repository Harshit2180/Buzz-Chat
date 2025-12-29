import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomeScreen from "./components/WelcomeScreen";

const appRouter = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <WelcomeScreen />
  }
])

const App = () => {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
};

export default App;
