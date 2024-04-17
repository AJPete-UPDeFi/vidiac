// applyWhitelistRef.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import axios from 'axios';

export default async function handler(req, res) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    axios.post(url, {
        chat_id: telegramChatId,
        text: message
    }).then(response => {
        console.log('Message sent to Telegram');
    }).catch(error => {
        console.error('Error sending message to Telegram:', error);
    });
}

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { walletAddress } = req.body;
    console.log("Received walletAddress:", walletAddress);
    const useServiceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet('1ZO1WmiTxyhZvHQbehAlNrvwWEzrLirsecRzm74OIjrQ', useServiceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1]; // Access the second sheet
    await sheet.setHeaderRow(['WalletAddress']);
    const rows = await sheet.getRows();
    const walletAddressLower = walletAddress.trim().toLowerCase();

    const isAddressAlreadyListed = rows.some(row => {
      // Assuming the address is the first element in the _rawData array
      const sheetAddress = row._rawData[0];
      return sheetAddress && sheetAddress.trim().toLowerCase() === walletAddressLower;
    });

    if (isAddressAlreadyListed) {
      console.log("Address already exists in Google Sheets");
      res.status(200).json({ message: 'Address already exists', addressExists: true });
    } else {
      console.log("Adding walletAddress to Google Sheets:", walletAddress);
      await sheet.addRow({ WalletAddress: walletAddress });
      console.log("walletAddress successfully added to Google Sheets");
      sendTelegramMessage(`New referral whitelist request: ${walletAddress}`);
      res.status(200).json({ message: 'Address added successfully', addressExists: false });
    }

  } catch (error) {
    console.error('Error adding walletAddress:', error);
    res.status(500).json('Internal Server Error');
    console.error("Error adding walletAddress to Google Sheets:", error);
  }
};