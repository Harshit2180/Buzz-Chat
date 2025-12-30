import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomeScreen from "./components/WelcomeScreen";
import Chat from "./pages/Chat";

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
    element: <Chat />
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
