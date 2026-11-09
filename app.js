import { initNavigation } from './js/navigation.js';
import * as store from './js/storage.js';

const $ = id => document.getElementById(id);
const body = document.body;

function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  $('themeToggle').checked = dark;
}
function applyCollapse(on) {
  body.classList.toggle('collapsed', on);
  $('collapseToggle').checked = on;
}
function renderList(el, items, emptyText) {
  el.replaceChildren();
  if (!items.length) { const d = document.createElement('div'); d.className = 'empty'; d.textContent = emptyText; el.append(d); return; }
  items.slice(0, el.id === 'recentChecks' ? 5 : 50).forEach(h => {
    const d = document.createElement('div'); d.className = 'card';
    d.textContent = `${h.title || 'Проверка'} — ${new Date(h.date).toLocaleString('ru-RU')}`;
    el.append(d);
  });
}
function renderHistory() {
  const h = store.getHistory();
  renderList($('recentChecks'), h, 'Проверок пока нет. Они будут сохраняться только в вашем браузере.');
  renderList($('historyList'), h, 'История пуста.');
}

applyTheme(store.get('dark', true));
applyCollapse(store.get('collapsed', false));

$('themeBtn').onclick = () => { const d = document.documentElement.dataset.theme !== 'dark'; store.set('dark', d); applyTheme(d); };
$('themeToggle').onchange = e => { store.set('dark', e.target.checked); applyTheme(e.target.checked); };
$('collapseBtn').onclick = () => { const c = !body.classList.contains('collapsed'); store.set('collapsed', c); applyCollapse(c); };
$('collapseToggle').onchange = e => { store.set('collapsed', e.target.checked); applyCollapse(e.target.checked); };
$('menuBtn').onclick = () => body.classList.toggle('menu-open');
$('overlay').onclick = () => body.classList.remove('menu-open');
$('clearHistory').onclick = () => { store.clearHistory(); renderHistory(); };
$('clearAll').onclick = () => { if (confirm('Удалить все локальные данные PC CHECKER?')) { store.clearAll(); applyTheme(true); applyCollapse(false); renderHistory(); } };
$('searchForm').onsubmit = e => {
  e.preventDefault();
  const q = $('searchInput').value.trim();
  if (q.length < 2) return;
  store.set('query', q);          // страница игр (часть 3) прочитает запрос
  location.hash = '#/games';
};

renderHistory();
initNavigation();
