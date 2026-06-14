import HeroSection from './sections/Hero_sect/HeroSection.jsx'
import DefaultSection from './sections/Default_sect/default.jsx'
import ContactSection from './sections/Contact_sect/ContactSection.jsx'
import AnnouncementSection from './sections/Announcement_sect/AnnouncementSection.jsx'
import ReviewsSection from './sections/Reviews_sect/reviews.jsx'
import DivingSitesSection from './sections/Sites_sect/SitesSection.jsx'
import Certificates from './sections/Certificates_sect/CertificateSerction.jsx'
import WhatsAppButton from '../layouts/whatsappbtn.jsx'
import BareSection from './BareSection.jsx'


const layouts = {
  sect_hero_split: HeroSection,
  sect_announcement: AnnouncementSection,
  sect_review: ReviewsSection,
  sect_contact_info: ContactSection,
  sect_sites: DivingSitesSection,
  sect_certificates: Certificates,
  sect_whatsapp_btn: WhatsAppButton,

  
}

export default function SectionGate({ section }) {
  console.log('Rendering SectionGate for section:', section)
  const Section = layouts[section.layout_id] ?? DefaultSection
  return <Section section={section} />
}