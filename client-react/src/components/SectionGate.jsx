import HeroSection from './sections/Hero_sect/HeroSection.jsx'
import DefaultSection from './sections/Default_sect/default.jsx'
import ContactSection from './sections/Contact_sect/ContactSection.jsx'

const layouts = {
  sect_hero_split: HeroSection,
  sect_contact: ContactSection,
}

export default function SectionGate({ section }) {
  const Section = layouts[section.layout_id] ?? DefaultSection
  return <Section section={section} />
}