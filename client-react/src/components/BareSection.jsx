export default function BareSection({ section }) {
 
 return (
    <section className="bare-section">
      <div className="bare-content">
        {section.blocks.map(block => {
          if (block.block_type === 'title') {
            return <h2 key={block.id} className="bare-title">{block.content}</h2>
          }
          if (block.block_type === 'text') {
            return <p key={block.id} className="bare-text">{block.content}</p>
          }
          if (block.block_type === 'image') {
            return <img key={block.id} src={block.content} alt="" className="bare-image" />
          }
          if (block.block_type === 'placeholder') {
            return <div key={block.id} className="bare-placeholder">{block.content}</div>
          }
          return null;
        })}
      </div>
    </section>
  );
}