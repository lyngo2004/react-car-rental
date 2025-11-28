import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'
import './styles/global.css'
import RegisterPage from './pages/auth/register.jsx'
import UserPage from './pages/user.jsx'
import HomePage from './pages/home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
}
  from "react-router";
import LoginPage from './pages/auth/login.jsx'
import CarPage from './pages/car.jsx'


let router = createBrowserRouter([
  {
    path: "/",
    // Component: Root,
    // loader: loadRootData,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "user",
        element: <UserPage />
      },
      {
        path: "car",
        element: <CarPage />
      },
    ]
  },
  {
    path: "register",
    element: <RegisterPage />
  },
  {
    path: "login",
    element: <LoginPage />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);


