const KASA = 'dbf-v3';
const CEKIRDEK = ['./','index.html','en.html','style.css','app.js','logo-lacivert.png','logo-beyaz.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(KASA).then(c => c.addAll(CEKIRDEK)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== KASA).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const kopya = r.clone();
      caches.open(KASA).then(c => c.put(e.request, kopya)).catch(()=>{});
      return r;
    }).catch(() => caches.match(e.request))
  );
});
