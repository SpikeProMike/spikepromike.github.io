document.querySelectorAll('.scroll-container').forEach(container => {
      container.addEventListener('mousemove', (e) => {
        // Remove glow from all scroll items
        container.querySelectorAll('.scroll-item.glow').forEach(item => item.classList.remove('glow'));
        // Add glow to hovered scroll-item if any
        const hoveredItem = e.target.closest('.scroll-item');
        if (hoveredItem && container.contains(hoveredItem)) {
          hoveredItem.classList.add('glow');
        }
      });
      container.addEventListener('mouseleave', () => {
        // Remove all glow on mouse leave
        container.querySelectorAll('.scroll-item.glow').forEach(item => item.classList.remove('glow'));
      });
    });

    // Liquid highlight effect for nav buttons
(function() {
  const navCapsule = document.querySelector('.nav-capsule');
  const buttons = document.querySelectorAll('.nav-button');
  if (!navCapsule || buttons.length === 0) return;

  // Create highlight bar
  let highlight = document.createElement('div');
  highlight.className = 'nav-highlight';
  navCapsule.appendChild(highlight);

  // Helper to move highlight under a button
  function moveHighlight(btn) {
    if (!btn) {
      highlight.style.opacity = '0';
      return;
    }
    const rect = btn.getBoundingClientRect();
    const parentRect = navCapsule.getBoundingClientRect();
    highlight.style.width = rect.width + 'px';
    highlight.style.height = rect.height + 'px';
    highlight.style.left = (rect.left - parentRect.left) + 'px';
    highlight.style.top = (rect.top - parentRect.top) + 'px';
    highlight.style.opacity = '1';
    // Only round corners for first/last button
    if (btn === buttons[0]) {
      highlight.style.borderRadius = '20px 0 0 20px';
    } else if (btn === buttons[buttons.length - 1]) {
      highlight.style.borderRadius = '0 20px 20px 0';
    } else {
      highlight.style.borderRadius = '0';
    }
  }

  // On hover, move highlight
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => moveHighlight(btn));
    btn.addEventListener('focus', () => moveHighlight(btn));
  });

  // On mouse leave, move highlight to active or hide
  navCapsule.addEventListener('mouseleave', () => {
    const activeBtn = document.querySelector('.nav-button.active');
    if (activeBtn) moveHighlight(activeBtn);
    else highlight.style.opacity = '0';
  });

  // On click, move highlight to active
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      moveHighlight(btn);
    });
  });

  // On load, move highlight to active
  window.addEventListener('DOMContentLoaded', () => {
    const activeBtn = document.querySelector('.nav-button.active');
    if (activeBtn) moveHighlight(activeBtn);
    else highlight.style.opacity = '0';
  });
})();

// Cursor-follow highlight for nav bar
(function() {
  const navCapsule = document.querySelector('.nav-capsule');
  if (!navCapsule) return;

  let cursorHighlight = document.querySelector('.nav-cursor-highlight');
  if (!cursorHighlight) {
    cursorHighlight = document.createElement('div');
    cursorHighlight.className = 'nav-cursor-highlight';
    navCapsule.appendChild(cursorHighlight);
  }

  navCapsule.addEventListener('mousemove', (e) => {
    const rect = navCapsule.getBoundingClientRect();
    const x = e.clientX - rect.left;
    cursorHighlight.style.left = (x - cursorHighlight.offsetWidth / 2) + 'px';
    cursorHighlight.style.opacity = '1';
  });

  navCapsule.addEventListener('mouseleave', () => {
    cursorHighlight.style.opacity = '0';
  });
})();

// Add a heart in the center of the page
(function() {
  if (!document.querySelector('.center-heart')) {
    const heart = document.createElement('div');
    heart.className = 'center-heart';
    heart.innerHTML = '<div class="heart-shape"></div>';
    document.body.appendChild(heart);
  }
})();

// Add theme toggle buttons with icons
(function() {
  if (!document.querySelector('.theme-toggle-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-toggle-wrapper';
    wrapper.innerHTML = `
      <button class="theme-toggle-btn active" data-theme="dark" title="Dark mode">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 0112.79 3a1 1 0 00-1.13 1.32A7 7 0 1019.68 13.9a1 1 0 001.32-1.11z"/></svg>
      </button>
      <button class="theme-toggle-btn" data-theme="light" title="Light mode">
        <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M17.66 17.66l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M17.66 6.34l1.42-1.42"/></svg>
      </button>
    `;
    document.body.appendChild(wrapper);

    const darkBtn = wrapper.querySelector('[data-theme="dark"]');
    const lightBtn = wrapper.querySelector('[data-theme="light"]');
    const root = document.documentElement;

    function setTheme(theme) {
      if (theme === 'light') {
        root.style.setProperty('--bg-main', '#fff');
        root.style.setProperty('--bg-nav', '#f3f4f8');
        root.style.setProperty('--btn-bg', '#f3f4f8');
        root.style.setProperty('--btn-shadow', '#e0e0e0');
        root.style.setProperty('--btn-color', '#23272f');
        darkBtn.classList.remove('active');
        lightBtn.classList.add('active');
        document.body.style.background = '#fff';
      } else {
        root.style.setProperty('--bg-main', '#111');
        root.style.setProperty('--bg-nav', '#23272f');
        root.style.setProperty('--btn-bg', '#23272f');
        root.style.setProperty('--btn-shadow', '#181a20');
        root.style.setProperty('--btn-color', '#fff');
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
        document.body.style.background = '#111';
      }
    }

    darkBtn.addEventListener('click', () => setTheme('dark'));
    lightBtn.addEventListener('click', () => setTheme('light'));
  }
})();

(function() {
  const root = document.documentElement;
  const darkBtn = document.querySelector('.theme-toggle-btn[data-theme="dark"]');
  const lightBtn = document.querySelector('.theme-toggle-btn[data-theme="light"]');

  function setTheme(theme) {
    if (theme === 'light') {
      root.style.setProperty('--bg-main', '#fff');
      root.style.setProperty('--bg-nav', '#f3f4f8');
      root.style.setProperty('--btn-bg', '#f3f4f8');
      root.style.setProperty('--btn-shadow', '#e0e0e0');
      root.style.setProperty('--btn-color', '#23272f');
      darkBtn.classList.remove('active');
      lightBtn.classList.add('active');
      document.body.style.background = '#fff';
    } else {
      root.style.setProperty('--bg-main', '#111');
      root.style.setProperty('--bg-nav', '#23272f');
      root.style.setProperty('--btn-bg', '#23272f');
      root.style.setProperty('--btn-shadow', '#181a20');
      root.style.setProperty('--btn-color', '#fff');
      darkBtn.classList.add('active');
      lightBtn.classList.remove('active');
      document.body.style.background = '#111';
    }
  }

  if (darkBtn && lightBtn) {
    darkBtn.addEventListener('click', function() {
      setTheme('dark');
    });
    lightBtn.addEventListener('click', function() {
      setTheme('light');
    });
  }
})();

  function openModel(value) {
    if (value == "console") {
      window.open(
        "https://spikepromike.github.io//model-viewers/console.html",
      );
    } else if (value == "desk") {
      window.open(
        "https://spikepromike.github.io/model-viewers/desk.html",
      );
    } else if (value == "speaker") {
      window.open(
        "https://spikepromike.github.io/model-viewers/speaker.html",
      )
    } else if (value == "flyingcar") {
      window.open(
        "https://spikepromike.github.io/model-viewers/flyingcar.html",
      );
    } else if (value == "armchair") {
      window.open(
        "https://spikepromike.github.io/model-viewers/armchair.html",
      );
    } else if (value == "BusStation") {
      window.open(
        "https://spikepromike.github.io/model-viewers/busstation.html",
      );
    }
  }
// Fullscreen image viewer for last row's gallery images only
(function() {
  document.addEventListener('click', function(e) {
    const img = e.target.closest('.gallery-fullscreen');
    if (!img) return;

    let overlay = document.getElementById('fullscreen-img-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'fullscreen-img-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.background = 'rgba(0,0,0,0.92)';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = 9999;
      overlay.style.cursor = 'zoom-out';
      overlay.innerHTML = `
        <img id="fullscreen-img" style="max-width:90vw;max-height:80vh;border-radius:1rem;box-shadow:0 0 2rem #000;" />
        <div id="fullscreen-caption" style="color:#fff;font-size:1.2rem;margin-top:1rem;text-align:center;"></div>
        <button id="close-fullscreen-img" style="
          position:absolute;top:2rem;right:2rem;
          background:#fff;border:none;border-radius:50%;
          width:2.5rem;height:2.5rem;font-size:2rem;cursor:pointer;
          box-shadow:0 2px 8px #0008;z-index:10001;
        " title="Close">&times;</button>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', function(ev) {
        if (ev.target === overlay || ev.target.id === 'close-fullscreen-img') {
          overlay.style.display = 'none';
        }
      });
      document.addEventListener('keydown', function(ev) {
        if (ev.key === 'Escape' && overlay.style.display !== 'none') {
          overlay.style.display = 'none';
        }
      });
    }
    overlay.querySelector('#fullscreen-img').src = img.src;
    // Get caption from sibling .gallery-caption
    const caption = img.parentElement.querySelector('.gallery-caption');
    overlay.querySelector('#fullscreen-caption').textContent = caption ? caption.textContent : '';
    overlay.style.display = 'flex';
  });
})();