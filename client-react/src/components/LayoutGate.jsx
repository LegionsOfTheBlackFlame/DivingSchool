import HeroSection from './sections/HeroSection.jsx'
import DefaultSection from './sections/default.jsx'
import ContactSection from './sections/ContactSection.jsx'

const layouts = {
    sect_hero_split: HeroSection,
    sect_contact: ContactSection,
    default: DefaultSection,
}

export default function LayoutGate({ section }) {
  const Section = layouts[section.layout_id] || DefaultSection
  return <Section section={section} />
}
