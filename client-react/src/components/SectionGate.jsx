import HeroSection from './sections/Hero_sect/HeroSection.jsx'
import DefaultSection from './sections/Default_sect/default.jsx'
import ContactSection from './sections/Contact_sect/ContactSection.jsx'
import AnnouncementSection from './sections/Announcement_sect/AnnouncementSection.jsx'
import ReviewsSection from './sections/Reviews_sect/reviews.jsx'
import BareSection from './BareSection.jsx'


const layouts = {
  sect_hero_split: HeroSection,
  sect_announcement: AnnouncementSection,
  sect_review: ReviewsSection,
  sect_contact_info: BareSection,
  sect_sites: BareSection

  
}

export default function SectionGate({ section }) {
  const Section = layouts[section.layout_id] ?? DefaultSection
  return <Section section={section} />
}