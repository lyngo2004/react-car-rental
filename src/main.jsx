import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate } from 'react-router-dom'

import App from './App.jsx'
import 'antd/dist/reset.css'
import './styles/global.css'

// Auth pages
import RegisterPage from './pages/auth/register.jsx'
import LoginPage from './pages/auth/login.jsx'

// Customer pages
import UserPage from './pages/user.jsx'
import HomePage from './pages/home.jsx'
import PaymentPage from './pages/customer/payment.jsx'
import CarPage from './pages/customer/car.jsx'
import CarDetailPage from './pages/customer/carDetail.jsx'
import ContractPage from './pages/customer/contract.jsx'

// Admin pages
import AdminLayoutPage from "./components/layout/adminLayout";
import AdminCarListPage from "./pages/admin/cars/adminCarList";
import AdminCarUpsertPage from "./pages/admin/cars/adminCarUpsert";

// Router
import {
  createBrowserRouter,
  RouterProvider,
}
  from "react-router";


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

  // Customer layout
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <HomePage />
      },
      // {
      //   path: "user",
      //   element: <UserPage />
      // },
      {
        path: "car",
        element: <CarPage />
      },
      {
        path: "car/:carId",
        element: <CarDetailPage />
      },
      {
        path: "payment",
        element: <PaymentPage />
      },
      {
        path: "contract/:id",
        element: <ContractPage />
      }
    ]
  },

  // Admin layout
  {
    path: "/admin",
    element: <AdminLayoutPage />,
    children: [
      {
        path: "cars",
        element: <AdminCarListPage />,
      },
      {
        path: "cars/new",
        element: <AdminCarUpsertPage mode="create" />,
      },
      {
        path: "cars/:id",
        element: <AdminCarUpsertPage mode="edit" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);