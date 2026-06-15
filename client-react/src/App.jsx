import { Outlet } from 'react-router-dom'
import Navbar from './layouts/navbar'
import Footer from './layouts/footer'


export default function App() {
  return (
    <>
      <Navbar />
      <main >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

// Shared Layout component that includes Navbar and Footer, and renders the current page's content in between using <Outlet />.
