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
