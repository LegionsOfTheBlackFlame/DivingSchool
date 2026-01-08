import { useEffect, useState } from 'react'

export default function HomePage() {
  const [page, setPage] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/pages/home')
      .then(res => res.json())
      .then(setPage)
  }, [])

  if (!page) return <p>Loading…</p>

  return (
    <>
      {page.sections.map(section => (
        <section key={section.id}>
          {section.blocks.map(block => {
            if (block.type === 'text') {
              return <p key={block.id}>{block.content}</p>
            }
            if (block.type === 'image') {
              return <img key={block.id} src={block.content} />
            }
            return null
          })}
        </section>
      ))}
    </>
  )
}
