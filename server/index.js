require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');

const app = express();

// Middleware
app.use(cors());
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
      return res.status(500).json({ error: 'LIVEKIT_API_KEY atau LIVEKIT_API_SECRET belum diatur di Vercel / .env' });
    }

    // Buat Access Token LiveKit dengan masa berlaku 1 jam
    const at = new AccessToken(apiKey, apiSecret, {
      identity: String(identity),
      ttl: '1h',
    });

    // Berikan izin untuk bergabung, mengirim video/audio, dan menerima data
    at.addGrant({
      roomJoin: true,
      room: String(roomName),
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await at.toJwt();
    res.json({ token });

  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    res.status(500).json({ error: 'Gagal membuat token: ' + error.message });
  }
});

// Jalankan server lokal jika tidak di-deploy ke Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server Token LiveKit berjalan di http://localhost:${PORT}`);
  });
}

// Export app agar bisa dibaca Vercel Serverless Function
module.exports = app;
