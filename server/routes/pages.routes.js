import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const clientDir = path.join(__dirname, '..', '..', 'client');

// ===== PAGE ROUTES =====

router.get('/hero_page', (req, res) => {
  res.sendFile(path.join(clientDir, 'hero.html'));
});

router.get('/about_page', (req, res) => {
  res.sendFile(path.join(clientDir, 'about.html'));
});

router.get('/current', (req, res) => {
  res.sendFile(path.join(clientDir, 'current.html'));
});

router.get('/locs', (req, res) => {
  res.sendFile(path.join(clientDir, 'locs.html'));
});

router.get('/orgs', (req, res) => {
  res.sendFile(path.join(clientDir, 'orgs.html'));
});

router.get('/activities', (req, res) => {
  res.sendFile(path.join(clientDir, 'activities.html'));
});

// Catch-all (SPA / fallback)
router.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

export default router;
