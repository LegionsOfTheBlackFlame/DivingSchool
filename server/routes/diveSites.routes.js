import express from 'express'

import {
  DIVE_SITES,
  DIVE_SITES_TR,
} from '../../data/diveSitesData.js'

const router = express.Router()

const SOURCES = {
  en: DIVE_SITES,
  tr: DIVE_SITES_TR,
}

router.get('/', (req, res) => {
  const { lang = 'en' } = req.query

  const data = SOURCES[lang] || SOURCES.en

  res.json(data)
})

export default router