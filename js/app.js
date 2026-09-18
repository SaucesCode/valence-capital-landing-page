/* ==========================================================================
   VALENCE CAPITAL — CORE APPLICATION JS
   Scroll Motion, Mobile Navigation, FAQ Spring Physics & Micro-Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Kinetic Scroll Reveal (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Dynamic waterfall stagger delay based on sibling index
          const stagger = (idx % 4) * 120;
          setTimeout(() => {
            entry.target.classList.add('active');
          }, stagger);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for legacy browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 2. Architectural Header Scroll Effect
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteHeader.style.background = 'rgba(9, 10, 13, 0.95)';
        siteHeader.style.borderColor = 'rgba(255, 255, 255, 0.14)';
      } else {
        siteHeader.style.background = 'var(--bg-surface-glass)';
        siteHeader.style.borderColor = 'var(--border-hairline)';
      }
    }, { passive: true });
  }

  // 3. Mobile Hamburger Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

  function toggleMobileMenu() {
    const isOpen = mobileToggle.classList.toggle('active');
    mobileDrawer.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileDrawer.classList.contains('active')) {
          toggleMobileMenu();
        }
      });
    });
  }

  // 4. Spring Physics FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Single-expand pattern: close all other open drawers
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
        }
      });

      item.classList.toggle('open', !isOpen);
    });
  });

  // 5. Code Copy Button
  const copyApiBtn = document.getElementById('copyApiBtn');
  const toast = document.getElementById('hapticToast');

  if (copyApiBtn) {
    copyApiBtn.addEventListener('click', () => {
      const snippet = `const valence = require('@valence/capital-sdk');\nconst client = new valence.Client({ apiKey: process.env.VALENCE_KEY });\n\nawait client.treasury.autoSweep({\n  sourceAccount: 'act_operating_01',\n  targetVault: 'vault_treasury_yield',\n  reserveFloor: 250000,\n  targetApy: 0.0524\n});`;
      navigator.clipboard.writeText(snippet).catch(() => {});
      
      if (toast) {
        toast.textContent = 'Valence SDK Snippet Copied ✓';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
      }
    });
  }
});
