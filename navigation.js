// Роутер по hash (#/home) — работает на GitHub Pages без настройки сервера.
const PAGES = ['home', 'games', 'fps', 'rate', 'hardware', 'history', 'settings'];
export function initNavigation(onChange) {
  const show = () => {
    const raw = (location.hash.replace(/^#\/?/, '').split('?')[0]) || 'home';
    const name = PAGES.includes(raw) ? raw : 'notfound';
    document.querySelectorAll('.page').forEach(p => p.hidden = p.dataset.page !== name);
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.toggle('active', a.dataset.route === name));
    document.body.classList.remove('menu-open');
    window.scrollTo(0, 0);
    onChange?.(name);
  };
  window.addEventListener('hashchange', show);
  show();
}
