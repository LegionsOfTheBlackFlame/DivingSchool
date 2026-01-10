export default function Page({ page }) {
  if (!page || !Array.isArray(page.sections)) {
    return <p>Invalid page data</p>
  }

  return (
    <>
      {page.sections.map(section => (
        console.log(section),
        <section key={section.id}>
          <div>
          {section.blocks?.map(block => {
           
            if (block.type === 'title') {
              console.log(block);
              return <h2 key={block.id}>{block.content}</h2>
              
            }
            if (block.type === 'text') {
              console.log(block);
              return <p key={block.id}>{block.content}</p>
            }
            if (block.type === 'image') {
              console.log(block);
              return <img key={block.id} src={block.content} />
            }
            return null
          })}
          </div>
        </section>
      ))}
    </>
  )
}
