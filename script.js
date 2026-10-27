/* ═══════════════════════════════════════════════════════
   🌸 Birthday Surprise — Complete Interactive Engine
   Particle Canvas + State Machine + All 7 Screen Logic
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Application State ──
  const state = {
    isAuthenticated: false,
    currentScreen: 1,
    candlesLit: { 1: false, 2: false, 3: false },
    cakeCut: false,
    musicPlaying: false,
    currentMemory: 0,
    flowersRevealed: { 0: false, 1: false, 2: false },
    bouquetModalVisible: false
  };

  const CFG = window.SURPRISE_CONFIG || {};

  // ══════════════════════════════════════
  // 1. BACKGROUND PARTICLE CANVAS
  // ══════════════════════════════════════
  const bgCanvas = document.getElementById('bg-canvas');
  const bgCtx = bgCanvas.getContext('2d');
  let particles = [];

  function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }

  class Particle {
    constructor(type) {
      this.type = type; // 'dot', 'petal', 'sparkle'
      this.reset();
    }

    reset() {
      this.x = Math.random() * bgCanvas.width;
      this.y = Math.random() * bgCanvas.height - bgCanvas.height;
      this.size = this.type === 'petal' ? 4 + Math.random() * 6 :
        this.type === 'sparkle' ? 2 + Math.random() * 3 :
          2 + Math.random() * 4;
      this.speedY = 0.2 + Math.random() * 0.6;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
      this.opacity = 0.2 + Math.random() * 0.5;
      this.fadeDir = Math.random() > 0.5 ? 1 : -1;

      const palettes = {
        dot: ['rgba(255,183,197,', 'rgba(255,216,190,', 'rgba(208,188,254,', 'rgba(255,240,245,'],
        petal: ['rgba(255,183,197,', 'rgba(255,200,215,', 'rgba(255,220,230,'],
        sparkle: ['rgba(255,225,120,', 'rgba(255,255,255,', 'rgba(255,240,160,'],
        heart: ['rgba(255,130,175,', 'rgba(255,175,205,', 'rgba(255,90,150,']
      };
      const p = palettes[this.type];
      this.colorBase = p[Math.floor(Math.random() * p.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.005) * 0.35;
      this.rotation += this.rotSpeed;

      if (this.type === 'sparkle' || this.type === 'heart') {
        this.opacity += this.fadeDir * 0.015;
        if (this.opacity >= 0.85) this.fadeDir = -1;
        if (this.opacity <= 0.15) this.fadeDir = 1;
      }

      if (this.y > bgCanvas.height + 25) {
        this.y = -20;
        this.x = Math.random() * bgCanvas.width;
      }
    }

    draw() {
      bgCtx.save();
      bgCtx.translate(this.x, this.y);
      bgCtx.rotate(this.rotation);
      bgCtx.globalAlpha = Math.max(0, Math.min(1, this.opacity));

      if (this.type === 'dot') {
        bgCtx.beginPath();
        bgCtx.arc(0, 0, this.size, 0, Math.PI * 2);
        bgCtx.fillStyle = this.colorBase + this.opacity + ')';
        bgCtx.fill();
      } else if (this.type === 'petal') {
        bgCtx.fillStyle = this.colorBase + this.opacity + ')';
        for (let i = 0; i < 5; i++) {
          bgCtx.beginPath();
          bgCtx.ellipse(0, -this.size * 0.6, this.size * 0.35, this.size * 0.7, (i * Math.PI * 2) / 5, 0, Math.PI * 2);
          bgCtx.fill();
        }
      } else if (this.type === 'sparkle') {
        bgCtx.fillStyle = this.colorBase + this.opacity + ')';
        const s = this.size;
        bgCtx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          bgCtx.moveTo(0, 0);
          bgCtx.lineTo(Math.cos(angle - 0.15) * s * 0.3, Math.sin(angle - 0.15) * s * 0.3);
          bgCtx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
          bgCtx.lineTo(Math.cos(angle + 0.15) * s * 0.3, Math.sin(angle + 0.15) * s * 0.3);
        }
        bgCtx.closePath();
        bgCtx.fill();
      } else if (this.type === 'heart') {
        bgCtx.fillStyle = this.colorBase + this.opacity + ')';
        const s = this.size * 0.75;
        bgCtx.beginPath();
        bgCtx.moveTo(0, s * 0.3);
        bgCtx.bezierCurveTo(-s * 0.6, -s * 0.6, -s * 1.2, s * 0.2, 0, s * 1.2);
        bgCtx.bezierCurveTo(s * 1.2, s * 0.2, s * 0.6, -s * 0.6, 0, s * 0.3);
        bgCtx.fill();
      }

      bgCtx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 20; i++) particles.push(new Particle('dot'));
    for (let i = 0; i < 14; i++) particles.push(new Particle('petal'));
    for (let i = 0; i < 16; i++) particles.push(new Particle('sparkle'));
    for (let i = 0; i < 14; i++) particles.push(new Particle('heart'));
    // Spread them across the screen initially
    particles.forEach(p => {
      p.y = Math.random() * bgCanvas.height;
    });
  }

  function animateParticles() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  resizeBgCanvas();
  initParticles();
  animateParticles();
  window.addEventListener('resize', () => {
    resizeBgCanvas();
  });


  // ══════════════════════════════════════
  // 2. CONFETTI BURST ENGINE
  // ══════════════════════════════════════
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];
  let confettiActive = false;

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeConfetti();
  window.addEventListener('resize', resizeConfetti);

  function fireConfetti(originX, originY, count) {
    count = count || 80;
    originX = originX || window.innerWidth / 2;
    originY = originY || window.innerHeight / 2;

    const colors = ['#FF758C', '#FF7EB3', '#FFB7C5', '#FFD8BE', '#D0BCFE', '#E8DFF5', '#FCF6BD', '#F4A261', '#fff'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 7;
      confettiPieces.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.12 + Math.random() * 0.08,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    if (!confettiActive) {
      confettiActive = true;
      animateConfetti();
    }
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.006;
    });

    confettiPieces = confettiPieces.filter(p => p.opacity > 0 && p.y < confettiCanvas.height + 50);

    confettiPieces.forEach(p => {
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillStyle = p.color;

      if (p.shape === 'rect') {
        confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      }
      confettiCtx.restore();
    });

    if (confettiPieces.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiActive = false;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }


  // ══════════════════════════════════════
  // 3. SOUND FX ENGINE (Web Audio API)
  // ══════════════════════════════════════
  let audioCtx;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playSound(type) {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      switch (type) {
        case 'pop':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.15);
          break;

        case 'crack':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.25);
          break;

        case 'match':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.12);
          break;

        case 'chime':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1047, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.6);
          // Add second harmonic
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1319, ctx.currentTime + 0.1);
          gain2.gain.setValueAtTime(0.08, ctx.currentTime + 0.1);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
          osc2.start(ctx.currentTime + 0.1);
          osc2.stop(ctx.currentTime + 0.7);
          break;

        case 'sparkle':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(2000, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.05);
          osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.2);
          break;
      }
    } catch (e) {
      // Silently fail if audio isn't available
    }
  }


  // ══════════════════════════════════════
  // 4. SCREEN NAVIGATION / ROUTER
  // ══════════════════════════════════════
  const screenIds = [
    'screen-welcome',   // 1
    'screen-cake',      // 2
    'screen-wish',      // 3
    'screen-album',     // 4
    'screen-envelope',  // 5 (after album and before letter)
    'screen-letter'     // 6
  ];

  const screenNames = [
    'Welcome',
    'Birthday Cake',
    'Birthday Wish',
    'Photo Album',
    'Envelope',
    'Love Letter'
  ];

  function showCornerNav() {
    document.querySelectorAll('.corner-nav-btn').forEach(btn => btn.classList.add('nav-visible'));
    const globalMusicBtn = document.getElementById('global-music-toggle');
    if (globalMusicBtn) globalMusicBtn.classList.add('visible');
  }

  function updateTopNav(screenNum) {
    const prevBtn = document.getElementById('nav-btn-prev');
    const nextBtn = document.getElementById('nav-btn-next');

    if (prevBtn) {
      if (screenNum <= 1) {
        prevBtn.setAttribute('disabled', 'true');
        prevBtn.classList.add('nav-disabled');
      } else {
        prevBtn.removeAttribute('disabled');
        prevBtn.classList.remove('nav-disabled');
      }
    }

    if (nextBtn) {
      if (screenNum >= screenIds.length) {
        nextBtn.setAttribute('disabled', 'true');
        nextBtn.classList.add('nav-disabled');
      } else {
        nextBtn.removeAttribute('disabled');
        nextBtn.classList.remove('nav-disabled');
      }
    }
  }

  function navigateTo(screenNum) {
    if (!state.isAuthenticated) {
      return;
    }
    const targetNum = Math.max(1, Math.min(screenIds.length, screenNum));
    state.currentScreen = targetNum;

    // Body class state locks
    document.body.classList.toggle('welcome-active', targetNum === 1);
    document.body.classList.toggle('wish-active', targetNum === 3);
    document.body.classList.toggle('album-active', targetNum === 4);

    // Strictly ensure ONLY the target screen has active class; all others are deactivated
    screenIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (idx + 1 === targetNum) {
        el.classList.add('active');
        el.classList.remove('exit');
      } else {
        el.classList.remove('active');
        el.classList.remove('exit');
      }
    });

    // If navigating away from Screen 3 (Birthday Wish), pause dedicated wish song
    if (targetNum !== 3 && typeof pauseWishSong === 'function') {
      pauseWishSong();
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    updateTopNav(targetNum);
  }

  // Set welcome-active & initialize top navigation on start
  document.body.classList.add('welcome-active');
  updateTopNav(1);

  // Wire Top Corner Navigation Controls
  const navBtnPrev = document.getElementById('nav-btn-prev');
  const navBtnNext = document.getElementById('nav-btn-next');

  if (navBtnPrev) {
    navBtnPrev.addEventListener('click', function () {
      if (state.isAuthenticated && state.currentScreen > 1) {
        playSound('pop');
        navigateTo(state.currentScreen - 1);
      }
    });
  }

  if (navBtnNext) {
    navBtnNext.addEventListener('click', function () {
      if (state.isAuthenticated && state.currentScreen < screenIds.length) {
        playSound('pop');
        navigateTo(state.currentScreen + 1);
      }
    });
  }

  // ══════════════════════════════════════
  // GRAND CURTAIN OPENING LOADER
  // ══════════════════════════════════════
  const curtainLoader = document.getElementById('curtain-loader');
  const curtainFill = document.getElementById('curtain-fill');

  function triggerCurtainOpening() {
    if (!curtainLoader) {
      showCornerNav();
      return;
    }

    setTimeout(() => {
      if (curtainFill) curtainFill.style.width = '100%';
    }, 150);

    setTimeout(() => {
      curtainLoader.classList.add('opened');
      playSound('pop');
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 60);

      setTimeout(() => {
        curtainLoader.style.display = 'none';
        showCornerNav();
      }, 1000);
    }, 1000);
  }

  // ══════════════════════════════════════
  // VIP SECURITY PASSCODE AUTHENTICATION
  // Allowed Codes: "HBDTOMAWA" & "LAB3" (case-insensitive)
  // ══════════════════════════════════════
  const VALID_AUTH_CODES = ['HBDTOMAWA', 'LAB3'];
  const authGatekeeper = document.getElementById('auth-gatekeeper');
  const authCard = document.getElementById('auth-card');
  const authForm = document.getElementById('auth-form');
  const authInput = document.getElementById('auth-code-input');
  const authInputGroup = document.getElementById('auth-input-group');
  const authFeedback = document.getElementById('auth-feedback');
  const authLockEmoji = document.getElementById('auth-lock-emoji');
  const authClearBtn = document.getElementById('auth-clear-btn');

  const funnyWrongMessages = [
    "Nice try! But only Mawa's real friends know the secret code! 😜🔑",
    "Bzzt! Wrong passcode! Did you forget the sacred birthday mantra? 😂",
    "Nope! Try again with true friend energy! 🍰",
    "Access Denied! The birthday kitten says: 'Not on my watch!' 🐱🚫",
    "Whoopsie! Wrong code! Are you an undercover party crasher? 🕵️‍♀️🎈"
  ];

  if (authGatekeeper && authForm && authInput) {
    // Focus input on load
    setTimeout(() => {
      authInput.focus();
    }, 250);

    // Toggle clear button and reset error state when typing
    authInput.addEventListener('input', function () {
      if (this.value.trim().length > 0) {
        authInputGroup.classList.add('has-text');
      } else {
        authInputGroup.classList.remove('has-text');
      }
      authInputGroup.classList.remove('error');
      if (authFeedback && authFeedback.classList.contains('err')) {
        authFeedback.textContent = '';
        authFeedback.className = 'auth-feedback';
      }
    });

    // Clear button functionality
    if (authClearBtn) {
      authClearBtn.addEventListener('click', function () {
        authInput.value = '';
        authInputGroup.classList.remove('has-text', 'error');
        if (authFeedback) {
          authFeedback.textContent = '';
          authFeedback.className = 'auth-feedback';
        }
        authInput.focus();
      });
    }

    // Form submit listener
    authForm.addEventListener('submit', function (e) {
      e.preventDefault();
      validatePasscode();
    });

    function validatePasscode() {
      if (state.isAuthenticated) return;

      const rawVal = authInput.value || '';
      const enteredCode = rawVal.trim().toUpperCase();

      if (!enteredCode) {
        authInputGroup.classList.add('error');
        if (authFeedback) {
          authFeedback.className = 'auth-feedback err';
          authFeedback.textContent = "Please enter the passcode first! 🧐🔑";
        }
        if (authCard) {
          authCard.classList.remove('shake');
          void authCard.offsetWidth; // force reflow
          authCard.classList.add('shake');
        }
        playSound('crack');
        authInput.focus();
        return;
      }

      if (VALID_AUTH_CODES.includes(enteredCode)) {
        // Authenticated successfully!
        state.isAuthenticated = true;
        authInputGroup.classList.remove('error');
        authInputGroup.classList.add('success');

        if (authFeedback) {
          authFeedback.className = 'auth-feedback ok';
          authFeedback.textContent = "🎉 Access Granted! Welcome Mawa! Opening surprise... ✨";
        }

        if (authLockEmoji) {
          authLockEmoji.textContent = '🔓';
          setTimeout(() => { if (authLockEmoji) authLockEmoji.textContent = '🎉'; }, 300);
        }

        playSound('chime');
        playSound('sparkle');
        fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 85);

        authInput.setAttribute('disabled', 'true');
        const submitBtn = document.getElementById('auth-submit-btn');
        if (submitBtn) submitBtn.setAttribute('disabled', 'true');

        setTimeout(() => {
          authGatekeeper.classList.add('unlocked');
          triggerCurtainOpening();

          setTimeout(() => {
            authGatekeeper.style.display = 'none';
          }, 700);
        }, 750);

      } else {
        // Wrong passcode!
        authInputGroup.classList.add('error');
        if (authFeedback) {
          authFeedback.className = 'auth-feedback err';
          const randomMsg = funnyWrongMessages[Math.floor(Math.random() * funnyWrongMessages.length)];
          authFeedback.textContent = randomMsg;
        }

        if (authCard) {
          authCard.classList.remove('shake');
          void authCard.offsetWidth; // force reflow
          authCard.classList.add('shake');
        }

        playSound('crack');
        authInput.select();
      }
    }
  } else {
    // Fallback if no gatekeeper in DOM
    state.isAuthenticated = true;
    triggerCurtainOpening();
  }

  // ══════════════════════════════════════
  // 5. SCREEN 1: Welcome Live Interactions
  // ══════════════════════════════════════
  const welcomeSection = document.getElementById('screen-welcome');
  let lastSparkleTime = 0;

  // Live cursor fairy-dust sparkles on welcome screen
  welcomeSection.addEventListener('mousemove', function (e) {
    const now = Date.now();
    if (now - lastSparkleTime > 45) {
      lastSparkleTime = now;
      const spark = document.createElement('span');
      spark.className = 'cursor-sparkle';
      spark.textContent = Math.random() > 0.5 ? '✦' : '✧';
      spark.style.left = e.clientX + (Math.random() * 14 - 7) + 'px';
      spark.style.top = e.clientY + (Math.random() * 14 - 7) + 'px';
      spark.style.fontSize = (11 + Math.random() * 12) + 'px';
      spark.style.color = Math.random() > 0.4 ? '#FFE066' : '#FF7FA5';
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }

    // Parallax depth shift on 3D floaters
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    const floaters = welcomeSection.querySelectorAll('.float-item');
    floaters.forEach((item, idx) => {
      const depth = (idx % 3 + 1) * 7;
      item.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
    });
  });

  document.getElementById('btn-open-gift').addEventListener('click', function (e) {
    playSound('pop');
    const rect = this.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);

    setTimeout(() => navigateTo(2), 800);
  });


  // ══════════════════════════════════════
  // 6. SCREEN 2: Envelope
  // ══════════════════════════════════════
  const waxSeal = document.getElementById('wax-seal');
  const envelopeFlap = document.getElementById('envelope-flap');

  waxSeal.addEventListener('click', function () {
    if (this.classList.contains('cracked')) {
      navigateTo(6);
      return;
    }

    playSound('crack');
    this.classList.add('cracked');

    // Sparkle burst at seal location
    const rect = this.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

    // Open flap
    setTimeout(() => {
      envelopeFlap.classList.add('opened');
    }, 400);

    // Navigate to letter screen (Screen 6)
    setTimeout(() => navigateTo(6), 1500);
  });


  // ══════════════════════════════════════
  // 7. SCREEN 3: Birthday Cake
  // ══════════════════════════════════════
  const candleBtns = document.querySelectorAll('.candle-btn');
  const cakeBody = document.getElementById('cake-body');
  const cakeHelper = document.getElementById('cake-helper');
  const cakeTitle = document.getElementById('cake-title');
  const cakeSubtitle = document.getElementById('cake-subtitle');

  candleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const num = parseInt(this.dataset.candle);
      if (state.candlesLit[num]) return;

      playSound('match');
      state.candlesLit[num] = true;

      // Light the flame
      document.getElementById('flame-' + num).classList.add('lit');

      // Update button
      this.classList.add('lit');
      this.textContent = '✦ LIT';

      // Update progress dot
      document.getElementById('dot-' + num).classList.add('filled');

      // Check if all lit
      if (state.candlesLit[1] && state.candlesLit[2] && state.candlesLit[3]) {
        const cfg = CFG.cake || {};
        cakeHelper.textContent = cfg.cutPrompt || 'now tap the cake to cut it! 🎂';
        cakeHelper.classList.add('excited');
        cakeBody.classList.add('clickable');

        // Enable cake click
        cakeBody.addEventListener('click', handleCakeCut, { once: true });
      }
    });
  });

  function handleCakeCut() {
    if (state.cakeCut) return;
    state.cakeCut = true;

    playSound('chime');
    cakeBody.classList.remove('clickable');
    cakeBody.classList.add('cut');

    // Confetti
    const rect = cakeBody.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top, 120);

    // Update text
    const cfg = CFG.cake || {};
    cakeTitle.textContent = cfg.wishTitle || 'wish made ♡';
    cakeSubtitle.textContent = cfg.wishSubtitle || 'may every single one of them come true this year.';
    cakeHelper.style.display = 'none';
    document.getElementById('candle-progress').style.display = 'none';
    document.querySelector('.candle-controls').style.display = 'none';

    // Auto-navigate after celebration to Birthday Wish (Screen 3)
    setTimeout(() => navigateTo(3), 2500);
  }


  // ══════════════════════════════════════
  // 8. DUAL AUDIO ENGINE (2 Separate Songs):
  //    A. Global Background Piano Music (Helmut Schenker) -> Bottom-Right Speaker Toggle
  //    B. Wishes Page Dedicated Song (ReelAudio-15234) -> In-Page Music Card Player
  //    Collision-Free Mutual Exclusion
  // ══════════════════════════════════════
  const globalBgAudio = document.getElementById('global-bg-audio');
  const wishSongAudio = document.getElementById('birthday-audio');
  const globalMusicBtn = document.getElementById('global-music-toggle');
  const playBtn = document.getElementById('play-btn');
  const progressFill = document.getElementById('progress-fill');
  const progressWrapper = document.getElementById('progress-wrapper');
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  const albumCoverContainer = document.querySelector('.album-cover-container');

  // Set Global Background Piano Audio (Helmut Schenker)
  if (globalBgAudio) {
    globalBgAudio.loop = true;
    globalBgAudio.volume = 0.3; // Soft background ambient piano
  }

  // Set Dedicated Wishes Page Song (ReelAudio)
  if (wishSongAudio) {
    wishSongAudio.volume = 0.6; // Clear volume for dedicated song
    if (CFG.music && CFG.music.url) {
      wishSongAudio.src = CFG.music.url;
    }
  }

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // ─── A. GLOBAL BACKGROUND MUSIC (Helmut Schenker Piano) ───
  function updateGlobalSpeakerUI(isPlaying) {
    if (!globalMusicBtn) return;
    if (isPlaying) {
      globalMusicBtn.classList.add('playing');
      globalMusicBtn.setAttribute('title', 'Mute Background Music 🔇');
      globalMusicBtn.setAttribute('aria-label', 'Mute Background Music');
    } else {
      globalMusicBtn.classList.remove('playing');
      globalMusicBtn.setAttribute('title', 'Play Background Music (Piano) 🎵');
      globalMusicBtn.setAttribute('aria-label', 'Play Background Music');
    }
  }

  function toggleGlobalBgMusic() {
    if (!globalBgAudio) return;
    playSound('pop');

    if (globalBgAudio.paused) {
      // Collision avoidance: pause wishes page song if currently playing
      if (wishSongAudio && !wishSongAudio.paused) {
        wishSongAudio.pause();
        updateWishPlayerUI(false);
      }
      globalBgAudio.play().then(() => {
        updateGlobalSpeakerUI(true);
      }).catch(err => console.warn("Global BG Audio playback:", err));
    } else {
      globalBgAudio.pause();
      updateGlobalSpeakerUI(false);
    }
  }

  if (globalMusicBtn) {
    globalMusicBtn.addEventListener('click', toggleGlobalBgMusic);
  }

  if (globalBgAudio) {
    globalBgAudio.addEventListener('play', () => updateGlobalSpeakerUI(true));
    globalBgAudio.addEventListener('pause', () => updateGlobalSpeakerUI(false));
  }

  // ─── B. WISHES PAGE DEDICATED SONG (ReelAudio) ───
  function updateWishPlayerUI(isPlaying) {
    state.musicPlaying = isPlaying;

    if (playBtn) {
      if (isPlaying) {
        playBtn.innerHTML = `
          <svg class="play-icon-svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1.5"/>
            <rect x="14" y="4" width="4" height="16" rx="1.5"/>
          </svg>`;
      } else {
        playBtn.innerHTML = `
          <svg class="play-icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" style="margin-left: 2px;">
            <path d="M8 5v14l11-7z"/>
          </svg>`;
      }
    }

    if (albumCoverContainer) {
      if (isPlaying) {
        albumCoverContainer.classList.add('spinning');
      } else {
        albumCoverContainer.classList.remove('spinning');
      }
    }
  }

  function toggleWishSong() {
    if (!wishSongAudio) return;
    playSound('pop');

    if (wishSongAudio.paused) {
      // Collision avoidance: pause global background music while dedicated song plays!
      if (globalBgAudio && !globalBgAudio.paused) {
        globalBgAudio.pause();
        updateGlobalSpeakerUI(false);
      }

      wishSongAudio.play().then(() => {
        updateWishPlayerUI(true);
      }).catch(err => console.warn("Wish Song playback:", err));
    } else {
      wishSongAudio.pause();
      updateWishPlayerUI(false);
    }
  }

  // Function called by router when leaving wishes page
  function pauseWishSong() {
    if (wishSongAudio && !wishSongAudio.paused) {
      wishSongAudio.pause();
      updateWishPlayerUI(false);
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', toggleWishSong);
  }

  if (wishSongAudio) {
    wishSongAudio.addEventListener('play', () => updateWishPlayerUI(true));
    wishSongAudio.addEventListener('pause', () => updateWishPlayerUI(false));

    wishSongAudio.addEventListener('timeupdate', function () {
      if (wishSongAudio.duration && progressFill && timeCurrent) {
        const pct = (wishSongAudio.currentTime / wishSongAudio.duration) * 100;
        progressFill.style.width = pct + '%';
        timeCurrent.textContent = formatTime(wishSongAudio.currentTime);
      }
    });

    wishSongAudio.addEventListener('loadedmetadata', function () {
      if (timeTotal) timeTotal.textContent = formatTime(wishSongAudio.duration);
    });

    wishSongAudio.addEventListener('ended', function () {
      updateWishPlayerUI(false);
      if (progressFill) progressFill.style.width = '0%';
      if (timeCurrent) timeCurrent.textContent = '0:00';
    });
  }

  // Progress bar seek on Wishes page
  if (progressWrapper) {
    progressWrapper.addEventListener('click', function (e) {
      if (wishSongAudio && wishSongAudio.duration) {
        const rect = this.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        wishSongAudio.currentTime = pct * wishSongAudio.duration;
      }
    });
  }

  // Navigate to album (Screen 4)
  document.getElementById('btn-album').addEventListener('click', function () {
    playSound('pop');
    navigateTo(4);
  });


  // ══════════════════════════════════════
  // 9. SCREEN 5: Polaroid 3D Coverflow Carousel (5 Cards)
  // ══════════════════════════════════════
  const memories = (CFG.album && CFG.album.memories) || [
    { image: 'assets/memory1.jpg', tag: 'MEMORY 01 / 05', caption: '' },
    { image: 'assets/mascot-kitten.jpg', tag: 'MEMORY 02 / 05', caption: '' },
    { image: 'assets/memory3.jpg', tag: 'MEMORY 03 / 05', caption: '' },
    { image: 'assets/sleepy-kittens.jpg', tag: 'MEMORY 04 / 05', caption: '' },
    { image: 'assets/kitten-cloud.jpg', tag: 'MEMORY 05 / 05', caption: '' }
  ];

  const polaroidCaption = document.getElementById('polaroid-caption');
  const carouselCards = document.querySelectorAll('.carousel-card');
  const photoPreview = document.getElementById('album-photo-preview');
  const photoPreviewImage = document.getElementById('album-photo-preview-image');
  const photoPreviewClose = document.getElementById('album-photo-preview-close');

  function closePhotoPreview() {
    if (!photoPreview) return;
    photoPreview.classList.remove('visible');
    photoPreview.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('album-preview-open');
    photoPreviewImage.removeAttribute('src');
  }

  carouselCards.forEach((card) => {
    const image = card.querySelector('.polaroid-img');
    if (!image) return;
    image.addEventListener('click', (event) => {
      event.stopPropagation();
      photoPreviewImage.src = image.currentSrc || image.src;
      photoPreviewImage.alt = image.alt || 'Expanded album memory';
      photoPreview.classList.add('visible');
      photoPreview.setAttribute('aria-hidden', 'false');
      document.body.classList.add('album-preview-open');
      photoPreviewClose.focus();
    });
  });

  photoPreviewClose.addEventListener('click', closePhotoPreview);
  photoPreview.addEventListener('click', (event) => {
    if (event.target === photoPreview) closePhotoPreview();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && photoPreview.classList.contains('visible')) {
      closePhotoPreview();
    }
  });

  function updatePolaroid() {
    const N = memories.length;
    const cur = state.currentMemory;

    // Update 3D card positions & classes
    carouselCards.forEach((card) => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      card.classList.remove('slot-active', 'slot-prev', 'slot-next', 'slot-far-prev', 'slot-far-next', 'slot-hidden');

      // Calculate circular distance
      let diff = (idx - cur + N) % N;
      if (diff > N / 2) diff -= N;

      if (diff === 0) {
        card.classList.add('slot-active');
      } else if (diff === -1) {
        card.classList.add('slot-prev');
      } else if (diff === 1) {
        card.classList.add('slot-next');
      } else if (diff === -2) {
        card.classList.add('slot-far-prev');
      } else if (diff === 2) {
        card.classList.add('slot-far-next');
      } else {
        card.classList.add('slot-hidden');
      }
    });

    // Update caption (hide if empty)
    if (polaroidCaption) {
      const capText = (memories[cur] && memories[cur].caption) || '';
      if (!capText) {
        polaroidCaption.style.display = 'none';
        polaroidCaption.textContent = '';
      } else {
        polaroidCaption.style.display = '';
        polaroidCaption.style.opacity = '0';
        polaroidCaption.style.transform = 'translateY(4px)';
        setTimeout(() => {
          polaroidCaption.textContent = capText;
          polaroidCaption.style.opacity = '1';
          polaroidCaption.style.transform = 'translateY(0)';
        }, 150);
      }
    }

    // Update pagination dots
    const dots = document.querySelectorAll('.album-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === cur);
    });
  }

  // Next / Prev button triggers
  document.getElementById('carousel-prev').addEventListener('click', function () {
    playSound('pop');
    state.currentMemory = (state.currentMemory - 1 + memories.length) % memories.length;
    updatePolaroid();
  });

  document.getElementById('carousel-next').addEventListener('click', function () {
    playSound('pop');
    state.currentMemory = (state.currentMemory + 1) % memories.length;
    updatePolaroid();
  });

  // Click on cards to navigate directly
  carouselCards.forEach(card => {
    card.addEventListener('click', function () {
      const idx = parseInt(this.getAttribute('data-index'), 10);
      if (this.classList.contains('slot-prev')) {
        playSound('pop');
        state.currentMemory = (state.currentMemory - 1 + memories.length) % memories.length;
        updatePolaroid();
      } else if (this.classList.contains('slot-next')) {
        playSound('pop');
        state.currentMemory = (state.currentMemory + 1) % memories.length;
        updatePolaroid();
      } else if (!this.classList.contains('slot-active')) {
        playSound('pop');
        state.currentMemory = idx;
        updatePolaroid();
      }
    });
  });

  // Pagination dots click handler
  document.querySelectorAll('.album-dot').forEach(dot => {
    dot.addEventListener('click', function () {
      const idx = parseInt(this.getAttribute('data-index'), 10);
      if (!isNaN(idx) && idx !== state.currentMemory) {
        playSound('pop');
        state.currentMemory = idx;
        updatePolaroid();
      }
    });
  });

  // Touch Swipe for Mobile
  const stage = document.getElementById('polaroid-stage');
  if (stage) {
    let startX = 0;
    stage.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      if (Math.abs(diffX) > 40) {
        playSound('pop');
        if (diffX > 0) {
          state.currentMemory = (state.currentMemory - 1 + memories.length) % memories.length;
        } else {
          state.currentMemory = (state.currentMemory + 1) % memories.length;
        }
        updatePolaroid();
      }
    }, { passive: true });
  }

  // Initial call to set up 3D slot positions
  updatePolaroid();

  const albumNextBtn = document.getElementById('btn-bouquet');
  if (albumNextBtn) {
    albumNextBtn.addEventListener('click', function () {
      playSound('pop');
      navigateTo(5); // Goes to Screen 5: Envelope (before letter)
    });
  }


  // ══════════════════════════════════════
  // 10. SCREEN 6: Letter + Restart
  // ══════════════════════════════════════
  const restartBtn = document.getElementById('btn-restart');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => window.location.reload());
  }


  // 12. APPLY CONFIG TO DOM
  // ══════════════════════════════════════
  function applyConfig() {
    function setBtnText(btnId, text) {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const labelSpan = btn.querySelector('.btn-label-text') || btn.querySelector('span:not(.btn-gift-icon):not(.btn-chevron)') || btn.querySelector('span');
      const clean = text.replace(/^[^\w\s\u00C0-\u017F\u4e00-\u9fa5]+/, '').replace(/[➔➜➝→>›]/g, '').trim();
      if (labelSpan) {
        labelSpan.textContent = clean;
      } else {
        btn.textContent = clean;
      }
    }

    // Welcome
    if (CFG.welcome) {
      const w = CFG.welcome;
      if (w.badge) {
        const badgeEl = document.getElementById('badge-welcome');
        const badgeText = badgeEl ? badgeEl.querySelector('.badge-text') : null;
        if (badgeText) {
          badgeText.textContent = w.badge.replace(/^[^\w\s\u00C0-\u017F\u4e00-\u9fa5]+/, '').trim();
        } else if (badgeEl) {
          badgeEl.textContent = w.badge;
        }
      }
      if (w.title) document.getElementById('welcome-title').textContent = w.title;
      if (w.subtitle) document.getElementById('welcome-subtitle').textContent = w.subtitle;
      if (w.buttonText) setBtnText('btn-open-gift', w.buttonText);
    }

    // Envelope
    if (CFG.envelope) {
      const e = CFG.envelope;
      if (e.badge) document.getElementById('badge-envelope').textContent = e.badge;
      if (e.title) document.getElementById('envelope-title').textContent = e.title;
      if (e.subtitle) document.getElementById('envelope-subtitle').textContent = e.subtitle;
      if (e.prompt) document.getElementById('seal-prompt').textContent = e.prompt;
    }

    // Cake
    if (CFG.cake) {
      const c = CFG.cake;
      if (c.badge) document.getElementById('badge-cake').textContent = c.badge;
      if (c.title) document.getElementById('cake-title').textContent = c.title;
      if (c.helperText) cakeHelper.textContent = c.helperText;
    }

    // Wish
    if (CFG.wish) {
      const ws = CFG.wish;
      if (ws.badge) {
        const badgeWish = document.getElementById('badge-wish');
        if (badgeWish) {
          const spans = badgeWish.querySelectorAll('span');
          if (spans.length >= 2) spans[1].textContent = ws.badge.replace(/[✨✦]/g, '').trim();
          else badgeWish.textContent = ws.badge;
        }
      }
      if (ws.title) {
        const titleEl = document.getElementById('wish-title');
        if (titleEl) {
          if (ws.title.includes('<span')) {
            titleEl.innerHTML = ws.title;
          } else {
            const raw = ws.title.trim();
            const friend = CFG.friendName || "Lahari";
            let line1 = "Happy Birthday";
            let name = friend;
            if (raw.toLowerCase().includes(friend.toLowerCase())) {
              line1 = raw.replace(new RegExp(friend, 'i'), '').trim() || "Happy Birthday";
              name = friend;
            } else if (raw !== "Happy Birthday") {
              line1 = raw;
            }
            titleEl.innerHTML = `
              <span class="wish-title-line1">${line1}</span>
              <span class="wish-title-name-container">
                <span class="wish-title-name">Lahar<span class="name-i-wrap"><span class="dotless-i">ı</span><span class="name-heart-dot">♥</span></span></span>
                <span class="wish-name-flourish" aria-hidden="true">
                  <svg viewBox="0 0 170 32" fill="none">
                    <path d="M 8 10 C 45 22, 95 24, 136 12 Q 142 10, 145 8" stroke="#FF2E6D" stroke-width="2.4" stroke-linecap="round" />
                    <g transform="translate(138, -3) scale(0.62) rotate(20 12 12)">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#FF2E6D" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg>
                </span>
              </span>`;
          }
        }
      }
      if (ws.message) {
        const msgEl = document.getElementById('wish-message');
        if (msgEl) msgEl.innerHTML = ws.message;
      }
      if (ws.playerNote) document.getElementById('music-footnote').textContent = ws.playerNote;
      if (ws.buttonText) setBtnText('btn-album', ws.buttonText);
    }

    // Music
    if (CFG.music) {
      if (CFG.music.title) document.getElementById('music-title').textContent = CFG.music.title;
      if (CFG.music.artist) document.getElementById('music-artist').textContent = CFG.music.artist;
      if (CFG.music.albumArt) document.getElementById('album-art').src = CFG.music.albumArt;
    }

    // Album
    if (CFG.album) {
      if (a.badge) {
        const badgeEl = document.getElementById('badge-album');
        const textSpan = badgeEl.querySelector('span:nth-child(2)');
        if (textSpan) {
          textSpan.textContent = a.badge.replace(/[📷📸🌸✨]/g, '').trim();
        } else {
          badgeEl.textContent = a.badge;
        }
      }
      if (a.title) document.getElementById('album-title').textContent = a.title;
      if (a.subtitle) document.getElementById('album-subtitle').textContent = a.subtitle;
      if (a.buttonText) setBtnText('btn-bouquet', a.buttonText);
    }

    // Bouquet (if present)
    if (CFG.bouquet && document.getElementById('bouquet-title')) {
      const b = CFG.bouquet;
      if (b.badge && document.getElementById('badge-bouquet')) document.getElementById('badge-bouquet').textContent = b.badge;
      if (b.title && document.getElementById('bouquet-title')) document.getElementById('bouquet-title').textContent = b.title;
      if (b.subtitle && document.getElementById('bouquet-subtitle')) document.getElementById('bouquet-subtitle').textContent = b.subtitle;
    }

    // Letter
    if (CFG.letter) {
      const l = CFG.letter;
      if (l.badge) document.getElementById('badge-letter').textContent = l.badge;
      if (l.recipient) document.getElementById('letter-salutation').textContent = l.recipient;
      if (l.signOff) document.getElementById('letter-signoff').textContent = '♡ ' + l.signOff;
      if (l.signature) document.getElementById('letter-signature').textContent = l.signature;
      if (l.restartButton) setBtnText('btn-restart', l.restartButton);

      if (l.paragraphs && l.paragraphs.length > 0) {
        const body = document.getElementById('letter-body');
        body.innerHTML = '';
        l.paragraphs.forEach(text => {
          const p = document.createElement('p');
          p.className = 'letter-paragraph';
          p.textContent = text;
          body.appendChild(p);
        });
      }
    }

    // Assets
    if (CFG.assets) {
      if (CFG.assets.mascotPiglet) {
        document.getElementById('mascot-welcome').src = CFG.assets.mascotPiglet;
        document.querySelector('.letter-emblem').src = CFG.assets.mascotPiglet;
      }
      if (CFG.assets.mascotKitten) {
        document.querySelector('#screen-envelope .mascot-img').src = CFG.assets.mascotKitten;
        document.querySelector('.avatar-badge').src = CFG.assets.mascotKitten;
      }
      if (CFG.assets.sleepyKittens) {
        const bouquetAvatar = document.querySelector('.bouquet-modal-avatar');
        if (bouquetAvatar) bouquetAvatar.src = CFG.assets.sleepyKittens;
      }
    }
  }

  applyConfig();

})();
