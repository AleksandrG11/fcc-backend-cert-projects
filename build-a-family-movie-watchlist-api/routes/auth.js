import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByUsername } from '../utils/db.js';
const router = Router();
router.post('/login', async (req, res) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== 'string' || typeof password !== 'string' ||
      !username.trim() || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  const user = findByUsername(username);
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Server authentication is not configured.' });
  }
  return res.status(200).json({
    token: jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  });
});
export default router;
