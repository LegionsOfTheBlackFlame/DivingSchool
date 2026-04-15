export default function WhatsAppButton() {
  const phone = '905555555555'
  const message = encodeURIComponent('Hello, I would like to know more about your diving courses.')
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
      <span className="whatsapp-button__text">WhatsApp</span>
    </a>
  )
}