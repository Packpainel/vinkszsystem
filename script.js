document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // PARTICLES
  // ===========================
  const particlesEl = document.getElementById('particles');
  if (particlesEl) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 8) + 's';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      const size = 1.5 + Math.random() * 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      particlesEl.appendChild(p);
    }
  }

  // ===========================
  // NAVBAR SCROLL
  // ===========================
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      topbar.style.background = 'rgba(5, 5, 7, 0.96)';
      topbar.style.borderBottomColor = 'rgba(34, 197, 94, 0.15)';
    } else {
      topbar.style.background = 'rgba(5, 5, 7, 0.88)';
      topbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
    }
  });

  // ===========================
  // SMOOTH SCROLL
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===========================
  // LIVE COUNT FLUCTUATION
  // ===========================
  const liveCountEl = document.getElementById('liveCount');
  let liveBase = 847;
  setInterval(() => {
    const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
    liveBase = Math.max(800, Math.min(920, liveBase + change));
    if (liveCountEl) liveCountEl.textContent = liveBase;
  }, 4000);

  // ===========================
  // COUNTDOWN TIMER
  // ===========================
  let totalSeconds = 14 * 60 + 59; // 14:59
  const cdMin = document.getElementById('cdMin');
  const cdSec = document.getElementById('cdSec');

  function updateCountdown() {
    if (totalSeconds <= 0) {
      totalSeconds = 9 * 60 + 59; // reset to 9:59 to keep urgency
    }
    totalSeconds--;
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    if (cdMin) cdMin.textContent = String(m).padStart(2, '0');
    if (cdSec) cdSec.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);

  // ===========================
  // SCARCITY BAR ANIMATION
  // ===========================
  const scarcityFill = document.getElementById('scarcityFill');
  const vagasSpan = document.getElementById('vagasRestantes');
  let vagas = 23;

  // Animate fill on scroll
  const scarcityObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        scarcityFill.style.width = '92%';
        scarcityObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  if (scarcityFill) {
    scarcityFill.style.width = '0%';
    scarcityObs.observe(scarcityFill.closest('.scarcity-section'));
  }

  // Slowly decrease vagas
  setInterval(() => {
    if (vagas > 5) {
      if (Math.random() > 0.6) {
        vagas--;
        if (vagasSpan) vagasSpan.textContent = vagas;
        const fillPct = ((300 - vagas) / 300) * 100;
        if (scarcityFill) scarcityFill.style.width = fillPct + '%';
      }
    }
  }, 15000);

  // ===========================
  // FLOATING CTA (MOBILE)
  // ===========================
  const floatingCta = document.getElementById('floatingCta');
  if (floatingCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    });
  }

  // ===========================
  // TOAST NOTIFICATIONS (SOCIAL PROOF)
  // ===========================
  const toastContainer = document.getElementById('toastContainer');
  const toastMessages = [
    '🟢 <strong>Lucas</strong> acabou de entrar no grupo',
    '🟢 <strong>Ana</strong> garantiu o acesso agora',
    '💰 <strong>Felipe</strong> confirmou resultado positivo',
    '🟢 <strong>Mariana</strong> acabou de entrar',
    '🔥 <strong>Pedro</strong> está no grupo há 2 semanas',
    '🟢 <strong>Camila</strong> garantiu acesso há 3 min',
    '💰 <strong>Rafael</strong> sacou agora',
    '🟢 <strong>Thiago</strong> acabou de entrar no grupo',
    '🔥 <strong>Juliana</strong> confirmou green hoje',
    '🟢 <strong>Gabriel</strong> garantiu acesso',
  ];

  let toastIndex = 0;
  function showToast() {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = toastMessages[toastIndex % toastMessages.length];
    toastContainer.appendChild(toast);
    toastIndex++;

    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 4500);
  }

  // Show first toast after 5s, then every 12-18s
  setTimeout(() => {
    showToast();
    setInterval(() => {
      showToast();
    }, 12000 + Math.random() * 6000);
  }, 5000);

  // ===========================
  // RECENT COUNT FLUCTUATION
  // ===========================
  const recentCountEl = document.getElementById('recentCount');
  let recentBase = 127;
  setInterval(() => {
    const c = Math.floor(Math.random() * 5) - 1;
    recentBase = Math.max(110, Math.min(180, recentBase + c));
    if (recentCountEl) recentCountEl.textContent = recentBase;
  }, 7000);

  // ===========================
  // DYNAMIC CHAT — ADD NEW MESSAGES
  // ===========================
  const chatBody = document.getElementById('chatBody');
  const dynamicMessages = [
    { name: 'pedro_lk', color: '#10b981', text: 'entrei ontem e já tô no lucro 🔥' },
    { name: 'mari.a', color: '#f472b6', text: 'gente tá funcionando msm?? to chocada' },
    { name: 'vinksz', color: '#22c55e', text: 'próximo sinal saindo em instantes 🎯', badge: true },
    { name: 'carlos99', color: '#6366f1', text: 'terceiro green seguido mano kkk' },
    { name: 'julia_rr', color: '#fb923c', text: 'obg vinksz!! fiz 3x o que paguei' },
    { name: 'davi.k', color: '#8b5cf6', text: 'quem não entrou ainda tá perdendo tempo' },
    { name: 'bru_silva', color: '#ec4899', text: 'saquei agora!! to sem acreditar' },
  ];

  let msgIndex = 0;

  function addDynamicMsg() {
    if (!chatBody) return;
    const msgData = dynamicMessages[msgIndex % dynamicMessages.length];
    msgIndex++;

    const msgEl = document.createElement('div');
    msgEl.classList.add('chat-msg');
    msgEl.style.animation = 'msgSlideIn 0.4s ease-out';

    const initial = msgData.name.charAt(0).toUpperCase();
    const badgeHtml = msgData.badge
      ? '<span class="msg-badge">admin</span>'
      : '';

    msgEl.innerHTML = `
      <div class="msg-avatar" style="background:${msgData.color};">${initial}</div>
      <div class="msg-content">
        <span class="msg-name" style="color:${msgData.color};">${msgData.name}</span>
        ${badgeHtml}
        <p>${msgData.text}</p>
        <span class="msg-time">agora</span>
      </div>
    `;

    chatBody.appendChild(msgEl);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Add new chat messages every 8-14 seconds
  setTimeout(() => {
    addDynamicMsg();
    setInterval(() => {
      addDynamicMsg();
    }, 8000 + Math.random() * 6000);
  }, 7000);

});
