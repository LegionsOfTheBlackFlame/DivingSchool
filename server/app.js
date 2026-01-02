import dotenv from 'dotenv';
import express from 'express';

import contentRoutes from './routes/content.routes.js';
import pageRoutes from './routes/pages.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== GLOBAL MIDDLEWARE =====
app.use(express.json());

// ===== API ROUTES =====
app.use('/api/content', contentRoutes);

// ===== PAGE ROUTES =====
app.use('/', pageRoutes);

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
