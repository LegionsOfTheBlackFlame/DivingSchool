import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import './styles/main.css'
import './styles/tokens.css'

ReactDOM.createRoot(document.getElementById('app')).render(
   <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
// Entry point of the React application. It sets up the RouterProvider with the defined routes and renders the app into the DOM.