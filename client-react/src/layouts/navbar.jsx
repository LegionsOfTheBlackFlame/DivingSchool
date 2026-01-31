import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
 <nav>
  <div >
    <h1 className='brand-logo'>DiveSchool</h1>
       <button
        className="hamburger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        ☰
      </button>
    <ul className={`nav-links ${open ? "open" : ""}`}>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
</nav>
  )
}
 