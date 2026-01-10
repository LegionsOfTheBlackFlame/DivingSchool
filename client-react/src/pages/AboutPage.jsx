import { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/fetchJSON.js'

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

  return (
    <>
      {page.sections.map(section => (
        <section key={section.id}>
          {section.blocks.map(block => {
              if (block.type === 'title') {
              console.log(block);
              return <h2 key={block.id}>{block.content}</h2>
              
            }
            if (block.type === 'text') {
              return <p key={block.id}>{block.content}</p>
            }

            if (block.type === 'image') {
              return (
                <img
                  key={block.id}
                  src={block.content}
                  alt=""
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )
            }

            return null
          })}
        </section>
      ))}
    </>
  )
}
