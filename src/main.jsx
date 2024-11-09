import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './routes/ErrorPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/Root'
import CreateProject from './pages/createProject/CreateProject'
import Projects from './pages/projects/Projects'
import DetailProject from './pages/detailProject/DetailProject'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import Home from './pages/home/Home'
import Params from './pages/params/Params'
import EditProject from './pages/editProject/EditProject'

const router = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: 'project',
        element: (
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        )
      },
      {
        path: 'project/create',
        element: (
          <PrivateRoute>
            <CreateProject />
          </PrivateRoute>
        )
      },
      {
        path: 'project/detail/:id',
        element: (
          <PrivateRoute>
            <DetailProject />
          </PrivateRoute>
        )
      },
      {
        path: 'project/edit/:id',
        element: (
          <PrivateRoute>
            <EditProject />
          </PrivateRoute>
        )
      },
      {
        path: 'project/params',
        element: (
          <PrivateRoute>
            <Params />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
