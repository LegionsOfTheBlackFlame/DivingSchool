import { pool } from '../dbPool.js'

export async function getPageFromDb(slug) {
  const pageResult = await pool.query(
    'SELECT * FROM pages WHERE slug = $1 LIMIT 1',
    [slug]
  )

  const page = pageResult.rows[0]
  if (!page) return null

  const sectionsResult = await pool.query(
    'SELECT * FROM sections WHERE page_id = $1 ORDER BY order_index ASC',
    [page.id]
  )

  const sections = sectionsResult.rows

  if (sections.length === 0) {
    return {
      ...page,
      sections: [],
    }
  }

  const sectionIds = sections.map(section => section.id)

  const blocksResult = await pool.query(
    `SELECT * FROM blocks
     WHERE section_id = ANY($1::bigint[])
     ORDER BY order_index ASC`,
    [sectionIds]
  )

  const blocks = blocksResult.rows

  return {
    ...page,
    sections: sections.map(section => ({
      ...section,
      blocks: blocks.filter(block => block.section_id === section.id),
    })),
  }
}