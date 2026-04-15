import { Outlet } from 'react-router-dom'
import Navbar from './layouts/navbar'
import Footer from './layouts/footer'
import WhatsAppButton from './layouts/whatsappbtn'

export default function App() {
  return (
    <>
      <Navbar />
      <main >
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

// Shared Layout component that includes Navbar and Footer, and renders the current page's content in between using <Outlet />.
