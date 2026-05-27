import { pool } from '../dbPool.js'

const TABLE_MAP = {
  en: 'blocks_en',
  tr: 'blocks_tr',
  de: 'blocks_de',
  fr: 'blocks_fr',
}

export async function getPageFromDb(slug, lang = 'en') {
  console.log('GETTING PAGE FROM DB:', { slug, lang })

  const pageResult = await pool.query(
    `
    SELECT *
    FROM pages
    WHERE slug = $1
    LIMIT 1
    `,
    [slug]
  )

  const page = pageResult.rows[0]
  if (!page) return null

  const sectionsResult = await pool.query(
    `
    SELECT *
    FROM sections
    WHERE page_id = $1
    ORDER BY order_index ASC
    `,
    [page.id]
  )

  const sections = sectionsResult.rows

  if (sections.length === 0) {
    return { ...page, sections: [] }
  }

  const sectionIds = sections.map(s => s.id)

  const blocksTable = TABLE_MAP[lang] || TABLE_MAP.en

  const blocksResult = await pool.query(
    `
    SELECT *
    FROM ${blocksTable}
    WHERE section_id = ANY($1::bigint[])
    ORDER BY order_index ASC
    `,
    [sectionIds]
  )

  const blocks = blocksResult.rows

  // -----------------------------
  // SPECIAL TABLES
  // -----------------------------

  const certificatesResult = await pool.query(`
    SELECT *
    FROM micro_certificates
    ORDER BY id ASC
  `)

  const certificates = certificatesResult.rows

  const diveSitesTable =
    lang === 'tr'
      ? 'micro_dive_sites_tr'
      : 'micro_dive_sites_en'

  const diveSitesResult = await pool.query(
    `
    SELECT *
    FROM ${diveSitesTable}
    ORDER BY id ASC
    `
  )

  const diveSites = diveSitesResult.rows

  console.log('DIVE SITES FROM DB:', diveSites)
  console.log('CERTIFICATES FROM DB:', certificates)

  // -----------------------------
  // BUILD RESPONSE
  // -----------------------------

  return {
  ...page,

  sections: sections.map(section => {
    const sectionBlocks = blocks.filter(
      b => b.section_id === section.id
    )

    // only list blocks in order
    const listBlocks = sectionBlocks.filter(
      b => b.block_type === 'list'
    )
    

    return {
      ...section,

      blocks: sectionBlocks.map(block => {
        const isList = block.block_type === 'list'

        // index among LIST blocks only (NOT all blocks)
        const listIndex = listBlocks.findIndex(
          b => b === block
        )

        // -----------------------------
        // CERTIFICATES (split into 2 list blocks)
        // -----------------------------
       if (section.section_key === 'certificates' && isList) {
  const half = Math.ceil(certificates.length / 2)

  const sortedListBlocks = [...listBlocks]

  const listIndex = sortedListBlocks.findIndex(
    b => b.id === block.id
  )

  if (listIndex === 0) {
    return {
      ...block,
      certificates: certificates.slice(0, half),
    }
  }

  if (listIndex === 1) {
    return {
      ...block,
      certificates: certificates.slice(half),
    }
  }
}
        // -----------------------------
        // DIVE SITES (single injection)
        // -----------------------------
        if (section.section_key === 'sites' && isList) {
          console.log('LISTINDEX:', listIndex );
          if (listIndex === 0) {
            console.log('INJECTING DIVE SITES CONDITION MET');
            return {
              ...block,
              dive_sites: diveSites,
            }
          }
        }

        return block
      }),
    }
  }),
}
}