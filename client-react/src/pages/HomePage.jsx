import { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/fetchJSON.js'
import SectionGate from '../components/SectionGate.jsx'
import ElfsightWidget from "../components/sections/Reviews_sect/reviews.jsx";

export default function HomePage() {
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    console.log(page);

    async function load() {
      try {
        const data = await fetchJson('/api/pages/home')
        if (!cancelled) setPage(data)
      } catch (err) {
        if (!cancelled) setError(err)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (error) {
    return <pre style={{ color: 'crimson' }}>{error.message}</pre>
  }

  if (!page) return <p>Loading…</p>
  console.log(page);
  return (
    <>
      {page.sections.map(section => (
        <SectionGate key={section.id} section={section} />
        
      ))}
 
{/* <ElfsightWidget /> */}

    </>
  )
}
