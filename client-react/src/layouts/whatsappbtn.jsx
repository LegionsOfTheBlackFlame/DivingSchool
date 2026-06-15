export default function WhatsAppButton({ section }) {
  const messageText = section.blocks.find(b => b.block_type === 'text')?.content 
  const buttonText = section.blocks.find(b => b.block_type === 'title')?.content
  const phone = '905333221082'
  const message = encodeURIComponent(messageText || 'Hello, I would like to know more about your diving courses.')
  const href = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      className="whatsapp-button"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-button__icon" aria-hidden="true">✆</span>
      <span className="whatsapp-button__text">{buttonText}</span>
    </a>
  )
}