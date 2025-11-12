import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'
import './styles/global.css'
import RegisterPage from './pages/register'
import UserPage from './pages/user.jsx'
import HomePage from './pages/home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
}
  from "react-router";


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
      }
    ]
  },
  {
    path: "register",
    element: <RegisterPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

// ReactDOM.createRoot(root).render(
//   <RouterProvider router={router} />,
// );
