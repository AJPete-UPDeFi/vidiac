import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const apiUrl = `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching Instagram embed HTML');
  }
}