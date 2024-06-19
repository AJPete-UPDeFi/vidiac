import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req;
  const { url } = query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json(error.message);
  }
}
