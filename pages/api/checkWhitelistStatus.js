// checkWhitelistStatus.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function checkWhitelistStatus(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    const walletAddress = req.query.walletAddress; // Get wallet address from query parameters

    if (!walletAddress) {
        return res.status(400).send('Wallet address is required');
    }

    try {
        // Initialize the Google Spreadsheet
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

        // Check if the wallet address is already listed in the sheet
        const isAddressAlreadyListed = rows.some(row => {
            // Assuming the address is the first element in the _rawData array
            const sheetAddress = row._rawData[0];
            return sheetAddress && sheetAddress.trim().toLowerCase() === walletAddressLower;
          });

        // Respond with the status
        res.status(200).json({ isAwaitingApproval: isAddressAlreadyListed });
    } catch (error) {
        console.error('Error accessing Google Sheets:', error);
        res.status(500).json({ error: 'Failed to check whitelist status due to an internal error' });
    }
}