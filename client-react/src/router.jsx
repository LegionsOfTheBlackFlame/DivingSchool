import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> }
    ]
  }
])

// Defines the client-side routing for the React application using React Router. It sets up a main layout (App) and defines routes for the HomePage and AboutPage.