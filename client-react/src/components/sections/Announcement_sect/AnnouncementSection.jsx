 export default function AnnouncementSection({ section }) {
 
 return (
    <section className="announcement-section">
      <div className="announcement-content">
        {section.blocks.map(block => {
          if (block.block_type === 'title') {
            return <h2 key={block.id} className="announcement-title">{block.content}</h2>
          }
          if (block.block_type === 'text') {
            return <p key={block.id} className="announcement-text">{block.content}</p>
          }
          if (block.block_type === 'image') {
            return <img key={block.id} src={block.content} alt="" className="announcement-image" />
          }
          return null;
        })}
      </div>
    </section>
  );
}