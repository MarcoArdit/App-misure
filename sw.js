/* Rilievo Misure: tiene l'app (e i lettori PDF già scaricati) per usarla anche senza internet.
   Cambia VERSION ogni volta che aggiorni index.html. */
var VERSION = 'v36';
var CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon.ico', 'favicon-32.png', 'favicon-48.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open('app-' + VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== 'app-' + VERSION && k !== 'libs'; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === location.origin) {
    /* l'app: prima la versione online (così gli aggiornamenti arrivano subito); senza internet uso la copia salvata */
    e.respondWith(caches.open('app-' + VERSION).then(function (c) {
      return fetch(req, { cache: 'no-cache' }).then(function (r) { if (r && r.ok) c.put(req, r.clone()); return r; })
        .catch(function () { return c.match(req, { ignoreSearch: true }); });
    }));
  } else {
    /* solo lettore PDF, librerie e font restano salvati; tutto il resto (es. i dati online) passa sempre dalla rete */
    if (!/(^|\.)(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname)) return;
    /* lettore PDF, librerie e font: li scarico una volta e poi restano */
    e.respondWith(caches.open('libs').then(function (c) {
      return c.match(req).then(function (hit) {
        return hit || fetch(req).then(function (r) { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; });
      });
    }));
  }
});
