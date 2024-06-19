import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req;
  const { sellToken, buyToken, slippagePercentage, hasFeeOnTransfer, chainId, sellAmount } = query;

  if (!sellToken || !buyToken || !chainId || !sellAmount) {
    return res.status(400).json({ error: 'Required query parameters are missing' });
  }

  try {
    const apiUrl = `https://api.polyswap.ai/swap/v1/price?sellToken=${sellToken}&buyToken=${buyToken}&slippagePercentage=${slippagePercentage}&hasFeeOnTransfer=${hasFeeOnTransfer}&chainId=${chainId}&sellAmount=${sellAmount}`;
    const response = await axios.get(apiUrl);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
}
