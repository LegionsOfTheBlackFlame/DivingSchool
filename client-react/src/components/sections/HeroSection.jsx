export default function HeroSection({ section }) {
  const textBlocks = section.blocks.filter(
    b => b.type === 'title' || b.type === 'text'
  )

  const imageBlocks = section.blocks.filter(
    b => b.type === 'image'
  )

  return (
    <section className="hero-section">
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
}
