// --- LiveKit Configuration ---
const LIVEKIT_URL = "wss://ldr-photobooth-i58hr8va.livekit.cloud";

// --- Database Konfigurasi Koordinat Canva ---
const FRAME_DATABASE = {
  green_lining: {
    label: "Green Lining",
    2: {
      imageSrc: './assets/Frame/2%20Grid/Green%20Lining.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: './assets/Frame/3%20Grid/Green%20Lining.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: './assets/Frame/4%20Grid/Green%20Lining.png',
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
      imageSrc: './assets/Frame/2%20Grid/Sunset.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: './assets/Frame/3%20Grid/Sunset.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: './assets/Frame/4%20Grid/Sunset.png',
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
      imageSrc: './assets/Frame/2%20Grid/Night%20Galaxy.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: './assets/Frame/3%20Grid/Night%20Galaxy.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: './assets/Frame/4%20Grid/Night%20Galaxy.png',
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
      imageSrc: './assets/Frame/2%20Grid/Dark%20Red.png',
      canvasWidth: 1200,
      canvasHeight: 2100,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 }
      ]
    },
    3: {
      imageSrc: './assets/Frame/3%20Grid/Dark%20Red.png',
      canvasWidth: 1200,
      canvasHeight: 2940,
      slots: [
        { x: 60, y: 60, w: 1080, h: 810 },
        { x: 60, y: 930, w: 1080, h: 810 },
        { x: 60, y: 1800, w: 1080, h: 810 }
      ]
    },
    4: {
      imageSrc: './assets/Frame/4%20Grid/Dark%20Red.png',
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
};[cite: 1]

// --- State Aplikasi ---
const state = {
  room: null,
  roomName: '',
  identity: '',
  gridCount: 2,
  frameTheme: 'green_lining',
  activeSlot: 0,
  capturedSlots: [],
  isHost: false,
  isLooping: false
};[cite: 1]

// --- DOM Elements ---
const canvas = document.getElementById('composite-canvas');[cite: 1]
const ctx = canvas.getContext('2d');[cite: 1]
const localVideo = document.getElementById('local-video');[cite: 1]
const remoteVideo = document.getElementById('remote-video');[cite: 1]

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();[cite: 1]
  populateFrameOptions();[cite: 1]

  document.getElementById('btn-theme-toggle').addEventListener('click', toggleTheme);[cite: 1]
  document.getElementById('btn-create-room').addEventListener('click', createRoom);[cite: 1]
  document.getElementById('btn-join-room').addEventListener('click', joinRoom);[cite: 1]
  document.getElementById('btn-to-config').addEventListener('click', navigateToConfig);
  document.getElementById('btn-start-camera').addEventListener('click', startPhotobooth);[cite: 1]
  document.getElementById('btn-take-photo').addEventListener('click', triggerSyncedCapture);[cite: 1]
  document.getElementById('btn-download-png').addEventListener('click', downloadPNG);[cite: 1]
  document.getElementById('btn-download-video').addEventListener('click', downloadLivePhotoVideo);[cite: 1]
  document.getElementById('btn-reset').addEventListener('click', resetSession);[cite: 1]

  document.querySelectorAll('.grid-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!state.isHost) return; // Hanya Host yang bisa mengganti grid
      setGridCount(parseInt(e.target.dataset.grid));
    });
  });[cite: 1]

  const selectFrame = document.getElementById('select-frame-theme');[cite: 1]
  if (selectFrame) {
    selectFrame.addEventListener('change', (e) => {
      if (!state.isHost) return; // Hanya Host yang bisa mengganti theme
      setFrameTheme(e.target.value);
    });
  }

  updateConfigUI();[cite: 1]
  updateInteractivePreview();[cite: 1]
});

// --- Populasi Otomatis Opsi Frame ---
function populateFrameOptions() {
  const selectFrame = document.getElementById('select-frame-theme');[cite: 1]
  if (!selectFrame) return;[cite: 1]

  selectFrame.innerHTML = '';[cite: 1]
  Object.keys(FRAME_DATABASE).forEach((key, index) => {
    const option = document.createElement('option');[cite: 1]
    option.value = key;[cite: 1]
    option.textContent = `Frame ${index + 1} (${FRAME_DATABASE[key].label})`;[cite: 1]
    selectFrame.appendChild(option);[cite: 1]
  });

  if (FRAME_DATABASE[state.frameTheme]) {
    selectFrame.value = state.frameTheme;[cite: 1]
  } else {
    state.frameTheme = Object.keys(FRAME_DATABASE)[0] || 'green_lining';[cite: 1]
    selectFrame.value = state.frameTheme;[cite: 1]
  }
}

// --- Theme / Light Mode Management ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme');[cite: 1]
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');[cite: 1]
    document.getElementById('btn-theme-toggle').innerText = '☀️ Mode Gelap';[cite: 1]
  } else {
    document.body.classList.remove('light-mode');[cite: 1]
    document.getElementById('btn-theme-toggle').innerText = '🌙 Mode Terang';[cite: 1]
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');[cite: 1]
  const isLight = document.body.classList.contains('light-mode');[cite: 1]
  localStorage.setItem('theme', isLight ? 'light' : 'dark');[cite: 1]
  document.getElementById('btn-theme-toggle').innerText = isLight ? '☀️ Mode Gelap' : '🌙 Mode Terang';[cite: 1]
}

// --- View Router ---
function switchView(viewId) {
  ['view-connect', 'view-config', 'view-capture', 'view-result'].forEach(id => {
    const elem = document.getElementById(id);[cite: 1]
    if (id === viewId) {
      elem.classList.remove('hidden');[cite: 1]
      if (id === 'view-result') elem.classList.add('flex');[cite: 1]
    } else {
      elem.classList.add('hidden');[cite: 1]
      elem.classList.remove('flex');[cite: 1]
    }
  });
}

// --- LiveKit Token Helper (Vercel Backend URL) ---
async function fetchLiveKitToken(roomName, identity) {
  try {
    const response = await fetch(`https://ldr-photobooth-phi.vercel.app/api/get-token?roomName=${encodeURIComponent(roomName)}&identity=${encodeURIComponent(identity)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Gagal mengambil token dari server');
    }

    return data.token;
  } catch (error) {
    console.error('Error saat mengambil token LiveKit:', error);
    alert('Gagal terhubung ke backend server token Vercel.');
    throw error;
  }
}

// --- LiveKit Room Connection ---
async function initLiveKit(roomName, isHost) {
  state.roomName = roomName;[cite: 1]
  state.identity = isHost ? `host-${Math.floor(Math.random()*1000)}` : `guest-${Math.floor(Math.random()*1000)}`;[cite: 1]

  updateStatus('Menghubungkan...', 'indigo');[cite: 1]

  try {
    const token = await fetchLiveKitToken(state.roomName, state.identity);
    
    // Konfigurasi WebRTC dengan resolusi teroptimasi untuk mencegah freeze di HP
    state.room = new LivekitClient.Room({
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: LivekitClient.VideoPresets.h720.resolution,
      }
    });

    // Event handling LiveKit
    state.room.on(LivekitClient.RoomEvent.TrackSubscribed, handleTrackSubscribed);[cite: 1]
    state.room.on(LivekitClient.RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);[cite: 1]
    state.room.on(LivekitClient.RoomEvent.DataReceived, handleDataReceived);[cite: 1]
    state.room.on(LivekitClient.RoomEvent.ParticipantConnected, () => {
      updateStatus('Pasangan Terhubung!', 'emerald');[cite: 1]
      applyRolePermissions();
    });

    await state.room.connect(LIVEKIT_URL, token);
    
    document.getElementById('my-peer-id').innerText = state.roomName;[cite: 1]
    document.getElementById('display-room-id').classList.remove('hidden');[cite: 1]
    updateStatus('Room Siap', 'indigo');[cite: 1]

    if (state.room.remoteParticipants.size > 0) {
      updateStatus('Pasangan Terhubung!', 'emerald');[cite: 1]
    }

    applyRolePermissions();

  } catch (err) {
    console.error("LiveKit Error: ", err);[cite: 1]
    updateStatus('Error Koneksi', 'rose');[cite: 1]
    alert("Gagal terhubung ke LiveKit Cloud.");
  }
}

function createRoom() {
  state.isHost = true;[cite: 1]
  const randomRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();[cite: 1]
  initLiveKit(randomRoomCode, true);[cite: 1]
}

function joinRoom() {
  const targetId = document.getElementById('input-room-id').value.trim().toUpperCase();[cite: 1]
  if (!targetId) return alert('Masukkan Kode Room lawan!');[cite: 1]
  state.isHost = false;[cite: 1]
  initLiveKit(targetId, false);[cite: 1]
}

// Menangani hak akses Host vs Guest pada Tombol UI
function applyRolePermissions() {
  const btnToConfig = document.getElementById('btn-to-config');
  const btnStartCamera = document.getElementById('btn-start-camera');
  const btnTakePhoto = document.getElementById('btn-take-photo');
  const selectFrame = document.getElementById('select-frame-theme');

  btnToConfig.classList.remove('hidden');

  if (state.isHost) {
    btnToConfig.innerText = "Lanjut Pilih Frame →";
    if (btnStartCamera) btnStartCamera.classList.remove('hidden');
    if (btnTakePhoto) btnTakePhoto.classList.remove('hidden');
    if (selectFrame) selectFrame.disabled = false;
  } else {
    btnToConfig.innerText = "Menunggu Host Memilih Frame...";
    if (btnStartCamera) btnStartCamera.classList.add('hidden');
    if (btnTakePhoto) btnTakePhoto.classList.add('hidden');
    if (selectFrame) selectFrame.disabled = true;
  }
}

function navigateToConfig() {
  if (state.isHost) {
    sendPeerData({ type: 'NAVIGATE_TO_CONFIG' });
    switchView('view-config');
  }
}

// Penanganan Video Track untuk mengatasi video freeze pada HP
function handleTrackSubscribed(track, publication, participant) {
  if (track.kind === LivekitClient.Track.Kind.Video) {
    track.attach(remoteVideo);
    remoteVideo.play().catch(e => console.log("Autoplay video diawali penanganan interaksi:", e));
  }
}

function handleTrackUnsubscribed(track, publication, participant) {
  if (track.kind === LivekitClient.Track.Kind.Video) {
    track.detach(remoteVideo);[cite: 1]
  }
}

function handleDataReceived(payload, participant) {
  const str = new TextDecoder().decode(payload);[cite: 1]
  const data = JSON.parse(str);[cite: 1]

  if (data.type === 'NAVIGATE_TO_CONFIG') {
    switchView('view-config');
  } else if (data.type === 'SYNC_CONFIG') {
    state.gridCount = data.gridCount;[cite: 1]
    state.frameTheme = data.frameTheme;[cite: 1]
    updateConfigUI();[cite: 1]
    updateInteractivePreview();[cite: 1]
  } else if (data.type === 'NAVIGATE_TO_CAMERA') {
    startPhotoboothLocal();[cite: 1]
  } else if (data.type === 'START_COUNTDOWN') {
    runCountdown();[cite: 1]
  }
}

function sendPeerData(data) {
  if (state.room && state.room.state === 'connected') {
    const encoder = new TextEncoder();[cite: 1]
    const payload = encoder.encode(JSON.stringify(data));[cite: 1]
    state.room.localParticipant.publishData(payload, { reliable: true });[cite: 1]
  }
}

function updateStatus(text, type) {
  const badge = document.getElementById('connection-status');[cite: 1]
  badge.innerText = `Status: ${text}`;[cite: 1]
  
  if (type === 'emerald') {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800';[cite: 1]
  } else if (type === 'rose') {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800';[cite: 1]
  } else {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800';[cite: 1]
  }
}

// --- Frame & Grid Selection ---
function setGridCount(count) {
  state.gridCount = count;[cite: 1]
  updateConfigUI();[cite: 1]
  updateInteractivePreview();[cite: 1]
  broadcastConfig();[cite: 1]
}

function setFrameTheme(theme) {
  if (!FRAME_DATABASE[theme]) return;[cite: 1]
  state.frameTheme = theme;[cite: 1]
  updateConfigUI();[cite: 1]
  updateInteractivePreview();[cite: 1]
  broadcastConfig();[cite: 1]
}

function updateConfigUI() {
  document.querySelectorAll('.grid-btn').forEach(btn => {
    const isSelected = parseInt(btn.dataset.grid) === state.gridCount;[cite: 1]
    btn.className = `grid-btn py-3 border rounded-xl font-semibold text-sm ${
      isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-950'
    }`;[cite: 1]
  });

  const selectFrame = document.getElementById('select-frame-theme');[cite: 1]
  if (selectFrame) {
    selectFrame.value = state.frameTheme;[cite: 1]
  }
}

function updateInteractivePreview() {
  const themeConfig = FRAME_DATABASE[state.frameTheme];[cite: 1]
  if (!themeConfig) return;[cite: 1]

  const config = themeConfig[state.gridCount];[cite: 1]
  const container = document.getElementById('interactive-preview-box');[cite: 1]
  
  if (!config) return;[cite: 1]

  container.style.aspectRatio = `${config.canvasWidth} / ${config.canvasHeight}`;[cite: 1]
  container.innerHTML = '';[cite: 1]

  config.slots.forEach((slot, i) => {
    const slotDiv = document.createElement('div');[cite: 1]
    slotDiv.style.position = 'absolute';[cite: 1]
    slotDiv.style.left = `${(slot.x / config.canvasWidth) * 100}%`;[cite: 1]
    slotDiv.style.top = `${(slot.y / config.canvasHeight) * 100}%`;[cite: 1]
    slotDiv.style.width = `${(slot.w / config.canvasWidth) * 100}%`;[cite: 1]
    slotDiv.style.height = `${(slot.h / config.canvasHeight) * 100}%`;[cite: 1]
    slotDiv.className = 'bg-slate-800 border border-slate-700/60 rounded flex items-center justify-center text-[10px] text-slate-300 font-bold z-0';[cite: 1]
    slotDiv.innerText = `Grid ${i + 1}`;[cite: 1]
    container.appendChild(slotDiv);[cite: 1]
  });

  const frameImg = document.createElement('img');[cite: 1]
  frameImg.src = config.imageSrc;[cite: 1]
  frameImg.className = 'absolute inset-0 w-full h-full object-cover z-10 pointer-events-none';[cite: 1]
  
  frameImg.onerror = () => {
    console.warn(`[Frame Warning] File gambar tidak ditemukan di path: "${config.imageSrc}".`);[cite: 1]
  };

  container.appendChild(frameImg);[cite: 1]
}

function broadcastConfig() {
  if (state.isHost) {
    sendPeerData({ type: 'SYNC_CONFIG', gridCount: state.gridCount, frameTheme: state.frameTheme });[cite: 1]
  }
}

// --- Camera Stream & Canvas Loop (Live Screen Side-by-Side) ---
async function startPhotobooth() {
  if (state.isHost) {
    sendPeerData({ type: 'NAVIGATE_TO_CAMERA' });[cite: 1]
  }
  await startPhotoboothLocal();[cite: 1]
}

async function startPhotoboothLocal() {
  try {
    if (state.room) {
      await state.room.localParticipant.setCameraEnabled(true);[cite: 1]
      const videoTrack = Array.from(state.room.localParticipant.videoTrackPublications.values())[0]?.track;[cite: 1]
      if (videoTrack) {
        videoTrack.attach(localVideo);[cite: 1]
        localVideo.play().catch(e => console.log(e));
      }
    }

    switchView('view-capture');[cite: 1]
    renderSidebarSlots();[cite: 1]
    state.isLooping = true;[cite: 1]
    renderCanvasLoop();[cite: 1]

  } catch (err) {
    alert('Gagal mengakses kamera: ' + err.message);[cite: 1]
  }
}

function drawCover(targetCtx, element, x, y, w, h) {
  if (!element || element.readyState < 2) return;[cite: 1]
  const nw = element.videoWidth || element.width;[cite: 1]
  const nh = element.videoHeight || element.height;[cite: 1]
  const renderRatio = w / h;[cite: 1]
  const sourceRatio = nw / nh;[cite: 1]

  let sw, sh, sx, sy;[cite: 1]
  if (sourceRatio > renderRatio) {
    sh = nh;[cite: 1]
    sw = nh * renderRatio;[cite: 1]
    sx = (nw - sw) / 2;[cite: 1]
    sy = 0;[cite: 1]
  } else {
    sw = nw;[cite: 1]
    sh = nw / renderRatio;[cite: 1]
    sx = 0;[cite: 1]
    sy = (nh - sh) / 2;[cite: 1]
  }
  targetCtx.drawImage(element, sx, sy, sw, sh, x, y, w, h);[cite: 1]
}

// Render Live Screen 1 Layar Terpisah Kirim/Kanan
function renderCanvasLoop() {
  if (!state.isLooping) return;[cite: 1]

  ctx.clearRect(0, 0, canvas.width, canvas.height);[cite: 1]

  // 1. Kamera Saya (Sisi Kiri - Di-mirror)
  if (localVideo.readyState >= 2) {
    ctx.save();[cite: 1]
    ctx.translate(canvas.width / 2, 0);[cite: 1]
    ctx.scale(-1, 1);[cite: 1]
    drawCover(ctx, localVideo, 0, 0, canvas.width / 2, canvas.height);[cite: 1]
    ctx.restore();[cite: 1]
  } else {
    ctx.fillStyle = '#1e293b';[cite: 1]
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);[cite: 1]
  }

  // 2. Kamera Pasangan (Sisi Kanan)
  if (remoteVideo.readyState >= 2) {
    drawCover(ctx, remoteVideo, canvas.width / 2, 0, canvas.width / 2, canvas.height);[cite: 1]
  } else {
    ctx.fillStyle = '#0f172a';[cite: 1]
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);[cite: 1]
    ctx.fillStyle = '#64748b';[cite: 1]
    ctx.font = '16px sans-serif';[cite: 1]
    ctx.textAlign = 'center';[cite: 1]
    ctx.fillText('Menunggu Pasangan...', (canvas.width * 0.75), canvas.height / 2);[cite: 1]
  }

  // Garis Pembatas Sisi Tengah Canvas
  ctx.strokeStyle = '#334155';[cite: 1]
  ctx.lineWidth = 4;[cite: 1]
  ctx.beginPath();[cite: 1]
  ctx.moveTo(canvas.width / 2, 0);[cite: 1]
  ctx.lineTo(canvas.width / 2, canvas.height);[cite: 1]
  ctx.stroke();[cite: 1]

  requestAnimationFrame(renderCanvasLoop);[cite: 1]
}

// --- Capture & Countdown Engine ---
function triggerSyncedCapture() {
  if (!state.isHost) return;
  if (state.activeSlot >= state.gridCount) return;[cite: 1]
  sendPeerData({ type: 'START_COUNTDOWN' });[cite: 1]
  runCountdown();[cite: 1]
}

function runCountdown() {
  const overlay = document.getElementById('countdown-overlay');[cite: 1]
  const numElem = document.getElementById('countdown-number');[cite: 1]
  overlay.classList.remove('hidden');[cite: 1]

  let count = 3;[cite: 1]
  numElem.innerText = count;[cite: 1]

  const timer = setInterval(() => {
    count--;[cite: 1]
    if (count > 0) {
      numElem.innerText = count;[cite: 1]
    } else {
      clearInterval(timer);[cite: 1]
      overlay.classList.add('hidden');[cite: 1]
      startLivePhotoRecord();[cite: 1]
    }
  }, 1000);[cite: 1]
}

function startLivePhotoRecord() {
  document.getElementById('recording-badge').classList.remove('hidden');[cite: 1]

  const stream = canvas.captureStream(30);[cite: 1]
  let mimeType = 'video/webm';[cite: 1]
  if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
    mimeType = 'video/webm;codecs=vp9';[cite: 1]
  }

  const recorder = new MediaRecorder(stream, { mimeType });[cite: 1]
  const chunks = [];[cite: 1]

  recorder.ondataavailable = e => chunks.push(e.data);[cite: 1]
  recorder.onstop = () => {
    document.getElementById('recording-badge').classList.add('hidden');[cite: 1]
    
    const blob = new Blob(chunks, { type: 'video/webm' });[cite: 1]
    const videoUrl = URL.createObjectURL(blob);[cite: 1]
    const imageUrl = canvas.toDataURL('image/png');[cite: 1]

    state.capturedSlots[state.activeSlot] = { blob, videoUrl, imageUrl };[cite: 1]
    
    state.activeSlot++;[cite: 1]
    renderSidebarSlots();[cite: 1]

    if (state.activeSlot >= state.gridCount) {
      setTimeout(showResultView, 800);[cite: 1]
    }
  };

  recorder.start();[cite: 1]
  setTimeout(() => recorder.stop(), 3000);[cite: 1]
}

function renderSidebarSlots() {
  const container = document.getElementById('sidebar-slots');[cite: 1]
  container.innerHTML = '';[cite: 1]

  for (let i = 0; i < state.gridCount; i++) {
    const slotData = state.capturedSlots[i];[cite: 1]
    const isActive = i === state.activeSlot;[cite: 1]

    const slotDiv = document.createElement('div');[cite: 1]
    slotDiv.className = `p-2 rounded-xl border flex flex-col gap-2 ${
      isActive ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800 bg-slate-950'
    }`;[cite: 1]

    if (slotData) {
      slotDiv.innerHTML = `
        <span class="text-xs font-bold text-slate-400">Slot ${i + 1} ✓</span>
        <img src="${slotData.imageUrl}" class="w-full aspect-[4/3] object-cover rounded-lg border border-slate-800">
      `;[cite: 1]
    } else {
      slotDiv.innerHTML = `
        <span class="text-xs font-bold text-slate-500">Slot ${i + 1} ${isActive ? '(Aktif)' : ''}</span>
        <div class="w-full aspect-[4/3] bg-slate-900 rounded-lg border border-dashed border-slate-800 flex items-center justify-center text-slate-600 text-xs">
          Kosong
        </div>
      `;[cite: 1]
    }
    container.appendChild(slotDiv);[cite: 1]
  }
}

// --- Result & High-Res PNG Export ---
function showResultView() {
  state.isLooping = false;[cite: 1]
  switchView('view-result');[cite: 1]

  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];[cite: 1]
  const wrapper = document.getElementById('final-photostrip-wrapper');[cite: 1]
  const videoContainer = document.getElementById('final-video-slots');[cite: 1]
  const overlayImg = document.getElementById('final-frame-overlay');[cite: 1]

  const renderWidth = 340;[cite: 1]
  const renderHeight = renderWidth * (config.canvasHeight / config.canvasWidth);[cite: 1]
  wrapper.style.width = `${renderWidth}px`;[cite: 1]
  wrapper.style.height = `${renderHeight}px`;[cite: 1]

  overlayImg.onerror = () => {
    console.warn("Frame overlay tidak ditemukan di:", config.imageSrc);[cite: 1]
    overlayImg.style.display = 'none';[cite: 1]
  };
  overlayImg.onload = () => {
    overlayImg.style.display = 'block';[cite: 1]
  };
  overlayImg.src = config.imageSrc;[cite: 1]

  videoContainer.innerHTML = '';[cite: 1]

  state.capturedSlots.forEach((slot, i) => {
    const slotConfig = config.slots[i];[cite: 1]
    const video = document.createElement('video');[cite: 1]
    video.src = slot.videoUrl;[cite: 1]
    video.autoplay = true;[cite: 1]
    video.loop = true;[cite: 1]
    video.muted = true;[cite: 1]
    video.playsInline = true;[cite: 1]
    
    video.style.position = 'absolute';[cite: 1]
    video.style.left = `${(slotConfig.x / config.canvasWidth) * 100}%`;[cite: 1]
    video.style.top = `${(slotConfig.y / config.canvasHeight) * 100}%`;[cite: 1]
    video.style.width = `${(slotConfig.w / config.canvasWidth) * 100}%`;[cite: 1]
    video.style.height = `${(slotConfig.h / config.canvasHeight) * 100}%`;[cite: 1]
    video.className = 'object-cover';[cite: 1]

    videoContainer.appendChild(video);[cite: 1]
  });
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();[cite: 1]
    img.crossOrigin = 'Anonymous';[cite: 1]
    img.onload = () => resolve(img);[cite: 1]
    img.onerror = () => {
      console.warn(`Gagal memuat gambar dari ${src}`);[cite: 1]
      resolve(null);[cite: 1]
    };
    img.src = src;[cite: 1]
  });
}

async function downloadPNG() {
  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];[cite: 1]
  const outCanvas = document.createElement('canvas');[cite: 1]
  const outCtx = outCanvas.getContext('2d');[cite: 1]

  outCanvas.width = config.canvasWidth;[cite: 1]
  outCanvas.height = config.canvasHeight;[cite: 1]

  outCtx.fillStyle = '#020617';[cite: 1]
  outCtx.fillRect(0, 0, outCanvas.width, outCanvas.height);[cite: 1]

  const slotPromises = state.capturedSlots.map(slot => loadImage(slot.imageUrl));[cite: 1]
  const framePromise = loadImage(config.imageSrc);[cite: 1]

  const [slotImages, frameImg] = await Promise.all([
    Promise.all(slotPromises),
    framePromise
  ]);[cite: 1]

  slotImages.forEach((img, index) => {
    const slotConfig = config.slots[index];[cite: 1]
    if (slotConfig && img) {
      outCtx.drawImage(img, slotConfig.x, slotConfig.y, slotConfig.w, slotConfig.h);[cite: 1]
    }
  });

  if (frameImg) {
    outCtx.drawImage(frameImg, 0, 0, config.canvasWidth, config.canvasHeight);[cite: 1]
  }

  outCtx.fillStyle = '#94a3b8';[cite: 1]
  outCtx.font = 'bold 24px sans-serif';[cite: 1]
  outCtx.textAlign = 'center';[cite: 1]
  outCtx.fillText('LDR PHOTOBOOTH HD • ' + new Date().toLocaleDateString('id-ID'), config.canvasWidth / 2, config.canvasHeight - 40);[cite: 1]

  const link = document.createElement('a');[cite: 1]
  link.download = `LDR-Photobooth-${Date.now()}.png`;[cite: 1]
  link.href = outCanvas.toDataURL('image/png');[cite: 1]
  link.click();[cite: 1]
}

function resetSession() {
  if (state.room) {
    state.room.disconnect();[cite: 1]
  }
  state.activeSlot = 0;[cite: 1]
  state.capturedSlots = [];[cite: 1]
  switchView('view-connect');[cite: 1]
}

// --- Render & Export Video ---
async function downloadLivePhotoVideo() {
  const btn = document.getElementById('btn-download-video');[cite: 1]
  const originalText = btn.innerText;[cite: 1]
  btn.innerText = 'Menyiapkan Video...';[cite: 1]
  btn.disabled = true;[cite: 1]

  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];[cite: 1]
  const renderCanvas = document.createElement('canvas');[cite: 1]
  const renderCtx = renderCanvas.getContext('2d');[cite: 1]

  renderCanvas.width = config.canvasWidth;[cite: 1]
  renderCanvas.height = config.canvasHeight;[cite: 1]

  const frameImg = await loadImage(config.imageSrc);[cite: 1]
  const videoElements = document.querySelectorAll('#final-video-slots video');[cite: 1]

  const mp4Types = [
    'video/mp4;codecs=avc1.42E01E',
    'video/mp4',
    'video/mp4;codecs=h264'
  ];[cite: 1]
  
  let selectedMime = mp4Types.find(type => MediaRecorder.isTypeSupported(type)) || '';[cite: 1]
  let fileExtension = 'mp4';[cite: 1]

  if (!selectedMime) {
    selectedMime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
      ? 'video/webm;codecs=vp9' 
      : 'video/webm';[cite: 1]
    fileExtension = 'webm';[cite: 1]
  }

  const stream = renderCanvas.captureStream(30);[cite: 1]
  const recorder = new MediaRecorder(stream, { mimeType: selectedMime });[cite: 1]
  const chunks = [];[cite: 1]

  recorder.ondataavailable = e => chunks.push(e.data);[cite: 1]
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: selectedMime });[cite: 1]
    const link = document.createElement('a');[cite: 1]
    link.download = `LDR-LivePhoto-${Date.now()}.${fileExtension}`;[cite: 1]
    link.href = URL.createObjectURL(blob);[cite: 1]
    link.click();[cite: 1]

    btn.innerText = originalText;[cite: 1]
    btn.disabled = false;[cite: 1]
  };

  let isRendering = true;[cite: 1]
  function renderFrame() {
    if (!isRendering) return;[cite: 1]

    renderCtx.fillStyle = '#020617';[cite: 1]
    renderCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);[cite: 1]

    videoElements.forEach((vid, i) => {
      const slot = config.slots[i];[cite: 1]
      if (slot && vid.readyState >= 2) {
        drawCover(renderCtx, vid, slot.x, slot.y, slot.w, slot.h);[cite: 1]
      }
    });

    if (frameImg) {
      renderCtx.drawImage(frameImg, 0, 0, config.canvasWidth, config.canvasHeight);[cite: 1]
    }

    renderCtx.fillStyle = '#94a3b8';[cite: 1]
    renderCtx.font = 'bold 24px sans-serif';[cite: 1]
    renderCtx.textAlign = 'center';[cite: 1]
    renderCtx.fillText('LDR PHOTOBOOTH HD • ' + new Date().toLocaleDateString('id-ID'), config.canvasWidth / 2, config.canvasHeight - 40);[cite: 1]

    requestAnimationFrame(renderFrame);[cite: 1]
  }

  recorder.start(100);[cite: 1]
  renderFrame();[cite: 1]

  setTimeout(() => {
    isRendering = false;[cite: 1]
    recorder.stop();[cite: 1]
  }, 3400);[cite: 1]
}
