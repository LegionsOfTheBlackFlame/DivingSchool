import { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/fetchJSON.js'

export default function HomePage() {
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchJson('/api/pages/home')
        if (!cancelled) setPage(data)
      } catch (err) {
        if (!cancelled) setError(err)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <pre style={{ color: 'crimson' }}>
        {error.message}
      </pre>
    )
  }

  if (!page) return <p>Loading…</p>

console.log('mapping');

return (
  <>
    {page.sections.map(section => {
      const textBlocks = section.blocks.filter(
        b => b.type === 'title' || b.type === 'text'
      )

      const imageBlocks = section.blocks.filter(
        b => b.type === 'image'
      )

      console.log('textBlocks:', textBlocks)

      return (
  <section key={section.id} className="hero-section">
    <div className="hero-cell hero-text">
      <div className="text-group">
        {textBlocks.map(block =>
          block.type === 'title'
            ? <h2 key={block.id}>{block.content}</h2>
            : <p key={block.id}>{block.content}</p>
        )}
      </div>
    </div>

    {imageBlocks.map(block => (
      <div key={block.id} className="hero-cell hero-media">
        <img src={block.content} alt="" />
      </div>
    ))}
  </section>
)
    })}
  </>
) }
