// Локальное хранилище: настройки и история (всё остаётся в браузере).
const P = 'pcc:';
export function get(key, fallback = null) {
  try { const v = localStorage.getItem(P + key); return v === null ? fallback : JSON.parse(v); }
  catch { return fallback; }
}
export function set(key, value) {
  try { localStorage.setItem(P + key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function addHistory(entry) {
  const list = get('history', []);
  list.unshift({ ...entry, date: new Date().toISOString() });
  set('history', list.slice(0, 50));
}
export const getHistory = () => get('history', []);
export const clearHistory = () => set('history', []);
export function clearAll() {
  try { Object.keys(localStorage).filter(k => k.startsWith(P)).forEach(k => localStorage.removeItem(k)); } catch {}
}
