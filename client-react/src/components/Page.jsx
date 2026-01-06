export default function Page({ page }) {
  if (!page || !Array.isArray(page.sections)) {
    return <p>Invalid page data</p>
  }

  return (
    <>
      {page.sections.map(section => (
        <section key={section.id}>
          {section.blocks?.map(block => {
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
