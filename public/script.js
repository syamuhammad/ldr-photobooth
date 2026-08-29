// --- LiveKit Configuration ---
const LIVEKIT_URL = "wss://ldr-photobooth-i58hr8va.livekit.cloud"; 

// Helper SDK LiveKit
function getLiveKitSDK() {
  const sdk = window.LivekitClient || window.LiveKit;
  if (!sdk) {
    throw new Error("SDK LiveKit belum loaded dari CDN.");
  }
  return sdk;
}

// --- Database Konfigurasi Koordinat Canvas ---
const FRAME_DATABASE = {
  green_lining: {
    label: "Green Lining",
    2: {
      imageSrc: '/assets/Frame/2 Grid/Green Lining.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: '/assets/Frame/3 Grid/Green Lining.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: '/assets/Frame/4 Grid/Green Lining.png',
      canvasWidth: 1200,
      canvasHeight: 3780,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 },
        { x: 60, y: 2670, w: 1080, h: 810 }
      ]
    }
  },
  sunset: {
    label: "Sunset",
    2: {
      imageSrc: '/assets/Frame/2 Grid/Sunset.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: '/assets/Frame/3 Grid/Sunset.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: '/assets/Frame/4 Grid/Sunset.png',
      canvasWidth: 1200,
      canvasHeight: 3780,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 },
        { x: 60, y: 2670, w: 1080, h: 810 }
      ]
    }
  },
  night_galaxy: {
    label: "Night Galaxy",
    2: {
      imageSrc: '/assets/Frame/2 Grid/Night Galaxy.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: '/assets/Frame/3 Grid/Night Galaxy.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: '/assets/Frame/4 Grid/Night Galaxy.png',
      canvasWidth: 1200,
      canvasHeight: 3780,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 },
        { x: 60, y: 2670, w: 1080, h: 810 }
      ]
    }
  },
  dark_red: {
    label: "Dark Red",
    2: {
      imageSrc: '/assets/Frame/2 Grid/Dark Red.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: '/assets/Frame/3 Grid/Dark Red.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: '/assets/Frame/4 Grid/Dark Red.png',
      canvasWidth: 1200,
      canvasHeight: 3780,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 },
        { x: 60, y: 2670, w: 1080, h: 810 }
      ]
    }
  }
};

// --- State Aplikasi ---
const state = {
  room: null,
  roomName: '',
  identity: '',
  gridCount: 2,
  frameTheme: 'green_lining',
  activeSlot: 0,
  capturedSlots: [], // Berisi string base64 / URL gambar snapshot per slot
  isHost: false,
  isLooping: false
};

// --- DOM Elements ---
const canvas = document.getElementById('composite-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  populateFrameOptions();

  [localVideo, remoteVideo].forEach(vid => {
    if (vid) {
      vid.autoplay = true;
      vid.playsInline = true;
      vid.muted = true;
    }
  });

  document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);
  document.getElementById('btn-create-room')?.addEventListener('click', createRoom);
  document.getElementById('btn-join-room')?.addEventListener('click', joinRoom);
  document.getElementById('btn-to-config')?.addEventListener('click', () => {
    if (state.isHost) {
      sendPeerData({ type: 'NAVIGATE_TO_CONFIG' });
      switchView('view-config');
    }
  });

  document.getElementById('btn-start-camera')?.addEventListener('click', startPhotobooth);
  document.getElementById('btn-take-photo')?.addEventListener('click', triggerSyncedCapture);
  document.getElementById('btn-download-png')?.addEventListener('click', downloadFinalPhotostrip);
  document.getElementById('btn-reset')?.addEventListener('click', resetSession);

  // Sembunyikan tombol download video lama jika ada di HTML agar tidak bikin bingung
  const btnVideo = document.getElementById('btn-download-video');
  if (btnVideo) btnVideo.style.display = 'none';

  document.querySelectorAll('.grid-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (state.isHost) setGridCount(parseInt(e.target.dataset.grid));
    });
  });

  const selectFrame = document.getElementById('select-frame-theme');
  if (selectFrame) {
    selectFrame.addEventListener('change', (e) => {
      if (state.isHost) setFrameTheme(e.target.value);
    });
  }

  updateConfigUI();
  updateInteractivePreview();
});

function populateFrameOptions() {
  const selectFrame = document.getElementById('select-frame-theme');
  if (!selectFrame) return;

  selectFrame.innerHTML = '';
  Object.keys(FRAME_DATABASE).forEach((key, index) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = `Frame ${index + 1} (${FRAME_DATABASE[key].label})`;
    selectFrame.appendChild(option);
  });

  if (FRAME_DATABASE[state.frameTheme]) {
    selectFrame.value = state.frameTheme;
  } else {
    state.frameTheme = Object.keys(FRAME_DATABASE)[0] || 'green_lining';
    selectFrame.value = state.frameTheme;
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('btn-theme-toggle').innerText = '☀️ Mode Gelap';
  } else {
    document.body.classList.remove('light-mode');
    document.getElementById('btn-theme-toggle').innerText = '🌙 Mode Terang';
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  document.getElementById('btn-theme-toggle').innerText = isLight ? '☀️ Mode Gelap' : '🌙 Mode Terang';
}

function switchView(viewId) {
  ['view-connect', 'view-config', 'view-capture', 'view-result'].forEach(id => {
    const elem = document.getElementById(id);
    if (!elem) return;
    if (id === viewId) {
      elem.classList.remove('hidden');
      if (id === 'view-result') elem.classList.add('flex');
    } else {
      elem.classList.add('hidden');
      elem.classList.remove('flex');
    }
  });

  if (viewId === 'view-config') {
    const btnStart = document.getElementById('btn-start-camera');
    const guestMsg = document.getElementById('guest-config-msg');
    const selectFrame = document.getElementById('select-frame-theme');

    if (!state.isHost) {
      btnStart?.classList.add('hidden');
      guestMsg?.classList.remove('hidden');
      if (selectFrame) selectFrame.disabled = true;
    } else {
      btnStart?.classList.remove('hidden');
      guestMsg?.classList.add('hidden');
      if (selectFrame) selectFrame.disabled = false;
    }
  }
}

async function fetchLiveKitToken(roomName, identity) {
  try {
    const query = new URLSearchParams({ roomName, identity }).toString();
    const response = await fetch(`/api/get-token?${query}`);
    const data = await response.json();

    if (!response.ok || !data.token) {
      throw new Error(data.error || 'Gagal mengambil token dari server');
    }
    return data.token;
  } catch (error) {
    console.error('Error token:', error);
    alert('Gagal terhubung ke server token: ' + error.message);
    throw error;
  }
}

// --- LiveKit Connection Handling ---
async function initLiveKit(roomName, isHost) {
  state.isHost = isHost;
  state.roomName = roomName;
  state.identity = isHost ? `host_${Math.floor(Math.random()*10000)}` : `guest_${Math.floor(Math.random()*10000)}`;

  updateStatus('Menghubungkan...', 'indigo');

  try {
    const LK = getLiveKitSDK();
    const token = await fetchLiveKitToken(state.roomName, state.identity);
    
    if (state.room) {
      await state.room.disconnect();
    }

    state.room = new LK.Room({
      adaptiveStream: true,
      dynacast: true,
    });

    state.room.on(LK.RoomEvent.Connected, () => {
      document.getElementById('my-peer-id').innerText = state.roomName;
      document.getElementById('display-room-id').classList.remove('hidden');
      updateStatus('Room Siap', 'indigo');

      state.room.remoteParticipants.forEach(participant => {
        participant.trackPublications.forEach(pub => {
          if (pub.isSubscribed && pub.track && pub.track.kind === 'video') {
            pub.track.attach(remoteVideo);
            remoteVideo.play().catch(e => console.warn('Autoplay existing remote:', e));
          }
        });
      });
    });

    state.room.on(LK.RoomEvent.TrackSubscribed, (track) => {
      if (track.kind === 'video') {
        track.attach(remoteVideo);
        remoteVideo.play().catch(e => console.warn('Autoplay remote:', e));
        updateStatus('Pasangan Terhubung!', 'emerald');
      }
    });

    state.room.on(LK.RoomEvent.TrackUnsubscribed, (track) => {
      if (track.kind === 'video') {
        track.detach(remoteVideo);
      }
    });

    state.room.on(LK.RoomEvent.DataReceived, handleDataReceived);
    
    state.room.on(LK.RoomEvent.ParticipantConnected, () => {
      updateStatus('Pasangan Terhubung!', 'emerald');
      if (state.isHost) {
        document.getElementById('btn-to-config')?.classList.remove('hidden');
        broadcastConfig();
      } else {
        document.getElementById('guest-waiting-msg')?.classList.remove('hidden');
      }
    });

    state.room.on(LK.RoomEvent.ParticipantDisconnected, () => {
      updateStatus('Pasangan Terputus', 'rose');
    });

    await state.room.connect(LIVEKIT_URL, token);

  } catch (err) {
    console.error("LiveKit Error: ", err);
    updateStatus('Error Koneksi', 'rose');
  }
}

function createRoom() {
  const randomRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  initLiveKit(randomRoomCode, true);
}

function joinRoom() {
  const targetId = document.getElementById('input-room-id').value.trim().toUpperCase();
  if (!targetId) return alert('Masukkan Kode Room lawan!');
  initLiveKit(targetId, false);
}

function handleDataReceived(payload) {
  try {
    const str = new TextDecoder().decode(payload);
    const data = JSON.parse(str);

    if (data.type === 'START_COUNTDOWN') {
      runCountdown();
    } else if (data.type === 'SYNC_CONFIG') {
      state.gridCount = data.gridCount;
      state.frameTheme = data.frameTheme;
      updateConfigUI();
      updateInteractivePreview();
    } else if (data.type === 'NAVIGATE_TO_CONFIG') {
      switchView('view-config');
    } else if (data.type === 'NAVIGATE_TO_CAMERA') {
      startPhotoboothLocal();
    }
  } catch (e) {
    console.error("Error parsing peer data:", e);
  }
}

function sendPeerData(data) {
  if (state.room && state.room.state === 'connected') {
    const encoder = new TextEncoder();
    const payload = encoder.encode(JSON.stringify(data));
    state.room.localParticipant.publishData(payload, { reliable: true });
  }
}

function updateStatus(text, type) {
  const badge = document.getElementById('connection-status');
  if (!badge) return;
  badge.innerText = `Status: ${text}`;
  
  if (type === 'emerald') {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800';
  } else if (type === 'rose') {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800';
  } else {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800';
  }
}

function setGridCount(count) {
  state.gridCount = count;
  updateConfigUI();
  updateInteractivePreview();
  broadcastConfig();
}

function setFrameTheme(theme) {
  if (!FRAME_DATABASE[theme]) return;
  state.frameTheme = theme;
  updateConfigUI();
  updateInteractivePreview();
  broadcastConfig();
}

function updateConfigUI() {
  document.querySelectorAll('.grid-btn').forEach(btn => {
    const isSelected = parseInt(btn.dataset.grid) === state.gridCount;
    btn.className = `grid-btn py-3 border rounded-xl font-semibold text-sm ${
      isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-950'
    }`;
  });

  const selectFrame = document.getElementById('select-frame-theme');
  if (selectFrame) selectFrame.value = state.frameTheme;
}

function updateInteractivePreview() {
  const themeConfig = FRAME_DATABASE[state.frameTheme];
  if (!themeConfig) return;

  const config = themeConfig[state.gridCount];
  const container = document.getElementById('interactive-preview-box');
  
  if (!config || !container) return;

  container.style.aspectRatio = `${config.canvasWidth} / ${config.canvasHeight}`;
  container.innerHTML = '';

  config.slots.forEach((slot, i) => {
    const slotDiv = document.createElement('div');
    slotDiv.style.position = 'absolute';
    slotDiv.style.left = `${(slot.x / config.canvasWidth) * 100}%`;
    slotDiv.style.top = `${(slot.y / config.canvasHeight) * 100}%`;
    slotDiv.style.width = `${(slot.w / config.canvasWidth) * 100}%`;
    slotDiv.style.height = `${(slot.h / config.canvasHeight) * 100}%`;
    slotDiv.className = 'bg-slate-800 border border-slate-700/60 rounded flex items-center justify-center text-[10px] text-slate-300 font-bold z-0';
    slotDiv.innerText = `Grid ${i + 1}`;
    container.appendChild(slotDiv);
  });

  const frameImg = document.createElement('img');
  frameImg.src = config.imageSrc;
  frameImg.className = 'absolute inset-0 w-full h-full object-cover z-10 pointer-events-none';
  container.appendChild(frameImg);
}

function broadcastConfig() {
  if (state.isHost) {
    sendPeerData({ type: 'SYNC_CONFIG', gridCount: state.gridCount, frameTheme: state.frameTheme });
  }
}

// --- Camera & Canvas Handling ---
async function startPhotobooth() {
  if (state.isHost) {
    sendPeerData({ type: 'NAVIGATE_TO_CAMERA' });
  }
  await startPhotoboothLocal();
}

async function startPhotoboothLocal() {
  try {
    if (state.room) {
      await state.room.localParticipant.setCameraEnabled(true);
      
      const localTracks = Array.from(state.room.localParticipant.videoTrackPublications.values());
      if (localTracks.length > 0 && localTracks[0].track) {
        localTracks[0].track.attach(localVideo);
        localVideo.play().catch(e => console.warn('Autoplay local:', e));
      }
    }

    switchView('view-capture');
    renderSidebarSlots();
    
    if (!state.isLooping) {
      state.isLooping = true;
      requestAnimationFrame(renderCanvasLoop);
    }

  } catch (err) {
    alert('Gagal mengakses kamera: ' + err.message);
  }
}

function drawCover(targetCtx, element, x, y, w, h) {
  if (!element || element.readyState < 2) return;
  const nw = element.videoWidth || element.width;
  const nh = element.videoHeight || element.height;
  if (!nw || !nh) return;

  const renderRatio = w / h;
  const sourceRatio = nw / nh;

  let sw, sh, sx, sy;
  if (sourceRatio > renderRatio) {
    sh = nh;
    sw = nh * renderRatio;
    sx = (nw - sw) / 2;
    sy = 0;
  } else {
    sw = nw;
    sh = nw / renderRatio;
    sx = 0;
    sy = (nh - sh) / 2;
  }
  targetCtx.drawImage(element, sx, sy, sw, sh, x, y, w, h);
}

function renderCanvasLoop() {
  if (!state.isLooping || !ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Kamera Lokal (Kiri, Mirrored)
  if (localVideo && localVideo.readyState >= 2) {
    ctx.save();
    ctx.translate(canvas.width / 2, 0);
    ctx.scale(-1, 1);
    drawCover(ctx, localVideo, 0, 0, canvas.width / 2, canvas.height);
    ctx.restore();
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
  }

  // 2. Kamera Remote Pasangan (Kanan)
  if (remoteVideo && remoteVideo.readyState >= 2) {
    drawCover(ctx, remoteVideo, canvas.width / 2, 0, canvas.width / 2, canvas.height);
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Menunggu Pasangan...', (canvas.width * 0.75), canvas.height / 2);
  }

  // Garis Pembatas Tengah
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  requestAnimationFrame(renderCanvasLoop);
}

function triggerSyncedCapture() {
  if (state.activeSlot >= state.gridCount) return;
  sendPeerData({ type: 'START_COUNTDOWN' });
  runCountdown();
}

function runCountdown() {
  const overlay = document.getElementById('countdown-overlay');
  const numElem = document.getElementById('countdown-number');
  if (overlay) overlay.classList.remove('hidden');

  let count = 3;
  if (numElem) numElem.innerText = count;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      if (numElem) numElem.innerText = count;
    } else {
      clearInterval(timer);
      if (overlay) overlay.classList.add('hidden');
      takeSnapshot();
    }
  }, 1000);
}

// --- Snapshot Super Ringan & Anti-Freeze ---
function takeSnapshot() {
  // Ambil gambar langsung dari canvas secara instan tanpa MediaRecorder
  const dataUrl = canvas.toDataURL('image/png');

  state.capturedSlots[state.activeSlot] = dataUrl;
  state.activeSlot++;
  renderSidebarSlots();

  if (state.activeSlot >= state.gridCount) {
    setTimeout(showResultView, 600);
  }
}

function renderSidebarSlots() {
  const container = document.getElementById('sidebar-slots');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < state.gridCount; i++) {
    const imgData = state.capturedSlots[i];
    const isActive = i === state.activeSlot;

    const slotDiv = document.createElement('div');
    slotDiv.className = `p-2 rounded-xl border flex flex-col gap-2 ${
      isActive ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800 bg-slate-950'
    }`;

    if (imgData) {
      slotDiv.innerHTML = `
        <span class="text-xs font-bold text-slate-400">Slot ${i + 1} ✓</span>
        <img src="${imgData}" class="w-full aspect-[4/3] object-cover rounded-lg border border-slate-800">
      `;
    } else {
      slotDiv.innerHTML = `
        <span class="text-xs font-bold text-slate-500">Slot ${i + 1} ${isActive ? '(Aktif)' : ''}</span>
        <div class="w-full aspect-[4/3] bg-slate-900 rounded-lg border border-dashed border-slate-800 flex items-center justify-center text-slate-600 text-xs">
          Kosong
        </div>
      `;
    }
    container.appendChild(slotDiv);
  }
}

function showResultView() {
  state.isLooping = false;
  switchView('view-result');

  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];
  const wrapper = document.getElementById('final-photostrip-wrapper');
  const videoContainer = document.getElementById('final-video-slots');
  const overlayImg = document.getElementById('final-frame-overlay');

  if (!wrapper || !videoContainer || !overlayImg) return;

  const renderWidth = 340;
  const renderHeight = renderWidth * (config.canvasHeight / config.canvasWidth);
  wrapper.style.width = `${renderWidth}px`;
  wrapper.style.height = `${renderHeight}px`;

  overlayImg.onerror = () => { overlayImg.style.display = 'none'; };
  overlayImg.onload = () => { overlayImg.style.display = 'block'; };
  overlayImg.src = config.imageSrc;

  // Tampilkan hasil foto per slot di halaman hasil akhir
  videoContainer.innerHTML = '';

  state.capturedSlots.forEach((imgData, i) => {
    const slotConfig = config.slots[i];
    const img = document.createElement('img');
    img.src = imgData;
    
    img.style.position = 'absolute';
    img.style.left = `${(slotConfig.x / config.canvasWidth) * 100}%`;
    img.style.top = `${(slotConfig.y / config.canvasHeight) * 100}%`;
    img.style.width = `${(slotConfig.w / config.canvasWidth) * 100}%`;
    img.style.height = `${(slotConfig.h / config.canvasHeight) * 100}%`;
    img.className = 'object-cover rounded';

    videoContainer.appendChild(img);
  });
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function downloadFinalPhotostrip() {
  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];
  const outCanvas = document.createElement('canvas');
  const outCtx = outCanvas.getContext('2d');

  outCanvas.width = config.canvasWidth;
  outCanvas.height = config.canvasHeight;

  outCtx.fillStyle = '#020617';
  outCtx.fillRect(0, 0, outCanvas.width, outCanvas.height);

  const slotPromises = state.capturedSlots.map(imgData => loadImage(imgData));
  const framePromise = loadImage(config.imageSrc);

  const [slotImages, frameImg] = await Promise.all([
    Promise.all(slotPromises),
    framePromise
  ]);

  slotImages.forEach((img, index) => {
    const slotConfig = config.slots[index];
    if (slotConfig && img) {
      outCtx.drawImage(img, slotConfig.x, slotConfig.y, slotConfig.w, slotConfig.h);
    }
  });

  if (frameImg) {
    outCtx.drawImage(frameImg, 0, 0, config.canvasWidth, config.canvasHeight);
  }

  outCtx.fillStyle = '#94a3b8';
  outCtx.font = 'bold 24px sans-serif';
  outCtx.textAlign = 'center';
  outCtx.fillText('LDR PHOTOBOOTH HD • ' + new Date().toLocaleDateString('id-ID'), config.canvasWidth / 2, config.canvasHeight - 40);

  const link = document.createElement('a');
  link.download = `LDR-Photostrip-${Date.now()}.png`;
  link.href = outCanvas.toDataURL('image/png');
  link.click();
}

function resetSession() {
  if (state.room) {
    state.room.disconnect();
  }
  state.activeSlot = 0;
  state.capturedSlots = [];
  state.isLooping = false;
  switchView('view-connect');
}
