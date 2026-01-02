import express from 'express';
import {
  dbFetchGoogleReviews,
  dbFetchAnnouncementContent,
  dbFetchServiceCardContent,
  dbFetchHeroContent,
  dbFetchLocsContent,
  dbFetchAboutContent,
  dbFetchOrgsContent,
  dbFetchActivitiesContent,
  dbFetchTeamMustafa,
  dbFetchTeamYucel
} from '../database.js';

const router = express.Router();

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ===== CONTENT API =====

router.get(
  '/google-reviews',
  asyncHandler(async (req, res) => {
    const data = await dbFetchGoogleReviews();
    res.json(data);
  })
);

router.get(
  '/about',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchAboutContent(lang);
    res.json(data);
  })
);

router.get(
  '/service-cards',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchServiceCardContent(lang);
    res.json(data);
  })
);

router.get(
  '/announcements',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchAnnouncementContent(lang);
    res.json(data);
  })
);

router.get(
  '/hero',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchHeroContent(lang);
    res.json(data);
  })
);

router.get(
  '/locations',
  asyncHandler(async (req, res) => {
    const data = await dbFetchLocsContent();
    res.json(data);
  })
);

router.get(
  '/organizations',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchOrgsContent(lang);
    res.json(data);
  })
);

router.get(
  '/activities',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchActivitiesContent(lang);
    res.json(data);
  })
);

router.get(
  '/team/mustafa',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchTeamMustafa(lang);
    res.json(data);
  })
);

router.get(
  '/team/yucel',
  asyncHandler(async (req, res) => {
    const { lang } = req.query;
    const data = await dbFetchTeamYucel(lang);
    res.json(data);
  })
);

export default router;
