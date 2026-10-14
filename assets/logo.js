/* Bravura outlines: see Bravura-LICENSE.txt. No dependencies or live path sampling. */
(() => {
  'use strict';
  const data = window.VMLogoData;
  if (!data) return; // Inline SVG remains a complete static logo.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-music-logo]').forEach(host => {
    const path = host.querySelector('path');
    const intro = host.hasAttribute('data-logo-intro');
    let index = 0, timer = 0, frame = 0, visible = true, paused = false, first = true;
    const label = document.querySelector('[data-logo-label]');
    const buttons = [...document.querySelectorAll('[data-logo-symbol]')];
    function settle() {
      path.setAttribute('d', data.symbols[index].d);
      host.dataset.symbol = data.symbols[index].name;
      if (label) label.textContent = data.symbols[index].name;
      buttons.forEach((b,i) => b.setAttribute('aria-pressed', String(i === index)));
    }
    function stop() { clearTimeout(timer); cancelAnimationFrame(frame); settle(); }
    function canRun() { return host.isConnected && visible && !document.hidden && !reduce.matches && !paused; }
    function schedule() {
      stop();
      if (canRun()) timer = setTimeout(morph, intro ? (first ? 80 : 220) : 1450);
    }
    function morph() {
      first = false;
      const pair = data.pairs[index];
      let start, last = -Infinity;
      function draw(now) {
        if (!canRun()) { stop(); return; }
        if (start === undefined) start = now;
        const t = Math.min((now-start)/(intro ? 420 : 460), 1);
        if (t === 1) { index = (index+1)%data.symbols.length; schedule(); return; }
        if (now-last >= 1000/30) {
          last = now;
          const u = t*t*t*(t*(t*6-15)+10);
          let d = '';
          for (const [a,b] of pair) {
            for (let k=0;k<a.length;k++) {
              d += (k ? 'L' : 'M') + (a[k][0]+(b[k][0]-a[k][0])*u).toFixed(2) + ' ' + (a[k][1]+(b[k][1]-a[k][1])*u).toFixed(2);
            }
            d += 'Z';
          }
          path.setAttribute('d',d);
        }
        frame = requestAnimationFrame(draw);
      }
      frame = requestAnimationFrame(draw);
    }
    buttons.forEach((b,i) => b.addEventListener('click', () => { index=i; schedule(); }));
    const toggle = document.querySelector('[data-logo-pause]');
    if (toggle) toggle.addEventListener('click', () => {
      paused = !paused;
      toggle.textContent = paused ? 'Riprendi ↗' : 'Pausa Ⅱ';
      toggle.setAttribute('aria-pressed', String(paused));
      schedule();
    });
    reduce.addEventListener('change', schedule);
    document.addEventListener('visibilitychange', schedule);
    window.addEventListener('pagehide', stop);
    window.addEventListener('pageshow', schedule);
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      visible=entries[0].isIntersecting; schedule();
    }).observe(host);
    settle(); schedule();
  });
})();
