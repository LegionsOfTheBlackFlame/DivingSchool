export default function ContactSection({ section }) {
  const title = section.blocks.find(b => b.block_type === 'title')
  const text = section.blocks.find(b => b.block_type === 'text')

  return (
    <section className="contact-section">
      <div className="contact__inner">
        <div className="text-group">
        {title && <h2>{title.content}</h2>}
        {text && <p>{text.content}</p>}
</div>
        <form className="contact-form">
          <label>
            Your email
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              required
              rows={5}
              placeholder="How can we help?"
            />
          </label>

          <button type="submit">Send message</button>
        </form>
      </div>
    </section>
  )
}
