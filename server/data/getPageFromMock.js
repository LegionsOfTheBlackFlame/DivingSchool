
import { pages, pages_tr } from '../../data/pages.js'

export async function getPageFromMock(slug, lang = 'tr') {
  const source = lang === 'tr' ? pages_tr : pages
console.log('MOCK SOURCE:', source === pages_tr ? 'TR' : 'EN')
  return source[slug] || null
}