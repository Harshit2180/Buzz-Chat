import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client'
import { setSocket } from "./Redux/socketSlice";
import { setOnlineUsers } from "./Redux/userSlice";

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

  const { authUser } = useSelector(store => store.user)
  const { socket } = useSelector(store => store.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8000', {
        query: {
          userId: authUser._id
        }
      })
      dispatch(setSocket(socket))

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })

      return () => socket.close()
    }
    else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [authUser])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
};

export default App;
