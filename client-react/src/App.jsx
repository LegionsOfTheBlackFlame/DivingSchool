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

