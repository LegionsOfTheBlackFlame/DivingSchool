export default function DefaultSection({ section }) {
  const blocks = [...section.blocks].sort(
    (a, b) => a.order_index - b.order_index
  )

  return (
    <section className="default-section">
      {blocks.map(block => {
        switch (block.block_type) {
          case 'title':
            return <h2 key={block.id}>{block.content}</h2>

          case 'text':
            return <p key={block.id}>{block.content}</p>

          case 'image':
            return (
              <img
                key={block.id}
                src={block.content}
                alt=""
              />
            )

          default:
            return null
        }
      })}
    </section>
  )
}