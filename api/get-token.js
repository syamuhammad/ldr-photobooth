import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
  // Mengambil query parameter roomName dan identity dari permintaan frontend
  const { roomName, identity } = req.query;

  if (!roomName || !identity) {
    return res.status(400).json({ error: 'Parameter roomName dan identity wajib diisi.' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'LIVEKIT_API_KEY atau LIVEKIT_API_SECRET belum dikonfigurasi di Environment Variables Vercel.' });
  }

  try {
    // Membuat Access Token untuk LiveKit
    const at = new AccessToken(apiKey, apiSecret, {
      identity: identity,
      ttl: '1h', // Token berlaku selama 1 jam
    });

    // Memberikan izin masuk room, subscribe video, dan kirim video/data
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await at.toJwt();
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    return res.status(500).json({ error: 'Gagal membuat token LiveKit.' });
  }
}
