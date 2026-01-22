import { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/fetchJSON.js'
import SectionGate from '../components/SectionGate.jsx'

export default function HomePage() {
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchJson('/api/pages/about')
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

  return (
    <>
      {page.sections.map(section => (
        <SectionGate key={section.id} section={section} />
      ))}
    </>
  )
}
