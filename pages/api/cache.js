import redis from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { key, value } = req.body;
    await redis.set(key, value, 'EX', 3600); // Store with 1-hour expiry
    res.status(200).json({ message: 'Value stored successfully' });
  } else if (req.method === 'GET') {
    const { key } = req.query;
    const value = await redis.get(key);
    res.status(200).json({ value });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}