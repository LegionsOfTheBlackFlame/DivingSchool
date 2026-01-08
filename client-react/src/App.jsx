import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}


// export default function App() {
//   const [page, setPage] = useState(null)

//   useEffect(() => {
//     fetch('http://localhost:3000/api/pages/home')
//       .then(res => res.json())
//       .then(setPage)
//       .catch(console.error)
//   }, [])

//   if (!page) return <p>Loading…</p>

//   return <Page page={page} />
// }

