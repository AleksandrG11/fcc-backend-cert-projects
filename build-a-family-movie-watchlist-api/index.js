import express from 'express';
import helmet from 'helmet';
import authRoutes from './routes/auth.js';
import watchlistRoutes from './routes/watchlist.js';
const app = express();
app.use(helmet());
app.use(express.json({ limit: '64kb' }));
app.get('/', (_req, res) => res.send('Family Movie Watchlist API'));
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
if (process.argv[1]?.endsWith('/index.js')) {
  app.listen(Number(process.env.PORT) || 3000, () => {
    console.log('Family movie watchlist server ready');
  });
}
export default app;
