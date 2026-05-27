import { useState } from 'react'


export default function Certificates({section}) {
  const [activeCard, setActiveCard] = useState(null)

  return (
    <section className="certificates">
      {Object.entries(content).map(([id, cert]) => {
  const active = activeCard === id
  const inactive = activeCard && activeCard !== id

  return (
    <article
      key={id}
      className={`
        certificate-card
        ${active ? 'active' : ''}
        ${inactive ? 'inactive' : ''}
      `}
      onClick={() =>
        setActiveCard(active ? null : id)
      }
    >
      <img
        src={cert.logo}
        alt={cert.title}
        className="certificate-card__logo"
      />

      <h3>{cert.title}</h3>

      <div className="certificate-card__body">
        {cert.description
          .split('||')
          .map((paragraph, index) => (
            <p
              key={index}
              className="certificate-card__description"
            >
              {paragraph}
            </p>
          ))}

        <div className="certificate-card__content">
          <h4>Courses</h4>

          <ul className="certificate-card__courses">
            {cert.courses
              .sort(
                (a, b) =>
                  a.order_index - b.order_index
              )
              .map(course => (
                <li key={course.name}>
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