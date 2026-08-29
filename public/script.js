// --- LiveKit Configuration ---
const LIVEKIT_URL = "wss://ldr-photobooth-i58hr8va.livekit.cloud"; 

// --- Database Konfigurasi Koordinat Canva ---
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
  capturedSlots: [],
  isHost: false,
  isLooping: false
};

// --- DOM Elements ---
const canvas = document.getElementById('composite-canvas');
const ctx = canvas.getContext('2d');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  populateFrameOptions();

  if (localVideo) {
    localVideo.muted = true;
    localVideo.playsInline = true;
  }
  if (remoteVideo) {
    remoteVideo.playsInline = true;
  }

  document.getElementById('btn-theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('btn-create-room').addEventListener('click', createRoom);
  document.getElementById('btn-join-room').addEventListener('click', joinRoom);
  document.getElementById('btn-to-config').addEventListener('click', () => {
    if (state.isHost) {
      sendPeerData({ type: 'NAVIGATE_TO_CONFIG' });
      switchView('view-config');
    }
  });

  document.getElementById('btn-start-camera').addEventListener('click', startPhotobooth);
  document.getElementById('btn-take-photo').addEventListener('click', triggerSyncedCapture);
  document.getElementById('btn-download-png').addEventListener('click', downloadPNG);
  document.getElementById('btn-download-video').addEventListener('click', downloadLivePhotoVideo);
  document.getElementById('btn-reset').addEventListener('click', resetSession);

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

// --- Populasi Otomatis Opsi Frame ---
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

// --- Theme / Light Mode ---
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

// --- View Router ---
function switchView(viewId) {
  ['view-connect', 'view-config', 'view-capture', 'view-result'].forEach(id => {
    const elem = document.getElementById(id);
    if (id === viewId) {
      elem.classList.remove('hidden');
      if (id === 'view-result') elem.classList.add('flex');
    } else {
      elem.classList.add('hidden');
      elem.classList.remove('flex');
    }
  });

  // Atur visibilitas kontrol khusus Host / Guest
  if (viewId === 'view-config') {
    const btnStart = document.getElementById('btn-start-camera');
    const guestMsg = document.getElementById('guest-config-msg');
    const selectFrame = document.getElementById('select-frame-theme');

    if (!state.isHost) {
      btnStart.classList.add('hidden');
      guestMsg.classList.remove('hidden');
      selectFrame.disabled = true;
    } else {
      btnStart.classList.remove('hidden');
      guestMsg.classList.add('hidden');
      selectFrame.disabled = false;
    }
  }
}

// --- Dynamic Token Fetcher ---
async function fetchLiveKitToken(roomName, identity) {
  try {
    const response = await fetch(`/api/get-token?roomName=${encodeURIComponent(roomName)}&identity=${encodeURIComponent(identity)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Gagal mengambil token dari server');
    }

    return data.token;
  } catch (error) {
    console.error('Error saat mengambil token LiveKit:', error);
    alert('Gagal terhubung ke backend token.');
    throw error;
  }
}

// --- LiveKit Room Connection ---
async function initLiveKit(roomName, isHost) {
  state.isHost = isHost;
  state.roomName = roomName;
  state.identity = isHost ? `host_${Math.floor(Math.random()*10000)}` : `guest_${Math.floor(Math.random()*10000)}`;

  updateStatus('Menghubungkan...', 'indigo');

  try {
    const token = await fetchLiveKitToken(state.roomName, state.identity);
    state.room = new LivekitClient.Room({
      adaptiveStream: true,
      dynacast: true,
    });

    state.room.on(LivekitClient.RoomEvent.TrackSubscribed, handleTrackSubscribed);
    state.room.on(LivekitClient.RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
    state.room.on(LivekitClient.RoomEvent.DataReceived, handleDataReceived);
    
    state.room.on(LivekitClient.RoomEvent.ParticipantConnected, (participant) => {
      console.log('Pasangan terhubung:', participant?.identity);
      updateStatus('Pasangan Terhubung!', 'emerald');
      
      if (state.isHost) {
        document.getElementById('btn-to-config').classList.remove('hidden');
        broadcastConfig();
      } else {
        document.getElementById('guest-waiting-msg').classList.remove('hidden');
      }
    });

    await state.room.connect(LIVEKIT_URL, token);
    
    document.getElementById('my-peer-id').innerText = state.roomName;
    document.getElementById('display-room-id').classList.remove('hidden');
    updateStatus('Room Siap', 'indigo');

    if (state.room.remoteParticipants.size > 0) {
      updateStatus('Pasangan Terhubung!', 'emerald');
      if (state.isHost) {
        document.getElementById('btn-to-config').classList.remove('hidden');
        broadcastConfig();
      } else {
        document.getElementById('guest-waiting-msg').classList.remove('hidden');
      }

      state.room.remoteParticipants.forEach(participant => {
        participant.trackPublications.forEach(pub => {
          if (pub.track && pub.track.kind === LivekitClient.Track.Kind.Video) {
            handleTrackSubscribed(pub.track, pub, participant);
          }
        });
      });
    }

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

function handleTrackSubscribed(track, publication, participant) {
  if (track.kind === LivekitClient.Track.Kind.Video) {
    track.attach(remoteVideo);
    remoteVideo.play().catch(e => console.warn('Autoplay remote video:', e));
  }
}

function handleTrackUnsubscribed(track, publication, participant) {
  if (track.kind === LivekitClient.Track.Kind.Video) {
    track.detach(remoteVideo);
  }
}

function handleDataReceived(payload, participant) {
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
  badge.innerText = `Status: ${text}`;
  
  if (type === 'emerald') {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800';
  } else if (type === 'rose') {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800';
  } else {
    badge.className = 'text-xs px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800';
  }
}

// --- Frame & Grid Selection ---
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
  if (selectFrame) {
    selectFrame.value = state.frameTheme;
  }
}

function updateInteractivePreview() {
  const themeConfig = FRAME_DATABASE[state.frameTheme];
  if (!themeConfig) return;

  const config = themeConfig[state.gridCount];
  const container = document.getElementById('interactive-preview-box');
  
  if (!config) return;

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

// --- Camera Stream & Canvas Loop ---
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
      const videoTrack = Array.from(state.room.localParticipant.videoTrackPublications.values())[0]?.track;
      if (videoTrack) {
        videoTrack.attach(localVideo);
        localVideo.play().catch(e => console.warn('Autoplay local video:', e));
      }
    }

    switchView('view-capture');
    renderSidebarSlots();
    state.isLooping = true;
    renderCanvasLoop();

  } catch (err) {
    alert('Gagal mengakses kamera: ' + err.message);
  }
}

function drawCover(targetCtx, element, x, y, w, h) {
  if (!element || element.readyState < 2) return;
  const nw = element.videoWidth || element.width;
  const nh = element.videoHeight || element.height;
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
  if (!state.isLooping) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Kamera Lokal (di-mirror)
  if (localVideo.readyState >= 2) {
    ctx.save();
    ctx.translate(canvas.width / 2, 0);
    ctx.scale(-1, 1);
    drawCover(ctx, localVideo, 0, 0, canvas.width / 2, canvas.height);
    ctx.restore();
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
  }

  // 2. Kamera Pasangan
  if (remoteVideo.readyState >= 2) {
    drawCover(ctx, remoteVideo, canvas.width / 2, 0, canvas.width / 2, canvas.height);
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Menunggu Pasangan...', (canvas.width * 0.75), canvas.height / 2);
  }

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  requestAnimationFrame(renderCanvasLoop);
}

// --- Capture & Countdown Engine ---
function triggerSyncedCapture() {
  if (state.activeSlot >= state.gridCount) return;
  sendPeerData({ type: 'START_COUNTDOWN' });
  runCountdown();
}

function runCountdown() {
  const overlay = document.getElementById('countdown-overlay');
  const numElem = document.getElementById('countdown-number');
  overlay.classList.remove('hidden');

  let count = 3;
  numElem.innerText = count;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      numElem.innerText = count;
    } else {
      clearInterval(timer);
      overlay.classList.add('hidden');
      startLivePhotoRecord();
    }
  }, 1000);
}

function startLivePhotoRecord() {
  document.getElementById('recording-badge').classList.remove('hidden');

  const stream = canvas.captureStream(30);
  let mimeType = 'video/webm';
  if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
    mimeType = 'video/webm;codecs=vp9';
  }

  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    document.getElementById('recording-badge').classList.add('hidden');
    
    const blob = new Blob(chunks, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(blob);
    const imageUrl = canvas.toDataURL('image/png');

    state.capturedSlots[state.activeSlot] = { blob, videoUrl, imageUrl };
    
    state.activeSlot++;
    renderSidebarSlots();

    if (state.activeSlot >= state.gridCount) {
      setTimeout(showResultView, 800);
    }
  };

  recorder.start();
  setTimeout(() => recorder.stop(), 3000);
}

function renderSidebarSlots() {
  const container = document.getElementById('sidebar-slots');
  container.innerHTML = '';

  for (let i = 0; i < state.gridCount; i++) {
    const slotData = state.capturedSlots[i];
    const isActive = i === state.activeSlot;

    const slotDiv = document.createElement('div');
    slotDiv.className = `p-2 rounded-xl border flex flex-col gap-2 ${
      isActive ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800 bg-slate-950'
    }`;

    if (slotData) {
      slotDiv.innerHTML = `
        <span class="text-xs font-bold text-slate-400">Slot ${i + 1} ✓</span>
        <img src="${slotData.imageUrl}" class="w-full aspect-[4/3] object-cover rounded-lg border border-slate-800">
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

// --- Result & PNG Export ---
function showResultView() {
  state.isLooping = false;
  switchView('view-result');

  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];
  const wrapper = document.getElementById('final-photostrip-wrapper');
  const videoContainer = document.getElementById('final-video-slots');
  const overlayImg = document.getElementById('final-frame-overlay');

  const renderWidth = 340;
  const renderHeight = renderWidth * (config.canvasHeight / config.canvasWidth);
  wrapper.style.width = `${renderWidth}px`;
  wrapper.style.height = `${renderHeight}px`;

  overlayImg.onerror = () => {
    overlayImg.style.display = 'none';
  };
  overlayImg.onload = () => {
    overlayImg.style.display = 'block';
  };
  overlayImg.src = config.imageSrc;

  videoContainer.innerHTML = '';

  state.capturedSlots.forEach((slot, i) => {
    const slotConfig = config.slots[i];
    const video = document.createElement('video');
    video.src = slot.videoUrl;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    video.style.position = 'absolute';
    video.style.left = `${(slotConfig.x / config.canvasWidth) * 100}%`;
    video.style.top = `${(slotConfig.y / config.canvasHeight) * 100}%`;
    video.style.width = `${(slotConfig.w / config.canvasWidth) * 100}%`;
    video.style.height = `${(slotConfig.h / config.canvasHeight) * 100}%`;
    video.className = 'object-cover';

    videoContainer.appendChild(video);
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

async function downloadPNG() {
  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];
  const outCanvas = document.createElement('canvas');
  const outCtx = outCanvas.getContext('2d');

  outCanvas.width = config.canvasWidth;
  outCanvas.height = config.canvasHeight;

  outCtx.fillStyle = '#020617';
  outCtx.fillRect(0, 0, outCanvas.width, outCanvas.height);

  const slotPromises = state.capturedSlots.map(slot => loadImage(slot.imageUrl));
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
  link.download = `LDR-Photobooth-${Date.now()}.png`;
  link.href = outCanvas.toDataURL('image/png');
  link.click();
}

function resetSession() {
  if (state.room) {
    state.room.disconnect();
  }
  state.activeSlot = 0;
  state.capturedSlots = [];
  switchView('view-connect');
}

// --- Render & Export Video ---
async function downloadLivePhotoVideo() {
  const btn = document.getElementById('btn-download-video');
  const originalText = btn.innerText;
  btn.innerText = 'Menyiapkan Video...';
  btn.disabled = true;

  const config = FRAME_DATABASE[state.frameTheme][state.gridCount];
  const renderCanvas = document.createElement('canvas');
  const renderCtx = renderCanvas.getContext('2d');

  renderCanvas.width = config.canvasWidth;
  renderCanvas.height = config.canvasHeight;

  const frameImg = await loadImage(config.imageSrc);
  const videoElements = document.querySelectorAll('#final-video-slots video');

  const mp4Types = [
    'video/mp4;codecs=avc1.42E01E',
    'video/mp4',
    'video/mp4;codecs=h264'
  ];
  
  let selectedMime = mp4Types.find(type => MediaRecorder.isTypeSupported(type)) || '';
  let fileExtension = 'mp4';

  if (!selectedMime) {
    selectedMime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
      ? 'video/webm;codecs=vp9' 
      : 'video/webm';
    fileExtension = 'webm';
  }

  const stream = renderCanvas.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType: selectedMime });
  const chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: selectedMime });
    const link = document.createElement('a');
    link.download = `LDR-LivePhoto-${Date.now()}.${fileExtension}`;
    link.href = URL.createObjectURL(blob);
    link.click();

    btn.innerText = originalText;
    btn.disabled = false;
  };

  let isRendering = true;
  function renderFrame() {
    if (!isRendering) return;

    renderCtx.fillStyle = '#020617';
    renderCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);

    videoElements.forEach((vid, i) => {
      const slot = config.slots[i];
      if (slot && vid.readyState >= 2) {
        drawCover(renderCtx, vid, slot.x, slot.y, slot.w, slot.h);
      }
    });

    if (frameImg) {
      renderCtx.drawImage(frameImg, 0, 0, config.canvasWidth, config.canvasHeight);
    }

    renderCtx.fillStyle = '#94a3b8';
    renderCtx.font = 'bold 24px sans-serif';
    renderCtx.textAlign = 'center';
    renderCtx.fillText('LDR PHOTOBOOTH HD • ' + new Date().toLocaleDateString('id-ID'), config.canvasWidth / 2, config.canvasHeight - 40);

    requestAnimationFrame(renderFrame);
  }

  recorder.start(100);
  renderFrame();

  setTimeout(() => {
    isRendering = false;
    recorder.stop();
  }, 3400);
}
