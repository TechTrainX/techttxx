import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { app } from './src/serverApp.js';

dotenv.config();

const PORT = 3000;

async function startServer() {
  // Vite & Static Asset Handling
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TechTrainX Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[TechTrainX Server] Fatal error during server startup:', err);
});
