import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitch";
import logo from '../assets/logo.png';

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
    <h1 className='brand-logo'>Bilyaz Diving Center</h1>
<img src={logo} alt="Logo" className="navlogo nav-center" />
     <LanguageSwitcher className="nav-right" />
  </div>
</nav>
  )
}
 