import { useState, useEffect } from "react";
import LanguageSwitcher from "./languageswitch";

export default function Navbar() {
  const [open, setOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
 <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
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
     <LanguageSwitcher
  />
  </div>
</nav>
  )
}
 