import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'
import './styles/global.css'
import RegisterPage from './pages/auth/register.jsx'
import UserPage from './pages/user.jsx'
import HomePage from './pages/home.jsx'
import PaymentPage from './pages/payment.jsx'
import LoginPage from './pages/login.jsx'
import CarPage from './pages/car.jsx'
import {
  createBrowserRouter,
  RouterProvider,
}
  from "react-router";
import LoginPage from './pages/auth/login.jsx'
import CarPage from './pages/car.jsx'
import { Navigate } from 'react-router-dom'


let router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },

  {
    path: "/login",
    element: <LoginPage />
  },

  {
    path: "/register",
    element: <RegisterPage />
  },

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "user",
        element: <UserPage />
      },
      {
        path: "car",
        element: <CarPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);