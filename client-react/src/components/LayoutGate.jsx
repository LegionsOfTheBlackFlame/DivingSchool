import HeroSection from './sections/HeroSection.jsx'

export default function LayoutGate({ section }) {
  switch (section.layout_id) {
    case 'sect_hero_split':
      return <HeroSection section={section} />

    // future layouts:
    // case 'two_column':
    //   return <TwoColumnSection section={section} />

    default:
      console.warn('Unknown layout:', section.layout_id)
      return null
  }
}
