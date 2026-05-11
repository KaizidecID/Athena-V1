<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ATHENA Downloader</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background: #050505;
  color: white;
  min-height: 100vh;
  overflow-x: hidden;
  padding-bottom: 80px; /* Space for bottom nav */
}

.bg {
  position: fixed;
  inset: 0;
  background:
  radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 35%),
  radial-gradient(circle at bottom, rgba(255,255,255,0.05), transparent 35%);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 480px;
  margin: auto;
  padding: 20px;
}

/* Navigasi Slide */
.slide {
  display: none;
  animation: fadeIn 0.4s ease;
}

.active-slide {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Header & Typography */
.header {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.badge {
  display: inline-block;
  padding: 8px 15px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  font-size: 12px;
  margin-bottom: 15px;
  backdrop-filter: blur(10px);
}

.title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -2px;
}

.subtitle {
  margin-top: 10px;
  color: #9ca3af;
  font-size: 14px;
}

/* Box Style */
.box {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 20px;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  border: none;
  outline: none;
  background: #111111;
  color: white;
  padding: 16px;
  border-radius: 18px;
  font-size: 14px;
  border: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 12px;
}

.button {
  width: 100%;
  border: none;
  padding: 16px;
  border-radius: 18px;
  background: white;
  color: black;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.button:active { transform: scale(0.97); }

/* Bottom Nav */
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 440px;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  padding: 12px;
  z-index: 100;
}

.nav-item {
  color: #666;
  font-size: 11px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}

.nav-item.active {
  color: white;
}

.nav-icon {
  font-size: 18px;
  margin-bottom: 4px;
}

/* Result Card */
.card {
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 18px;
  margin-top: 15px;
}

.thumbnail { width: 100%; border-radius: 20px; margin-bottom: 15px; }
.video-title { font-size: 18px; font-weight: 700; }
.author { color: #9ca3af; font-size: 13px; }
.download {
  display: block; width: 100%; margin-top: 12px; padding: 14px;
  border-radius: 15px; text-align: center; text-decoration: none; font-weight: 700;
}
.primary { background: white; color: black; }
.secondary { background: #1b1b1b; color: white; }

.footer { text-align: center; color: #666; font-size: 11px; margin-top: 30px; }
</style>
</head>
<body>

<div class="bg"></div>

<div class="container">

  <div id="slide-home" class="slide active-slide">
    <div class="header">
      <div class="badge">Welcome back</div>
      <div class="title">ATHENA</div>
      <div class="subtitle">All-in-One Social Media Downloader</div>
    </div>
    <div class="box" style="text-align: center;">
      <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
        Pilih menu di bawah untuk mulai mendownload video atau musik favoritmu tanpa watermark.
      </p>
    </div>
  </div>

  <div id="slide-tiktok" class="slide">
    <div class="header">
      <div class="title" style="font-size: 32px;">TikTok</div>
      <div class="subtitle">Download Video & MP3 TikTok</div>
    </div>
    <div class="box">
      <input id="url-tt" class="input" type="text" placeholder="Paste TikTok link...">
      <button class="button" onclick="handleDownload('tiktok')">Download TikTok</button>
      <div id="res-tiktok"></div>
    </div>
  </div>

  <div id="slide-ig" class="slide">
    <div class="header">
      <div class="title" style="font-size: 32px;">Instagram</div>
      <div class="subtitle">Download Reels & Photos</div>
    </div>
    <div class="box">
      <input id="url-ig" class="input" type="text" placeholder="Paste Instagram link...">
      <button class="button" onclick="handleDownload('instagram')">Download Instagram</button>
      <div id="res-ig"></div>
    </div>
  </div>

  <div id="slide-spotify" class="slide">
    <div class="header">
      <div class="title" style="font-size: 32px;">Spotify</div>
      <div class="subtitle">Download Music Tracks</div>
    </div>
    <div class="box">
      <input id="url-sp" class="input" type="text" placeholder="Paste Spotify link...">
      <button class="button" onclick="handleDownload('spotify')">Download Spotify</button>
      <div id="res-spotify"></div>
    </div>
  </div>

  <div class="footer">© 2026 ATHENA V1.0</div>

</div>

<div class="bottom-nav">
  <div class="nav-item active" onclick="showSlide('home', this)">
    <span class="nav-icon">🏠</span>
    <span>Home</span>
  </div>
  <div class="nav-item" onclick="showSlide('tiktok', this)">
    <span class="nav-icon">📱</span>
    <span>TikTok</span>
  </div>
  <div class="nav-item" onclick="showSlide('ig', this)">
    <span class="nav-icon">📸</span>
    <span>Instagram</span>
  </div>
  <div class="nav-item" onclick="showSlide('spotify', this)">
    <span class="nav-icon">🎵</span>
    <span>Spotify</span>
  </div>
</div>

<script>
// Navigasi Antar Slide
function showSlide(slideId, el) {
  // Sembunyikan semua slide
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active-slide'));
  // Aktifkan slide pilihan
  document.getElementById('slide-' + slideId).classList.add('active-slide');
  
  // Update UI Navigasi
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}

// Handler Download Global
async function handleDownload(type) {
  let inputId, resId;
  
  if (type === 'tiktok') { inputId = 'url-tt'; resId = 'res-tiktok'; }
  else if (type === 'instagram') { inputId = 'url-ig'; resId = 'res-ig'; }
  else if (type === 'spotify') { inputId = 'url-sp'; resId = 'res-spotify'; }

  const url = document.getElementById(inputId).value;
  const resultDiv = document.getElementById(resId);

  if (!url) return alert('Paste linknya dulu bro!');

  resultDiv.innerHTML = '<div class="loading" style="text-align:center; margin-top:20px;">Processing...</div>';

  try {
    const endpoint = `/api/${type}?url=${encodeURIComponent(url)}`;
    const req = await fetch(endpoint);
    const res = await req.json();

    resultDiv.innerHTML = '';

    if (!res.status) {
      resultDiv.innerHTML = `<div class="card">${res.message}</div>`;
      return;
    }

    // Tampilan Result berdasarkan Type
    if (type === 'tiktok') {
      resultDiv.innerHTML = `
        <div class="card">
          <h2 class="video-title">${res.title}</h2>
          <div class="author">@${res.author.nickname}</div>
          <a href="${res.data[0].url}" target="_blank" class="download primary">No Watermark</a>
          ${res.music_info?.url ? `<a href="${res.music_info.url}" target="_blank" class="download secondary">Download MP3</a>` : ''}
        </div>`;
    } 
    else if (type === 'instagram') {
      let media = '';
      res.result.downloadUrl.forEach(v => {
        media += `<a href="${v}" target="_blank" class="download primary">Download Media</a>`;
      });
      resultDiv.innerHTML = `<div class="card"><h2 class="video-title">Instagram Result</h2>${media}</div>`;
    } 
    else if (type === 'spotify') {
      resultDiv.innerHTML = `
        <div class="card">
          <img src="${res.thumbnail}" class="thumbnail">
          <h2 class="video-title">${res.title}</h2>
          <div class="author">${res.artist}</div>
          <a href="${res.track}" target="_blank" class="download primary">Download Track</a>
        </div>`;
    }

  } catch (e) {
    resultDiv.innerHTML = `<div class="card">Error: ${e.message}</div>`;
  }
}
</script>

</body>
</html>
