/* HQ service worker — offline-first shell */
const CACHE = 'hq-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
/* stale-while-revalidate: instant load from cache, refresh in background.
   Never intercept the Anthropic API (coach) or non-GET. */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.hostname === 'api.anthropic.com') return;
  if (url.pathname.startsWith('/api/')) return;            // never cache sync/auth
  if (e.request.mode === 'navigate') {                     // network-first for pages (auth gate stays honest)
    e.respondWith(fetch(e.request).then(res => {
      caches.open(CACHE).then(c => c.put('./', res.clone())).catch(()=>{});
      return res;
    }).catch(() => caches.match('./')));
    return;
  }
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: url.origin === location.origin });
      const network = fetch(e.request).then(res => {
        if (res && res.status === 200 && (url.origin === location.origin || url.hostname.includes('fonts.'))) {
          cache.put(e.request, res.clone());
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
