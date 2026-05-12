import { useState } from 'react'

const content = {
  cert_1: {
    title: 'PADI',
    logo:
      'https://w7.pngwing.com/pngs/348/38/png-transparent-professional-association-of-diving-instructors-scuba-diving-underwater-diving-dive-center-padi-underwater-diving-symbol-scuba-set.png',
    description:
      'The PADI system (Professional Association of Diving Instructors) is one of the most recognized and trusted diving education organizations in the world. PADI certifications are internationally accepted and allow divers to continue their diving journey anywhere in the world.||If you want to start diving for fun, adventure, travel, or even as a professional career, PADI offers the best training path.',
    courses: [
      { name: 'Discover Scuba Diving', order_index: 1 },
      { name: 'Open Water Diver', order_index: 2 },
      { name: 'Advanced Open Water Diver', order_index: 3 },
      { name: 'Rescue Diver', order_index: 4 },
      { name: 'Divemaster', order_index: 5 },
    ],
  },

  cert_2: {
    title: 'CMAS Diving Courses',
    logo:
      'https://www.stingraydiving.com/wp-content/uploads/2021/02/programlar-resim-cmas1.png',
    description:
      'The CMAS system (Confédération Mondiale des Activités Subaquatiques) is one of the oldest and most respected international diving training organizations in the world. It was founded by legendary ocean explorer Jacques-Yves Cousteau and his colleagues, and its standards are especially well recognized across Europe and many other countries.||CMAS focuses strongly on solid training, real underwater skills, safety, and practical experience. Many professional divers consider this system more technical and detailed.',
    courses: [
      { name: 'Introductory Dive', order_index: 1 },
      { name: 'CMAS One Star Diver', order_index: 2 },
      { name: 'CMAS Two Star Diver', order_index: 3 },
      { name: 'CMAS Three Star Diver', order_index: 4 },
      { name: 'CMAS Instructor Levels', order_index: 5 },
    ],
  },
}

export default function Certificates() {
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