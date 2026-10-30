import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModification, authorizeRead } from '../middleware/authorize.js';
import { getWatchlist, addMovie, updateMovie, deleteMovie } from '../utils/db.js';
const router = Router();
router.use(authenticate);
const validId = x => /^\d+$/.test(String(x)) ? Number(x) : NaN;
router.get('/:userId', authorizeRead, (req, res) => {
  const list = getWatchlist(validId(req.params.userId));
  if (list === null) return res.status(404).json({ error: 'User not found.' });
  return res.status(200).json(list);
});
router.post('/:userId/movies', authorizeModification, (req, res) => {
  const { title, genre } = req.body ?? {};
  if (typeof title !== 'string' || !title.trim() ||
      typeof genre !== 'string' || !genre.trim()) {
    return res.status(400).json({ error: 'Valid title and genre are required.' });
  }
  const movie = addMovie(validId(req.params.userId), { title: title.trim(), genre: genre.trim() });
  if (!movie) return res.status(404).json({ error: 'User not found.' });
  return res.status(201).json(movie);
});
router.put('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const allowed = ['title', 'genre', 'watched'];
  const updates = Object.fromEntries(Object.entries(req.body ?? {}).filter(([k]) => allowed.includes(k)));
  for (const key of ['title', 'genre']) {
    if (key in updates) {
      if (typeof updates[key] !== 'string' || !updates[key].trim() || updates[key].length > 200) {
        return res.status(400).json({ error: key + ' must be a non-empty string of at most 200 characters.' });
      }
      updates[key] = updates[key].trim();
    }
  }
  if ('watched' in updates && typeof updates.watched !== 'boolean') {
    return res.status(400).json({ error: 'watched must be boolean.' });
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'At least one supported update is required.' });
  }
  const movie = updateMovie(validId(req.params.userId), validId(req.params.movieId), updates);
  if (!movie) return res.status(404).json({ error: 'Movie or user not found.' });
  return res.status(200).json(movie);
});
router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const deleted = deleteMovie(validId(req.params.userId), validId(req.params.movieId));
  if (!deleted) return res.status(404).json({ error: 'Movie or user not found.' });
  return res.status(200).json({ success: true });
});
export default router;
