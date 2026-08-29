require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');

const app = express();

// Enable CORS untuk semua origin
app.use(cors({ origin: '*' }));
app.use(express.json());

// Endpoint untuk generate LiveKit Access Token
app.get('/api/get-token', async (req, res) => {
  try {
    const { roomName, identity } = req.query;

    if (!roomName || !identity) {
      return res.status(400).json({ error: 'roomName dan identity wajib diisi' });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: 'API Key atau API Secret belum dikonfigurasi di environment variable' });
    }

    // Inisialisasi AccessToken
    const at = new AccessToken(apiKey, apiSecret, {
      identity: String(identity),
      ttl: '1h',
    });

    // Berikan izin hak akses penuh dalam room
    at.addGrant({
      roomJoin: true,
      room: String(roomName),
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    // Pastikan me-return string JWT secara asynchronous
    const token = await at.toJwt();
    return res.json({ token });

  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    return res.status(500).json({ error: 'Gagal membuat token: ' + error.message });
  }
});

// Ekspor app untuk Vercel Serverless Function
module.exports = app;

// Jalankan listener jika dijalankan langsung di lingkungan lokal
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server Token LiveKit berjalan di http://localhost:${PORT}`);
  });
}
