import { useState } from "react";


export default function ContactSection({ section }) {
  const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setStatus(null);

  try {
    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, message })
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    setStatus("success");
   
    setEmail("");
    setMessage("");
  } catch (err) {
    setStatus("error");
  } finally {
    setLoading(false);
  }
}


  
  const title = section.blocks.find(b => b.block_type === 'title')
  const text = section.blocks.find(b => b.block_type === 'text')

  return (
    <section className="contact-section">
      <div className="contact__inner">
        <div className="text-group">
        {title && <h2>{title.content}</h2>}
        {text && <p>{text.content}</p>}
</div>
        <form className="contact-form" onSubmit={ handleSubmit}>
          <label>
            Your email
           <input
  type="email"
  name="email"
  required
  placeholder="you@example.com"
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
          </label>

          <label>
            Message
         <textarea
  name="message"
  required
  rows={5}
  placeholder="How can we help?"
  value={message}
  onChange={e => setMessage(e.target.value)}
/>
          </label>
<button type="submit" disabled={loading}>
  {loading ? "Sending..." : "Send Message"}
</button>

          {status === "success" && (
  <p className="form-success">Message sent successfully.</p>
)}

{status === "error" && (
  <p className="form-error">Something went wrong. Try again.</p>
)}
        </form>
      </div>
    </section>
  )
}
