/* Keep in-page navigation out of the URL, while honoring incoming deep links. */
(() => {
  const clearFragment = () => {
    if (!location.hash) return;
    try { history.replaceState(history.state, '', location.pathname + location.search); } catch (_) {}
  };
  if (performance.getEntriesByType('navigation')[0]?.type === 'reload') clearFragment();
  document.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('data-demo') || link.hasAttribute('download') || link.target === '_blank') return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (_) { return; }
    if (!target) return;
    clearFragment();
    // Existing modal/menu handlers may already perform the scroll.
    if (event.defaultPrevented) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();
