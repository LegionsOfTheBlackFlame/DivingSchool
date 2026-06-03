import { useState, useMemo } from 'react'

export default function Certificates({ section }) {
  const [activeCard, setActiveCard] = useState(null)

  const certificates = useMemo(() => {
    if (!section?.blocks) return []

    const blocks = [...section.blocks].sort(
      (a, b) => Number(a.order_index) - Number(b.order_index)
    )

    const cards = []
    let current = null

    for (const block of blocks) {
      const type = block.block_type

      // Start a new card whenever we hit a title
      if (type === 'title') {
        if (current) cards.push(current)

        current = {
          id: block.id,
          title: block.content || '',
          logo: '',
          description: '',
          courses: []
        }
      }

      if (!current) continue

      if (type === 'image') {
        current.logo = block.content
      }

      if (type === 'text') {
        current.description = block.content
      }

      if (type === 'list') {
        current.courses = block.certificates || []
      }
    }

    if (current) cards.push(current)

    return cards
  }, [section])

  return (
    <section className="certificates">
      {certificates.map(cert => {
        const active = activeCard === cert.id
        const inactive = activeCard && activeCard !== cert.id

        return (
          <article
            key={cert.id}
            className={`certificate-card ${active ? 'active' : ''} ${inactive ? 'inactive' : ''}`}
            onClick={() => setActiveCard(active ? null : cert.id)}
          >
            <img src={cert.logo} alt={cert.title} />
            <h3>{cert.title}</h3>

            <div className="certificate-card__body">
              {cert.description?.split('||').map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <div className="certificate-card__content">
                <h4>Courses</h4>

                <ul>
                  {cert.courses
                    ?.sort((a, b) => a.order_index - b.order_index)
                    .map(course => (
                      <li key={course.id || course.name}>
                        {course.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}