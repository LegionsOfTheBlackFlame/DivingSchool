export default function ContactSection({ section }) {
  const titleBlock = section.blocks.find(block => block.block_type === 'title');
  const textBlocks = section.blocks.filter(block => block.block_type === 'text');

  return (
    <section className="contact-section">
      <div className="contact-section__container">
        {titleBlock && (
          <h2 className="contact-section__title">{titleBlock.content}</h2>
        )}

        <div className="contact-section__list">
          {textBlocks.map(block => {
            const [label, ...rest] = block.content.split(':');
            const value = rest.join(':').trim();

            const normalizedLabel = label.trim().toLowerCase();

            let contentNode = value;

            if (normalizedLabel === 'email') {
              contentNode = (
                <a href={`mailto:${value}`} className="contact-section__value">
                  {value}
                </a>
              );
            } else if (normalizedLabel === 'phone') {
              contentNode = (
                <a href={`tel:${value}`} className="contact-section__value">
                  {value}
                </a>
              );
            } else {
              contentNode = <span className="contact-section__value">{value}</span>;
            }

            return (
              <article key={block.id} className="contact-section__item">
                <h3 className="contact-section__label">{label}</h3>
                <div className="contact-section__content">{contentNode}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}