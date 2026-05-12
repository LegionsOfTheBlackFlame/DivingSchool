import { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/fetchJSON.js'
import SectionGate from '../components/SectionGate.jsx'
import { useLanguage } from '../layouts/LanguageContext.jsx'
import ElfsightWidget from "../components/sections/Reviews_sect/reviews.jsx";

export default function HomePage() {
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)
  const { lang } = useLanguage()

  useEffect(() => {
  console.log('LANG CHANGED:', lang)
}, [lang])
useEffect(() => {
  let cancelled = false

  async function load() {
    console.log('REQUEST URL:', `/api/pages/home?lang=${lang}`)
    setError(null)
    const data = await fetchJson(`/api/pages/home?lang=${lang}`)
    if (!cancelled) setPage(data)
      console.log('NEW PAGE REF:', data)
  }


  load()
console.log('PAGE RENDER:', page)

  return () => {
    cancelled = true
  }
}, [lang])

  if (error) {
    return <pre style={{ color: 'crimson' }}>{error.message}</pre>
  }

  if (!page) return <p>Loading…</p>
  console.log("second page render:", page);
  return (
    <>
      {page.sections.map(section => (
        <SectionGate key={section.id} section={section} />
        
      ))}
 
{/* <ElfsightWidget /> */}

    </>
  )
}
