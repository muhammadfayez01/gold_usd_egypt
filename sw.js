// Bump VERSION on every release. A changed sw.js makes the browser install the new worker.
const VERSION = '2026-11-28.3';
const CACHE = 'gold-usd-' + VERSION;
const SHELL = ['./', './index.html', './lwc.js', './manifest.json', './apple-touch-icon.png', './icon-v2-192.png', './icon-v2-512.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(SHELL.map(u => fetch(u, { cache: 'reload' }).then(r => r.ok ? c.put(u, r) : null).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('gold-usd') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Live price APIs and every other origin: straight to the network, never cached here.
  if (url.origin !== location.origin) return;
  // Our own files: network first (bypassing the HTTP cache), cache only as an offline fallback.
  e.respondWith(
    fetch(url.href, { cache: 'no-store' })
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
