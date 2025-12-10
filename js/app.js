// js/app.js — simplified UI script
(() => {
  const lettersGrid = document.getElementById('lettersGrid');
  const yearEl = document.getElementById('year');

  // Populate footer year if exists
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Create letters A-Z
  const alphabet = Array.from({length:26}, (_,i) => String.fromCharCode(65 + i));

  function createCard(letter) {
    const wrap = document.createElement('div');
    wrap.className = 'letter-card';
    wrap.setAttribute('role','button');
    wrap.setAttribute('tabindex','0');
    wrap.setAttribute('aria-label', `Letter ${letter}`);

    const span = document.createElement('div');
    span.className = 'letter';
    span.textContent = letter;

    wrap.appendChild(span);

    // small interaction: click makes a quick scale animation
    wrap.addEventListener('click', () => {
      animatePop(span);
      // Optional: play audio if you add audio files later
    });

    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        wrap.click();
      }
    });

    return wrap;
  }

  function animatePop(el) {
    el.animate([
      { transform: 'scale(1)', offset: 0 },
      { transform: 'scale(1.12)', offset: 0.5 },
      { transform: 'scale(1)', offset: 1 }
    ], {
      duration: 260,
      easing: 'cubic-bezier(.2,.9,.3,1)'
    });
  }

  function renderLetters(list) {
    lettersGrid.innerHTML = '';
    const frag = document.createDocumentFragment();
    list.forEach(letter => frag.appendChild(createCard(letter)));
    lettersGrid.appendChild(frag);
  }

  // Shuffle helper
  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Initial render
  renderLetters(alphabet);

  // Shuffle button
  const shuffleBtn = document.getElementById('shuffle');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      const s = shuffleArray([...alphabet]);
      renderLetters(s);
      shuffleBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 240 });
    });
  }

  // Optional: start-up focus
  if (lettersGrid.firstChild) lettersGrid.firstChild.focus();
})();