import { getPageFromMock } from './getPageFromMock.js'
// import { getPageFromDb } from './getPageFromDb.js'

export async function getPage(slug) {
  return getPageFromMock(slug)
//   return getPageFromDb(slug)
}