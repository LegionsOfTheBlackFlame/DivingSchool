// import { getPageFromMock } from './getPageFromMock.js'
import { getPageFromDb } from './getPageFromDb.js'

export async function getPage(slug, lang = 'en') {
  // return getPageFromMock(slug, lang);
  return getPageFromDb(slug)
}