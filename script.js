/* =========================================================
   AINY'S BIRTHDAY — SCRIPT
   Vanilla JS, no build tools required.
========================================================= */

/* ---------- Config ---------- */
const BIRTHDAY_ISO = "2026-08-27T00:00:00"; // local time — edit here if needed
const CANDLE_COUNT = 5;

/* ---------- Gate / Entry ---------- */
const gate = document.getElementById("gate");
const enterBtn = document.getElementById("enterBtn");
const experience = document.getElementById("experience");
const bgm = document.getElementById("bgm");
const muteBtn = document.getElementById("muteBtn");

enterBtn.addEventListener("click", () => {
  gate.classList.add("gate-out");
  experience.classList.remove("hidden");
  document.body.style.overflow = "auto";
  initFireflies();
  initPetals();
  initReveal();
  startCountdown();
  buildCandles();
  // try to start music softly; browsers may block autoplay with sound, that's fine
  bgm.volume = 0.35;
  bgm.play().catch(() => {});
  updateMuteIcon();
});

let muted = false;
muteBtn.addEventListener("click", () => {
  muted = !muted;
  bgm.muted = muted;
  if (!muted) bgm.play().catch(() => {});
  updateMuteIcon();
});
function updateMuteIcon(){
  muteBtn.textContent = muted ? "🔇" : "🔈";
}

/* ---------- Countdown ---------- */
function startCountdown(){
  const target = new Date(BIRTHDAY_ISO).getTime();
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };
  const caption = document.getElementById("countdown-caption");

  function tick(){
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0){
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.mins.textContent = "00";
      els.secs.textContent = "00";
      caption.textContent = "it's here — happy birthday, Ainy! 🎉";
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    els.days.textContent = String(days).padStart(2, "0");
    els.hours.textContent = String(hours).padStart(2, "0");
    els.mins.textContent = String(mins).padStart(2, "0");
    els.secs.textContent = String(secs).padStart(2, "0");

    requestAnimationFrame(() => setTimeout(tick, 1000));
  }
  tick();
}

/* ---------- Fireflies (ambient background) ---------- */
function initFireflies(){
  const container = document.getElementById("fireflies");
  const count = window.innerWidth < 720 ? 12 : 24;
  for (let i = 0; i < count; i++){
    const f = document.createElement("span");
    f.className = "firefly";
    const startX = Math.random() * 100;
    const startY = 40 + Math.random() * 60;
    const dx = (Math.random() - 0.5) * 200;
    const dy = -100 - Math.random() * 200;
    f.style.left = startX + "vw";
    f.style.top = startY + "vh";
    f.style.setProperty("--dx", dx + "px");
    f.style.setProperty("--dy", dy + "px");
    f.style.animationDuration = 8 + Math.random() * 10 + "s";
    f.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(f);
  }
}

/* ---------- Falling petals (canvas) ---------- */
function initPetals(){
  const canvas = document.getElementById("petals");
  const ctx = canvas.getContext("2d");
  let w, h, petals;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function makePetals(){
    const count = window.innerWidth < 720 ? 14 : 26;
    petals = Array.from({ length: count }, () => spawnPetal());
  }
  function spawnPetal(){
    return {
      x: Math.random() * w,
      y: Math.random() * -h,
      size: 6 + Math.random() * 8,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.6,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.2,
      hue: Math.random() > 0.5 ? "#f0b8c6" : "#f1dca6",
      opacity: 0.4 + Math.random() * 0.4,
    };
  }
  function draw(){
    ctx.clearRect(0, 0, w, h);
    petals.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.hue;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size / 1.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      p.y += p.speedY;
      p.x += p.speedX;
      p.rot += p.rotSpeed;
      if (p.y > h + 20) Object.assign(p, spawnPetal(), { y: -20 });
    });
    if (!prefersReduced) requestAnimationFrame(draw);
  }

  resize();
  makePetals();
  window.addEventListener("resize", () => { resize(); });
  draw();
}

/* ---------- Scroll reveal ---------- */
function initReveal(){
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting){
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((i) => io.observe(i));
}

/* ---------- Cake candles ---------- */
let candlesLit = CANDLE_COUNT;

function buildCandles(){
  const wrap = document.getElementById("candles");
  wrap.innerHTML = "";
  for (let i = 0; i < CANDLE_COUNT; i++){
    const c = document.createElement("div");
    c.className = "candle";
    c.setAttribute("role", "button");
    c.setAttribute("tabindex", "0");
    c.setAttribute("aria-label", "Blow out candle " + (i + 1));
    c.innerHTML = '<div class="flame"></div><div class="smoke"></div>';
    c.addEventListener("click", () => blowCandle(c));
    c.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " "){ e.preventDefault(); blowCandle(c); }
    });
    wrap.appendChild(c);
  }
  updateCakeStatus();
}

function blowCandle(el){
  if (el.classList.contains("out")) return;
  el.classList.add("out");
  candlesLit--;
  updateCakeStatus();
  if (candlesLit === 0) onAllCandlesOut();
}

function updateCakeStatus(){
  const status = document.getElementById("cakeStatus");
  if (candlesLit > 0){
    status.textContent = `${candlesLit} candle${candlesLit === 1 ? "" : "s"} left — make it count 🌙`;
  } else {
    status.textContent = "wish made ✨";
  }
}

function onAllCandlesOut(){
  launchConfetti();
  const wishReveal = document.getElementById("wishReveal");
  wishReveal.classList.add("is-shown");
  setTimeout(() => {
    wishReveal.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 500);
}

/* ---------- Mic "blow" detection (optional, graceful fallback) ---------- */
const micBtn = document.getElementById("micBtn");
let micActive = false;
let audioCtx, analyser, micStream;

micBtn.addEventListener("click", async () => {
  if (micActive){ stopMic(); return; }
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(micStream);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    micActive = true;
    micBtn.textContent = "🎙️ listening... blow now!";
    micBtn.setAttribute("aria-pressed", "true");
    detectBlow();
  } catch (err){
    micBtn.textContent = "mic unavailable — tap the flames instead";
    setTimeout(() => { micBtn.textContent = "🎙️ blow with your voice"; }, 2500);
  }
});

function detectBlow(){
  if (!micActive) return;
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);
  const avg = data.reduce((a, b) => a + b, 0) / data.length;

  if (avg > 45){
    const unlit = document.querySelectorAll(".candle:not(.out)");
    if (unlit.length) blowCandle(unlit[0]);
  }
  if (candlesLit > 0 && micActive){
    requestAnimationFrame(detectBlow);
  } else {
    stopMic();
  }
}

function stopMic(){
  micActive = false;
  micBtn.textContent = "🎙️ blow with your voice";
  micBtn.setAttribute("aria-pressed", "false");
  if (micStream) micStream.getTracks().forEach((t) => t.stop());
  if (audioCtx) audioCtx.close();
}

/* ---------- Confetti ---------- */
function launchConfetti(){
  const colors = ["#f0b8c6", "#f1dca6", "#e08fa6", "#fffaf5", "#d8b26b"];
  const count = window.innerWidth < 720 ? 60 : 120;

  for (let i = 0; i < count; i++){
    const piece = document.createElement("div");
    const size = 6 + Math.random() * 8;
    const startX = Math.random() * window.innerWidth;
    const duration = 2.4 + Math.random() * 1.6;
    const rotate = Math.random() * 720 - 360;
    const drift = (Math.random() - 0.5) * 200;

    Object.assign(piece.style, {
      position: "fixed",
      top: "-20px",
      left: startX + "px",
      width: size + "px",
      height: size * 1.4 + "px",
      background: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: Math.random() > 0.5 ? "50%" : "3px",
      zIndex: 9999,
      pointerEvents: "none",
      opacity: "0.95",
      transition: `transform ${duration}s cubic-bezier(.22,1,.36,1), opacity ${duration}s ease-out`,
    });

    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform = `translate(${drift}px, ${window.innerHeight + 40}px) rotate(${rotate}deg)`;
      piece.style.opacity = "0";
    });

    setTimeout(() => piece.remove(), duration * 1000 + 200);
  }
}

document.getElementById("confettiBtn").addEventListener("click", launchConfetti);

/* ---------- Wishing wall (localStorage) ---------- */
const WISH_KEY = "ainy-birthday-wishes";
const wishForm = document.getElementById("wishForm");
const wishBoard = document.getElementById("wishBoard");

function loadWishes(){
  try {
    return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
  } catch {
    return [];
  }
}
function saveWishes(wishes){
  localStorage.setItem(WISH_KEY, JSON.stringify(wishes));
}
function renderWishes(){
  const wishes = loadWishes();
  wishBoard.innerHTML = "";
  if (!wishes.length){
    wishBoard.innerHTML = '<p class="wish-board-empty">be the first to leave a wish ♡</p>';
    return;
  }
  wishes.slice().reverse().forEach((w) => {
    const note = document.createElement("div");
    note.className = "wish-note";
    note.innerHTML = `<p>${escapeHTML(w.message)}</p><span>— ${escapeHTML(w.name)}</span>`;
    wishBoard.appendChild(note);
  });
}
function escapeHTML(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

wishForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("wishName").value.trim();
  const message = document.getElementById("wishMessage").value.trim();
  if (!name || !message) return;

  const wishes = loadWishes();
  wishes.push({ name, message, ts: Date.now() });
  saveWishes(wishes);
  renderWishes();
  wishForm.reset();
  launchConfetti();
});

renderWishes();
