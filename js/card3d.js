/* ==========================================================================
   VALENCE CAPITAL — 3D TITANIUM CARD CONTROLLER
   Interactive 3D Perspective Tilt, Material Switcher & Security Flip
   ========================================================================== */

(function initCard3D() {
  const card = document.getElementById('physicalCard');
  const viewport = document.getElementById('cardViewport');
  const glare = document.getElementById('cardGlare');
  const flipBtn = document.getElementById('flipCardBtn');
  const copyBtn = document.getElementById('copyCardBtn');
  const materialPills = document.querySelectorAll('.material-pill');
  const toast = document.getElementById('hapticToast');

  if (!card || !viewport) return;

  let isFlipped = false;
  let bounds = viewport.getBoundingClientRect();

  function updateBounds() {
    bounds = viewport.getBoundingClientRect();
  }

  window.addEventListener('resize', updateBounds);
  window.addEventListener('scroll', updateBounds, { passive: true });

  // 1. Interactive 3D Perspective Tilt
  viewport.addEventListener('mousemove', (e) => {
    if (isFlipped) return; // Freeze tilt during flipped back-inspection

    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width) - 0.5;
    const yPct = (mouseY / bounds.height) - 0.5;

    // Constrain tilt rotation degrees
    const rotateY = xPct * 24;
    const rotateX = -yPct * 24;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Update dynamic specular glare gradient
    if (glare) {
      const glareX = (mouseX / bounds.width) * 100;
      const glareY = (mouseY / bounds.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
      glare.style.opacity = '0.7';
    }
  });

  viewport.addEventListener('mouseleave', () => {
    if (!isFlipped) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      if (glare) {
        glare.style.opacity = '0.3';
        glare.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%)';
      }
    }
  });

  // 2. Card Flip Controller
  function toggleFlip() {
    isFlipped = !isFlipped;
    card.classList.toggle('flipped', isFlipped);
    if (flipBtn) {
      flipBtn.innerHTML = isFlipped ? `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        View Front
      ` : `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        Reveal CVV & Details
      `;
    }
  }

  if (flipBtn) {
    flipBtn.addEventListener('click', toggleFlip);
  }

  card.addEventListener('click', (e) => {
    // Prevent flip on details copy
    if (e.target.closest('.card-action-btn')) return;
    toggleFlip();
  });

  // 3. Material Finish Switcher
  materialPills.forEach(pill => {
    pill.addEventListener('click', () => {
      materialPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const material = pill.getAttribute('data-material');
      const faces = card.querySelectorAll('.card-face');

      faces.forEach(face => {
        face.classList.remove('titanium', 'platinum', 'tungsten');
        face.classList.add(material);
      });

      showToast(`Selected ${pill.textContent.trim()} Finish`);
    });
  });

  // 4. Copy Details Toast
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText('4532 •••• •••• 8842 | EXP 09/30 | CVV 418').catch(() => {});
      showToast('Card Credentials Copied to Clipboard ✓');
    });
  }
})();
