import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import MainLayout from './layout/MainLayout.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
          <HeroSection/>
          {/* course */}
          </>
        )
      },
      {
        path: "login",
        element: <Login/>
      }
    ]
  }
])

function App() {

  return (
    <main>
     <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
