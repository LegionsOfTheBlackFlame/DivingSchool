import { pool } from '../dbPool.js'

export async function getPageFromDb(slug, lang = 'en') {
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
  `
  SELECT 
    b.id,
    b.section_id,
    b.block_type,
    b.order_index,
    COALESCE(bt.content, b.content) AS content,
    COALESCE(bt.title, b.title) AS title
  FROM blocks b
  LEFT JOIN block_translations bt
    ON b.id = bt.block_id AND bt.lang = $2
  WHERE b.section_id = ANY($1::bigint[])
  ORDER BY b.order_index ASC
  `,
  [sectionIds, lang]
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