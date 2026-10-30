import jwt from 'jsonwebtoken';
export function authenticate(req, res, next) {
  const auth = req.headers?.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided.' });
  const match = /^Bearer\s+(\S+)$/.exec(auth);
  if (!match) return res.status(401).json({ error: 'Invalid or expired token.' });
  try {
    req.user = jwt.verify(match[1], process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}
