/* =====================================================
   خدماتي المنيا — service-worker.js v2.0
   Cache-First للأصول | Network-First للـ JSON | SWR للـ HTML
   ===================================================== */

const CACHE_VER  = 'khedmaty-v2';
const DATA_CACHE = 'khedmaty-data-v2';
const IMG_CACHE  = 'khedmaty-img-v2';

const STATIC_ASSETS = [
  '/','index.html','search.html','vendor.html','emergency.html',
  'profile.html','map.html','offers.html','notifications.html',
  'favorites.html','bourse.html','vendor-register.html','sitemap.html',
  'category.html','css/style.css','manifest.json',
];

const DATA_ASSETS = [
  'data/vendors.page1.json','data/vendors.page2.json','data/vendors-lite.json',
];

/* ── INSTALL ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VER).then(c =>
      Promise.allSettled(STATIC_ASSETS.map(u => c.add(u).catch(()=>{})))
    ).then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VER && k !== DATA_CACHE && k !== IMG_CACHE).map(k => caches.delete(k)))
    ).then(() =>
      caches.open(DATA_CACHE).then(c =>
        Promise.allSettled(DATA_ASSETS.map(u => fetch(u).then(r => r.ok ? c.put(u,r) : null).catch(()=>{})))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH ── */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!url.protocol.startsWith('http')) return;

  // JSON data → Network-First
  if (url.pathname.includes('/data/') || url.pathname.endsWith('.json')) {
    e.respondWith(
      fetch(req).then(r => {
        if (r.ok) caches.open(DATA_CACHE).then(c => c.put(req, r.clone()));
        return r;
      }).catch(() => caches.match(req).then(c => c || new Response('{"vendors":[]}',{headers:{'Content-Type':'application/json'}})))
    );
    return;
  }

  // Fonts → Cache-First (طويل)
  if (url.hostname.includes('fonts.g')) {
    e.respondWith(caches.match(req).then(c => {
      if (c) return c;
      return fetch(req).then(r => { caches.open(CACHE_VER).then(x => x.put(req,r.clone())); return r; });
    }));
    return;
  }

  // HTML → Stale-While-Revalidate
  if (req.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/') {
    const net = fetch(req).then(r => { if(r.ok) caches.open(CACHE_VER).then(c=>c.put(req,r.clone())); return r; }).catch(()=>null);
    e.respondWith(caches.match(req).then(c => { net; return c || net || caches.match('/index.html'); }));
    return;
  }

  // CSS/JS → Cache-First + bg update
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    e.respondWith(caches.match(req).then(c => {
      fetch(req).then(r => { if(r&&r.ok) caches.open(CACHE_VER).then(x=>x.put(req,r.clone())); }).catch(()=>{});
      return c || fetch(req);
    }));
    return;
  }

  // Images → Cache-First
  if (req.destination === 'image') {
    e.respondWith(caches.match(req).then(c => c || fetch(req).then(r => {
      if(r&&r.status===200) caches.open(IMG_CACHE).then(x=>x.put(req,r.clone()));
      return r;
    }).catch(()=>new Response('',{status:503}))));
    return;
  }

  // Default → Network with cache fallback
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});

/* ── Background Sync ── */
self.addEventListener('sync', e => {
  if (e.tag === 'emergency-request') e.waitUntil(
    fetch('/api/emergency', {method:'POST',headers:{'Content-Type':'application/json'},body:localStorage?.getItem('kh_pending_emergency')||'{}'}).catch(()=>{})
  );
});

/* ── Push Notifications ── */
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(d.title||'خدماتي المنيا', {
    body: d.body||'لديك إشعار جديد', icon:'/icons/icon-192.png',
    badge:'/icons/icon-96.png', dir:'rtl', lang:'ar',
    vibrate:[100,50,100], tag:d.tag||'kh',
    data:{url:d.url||'/notifications.html'},
    actions:[{action:'open',title:'عرض'},{action:'dismiss',title:'تجاهل'}]
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  const url = e.notification.data?.url || '/';
  e.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(wins => {
      const w = wins.find(x => x.focused || x.url.includes(self.location.origin));
      return w ? w.focus().then(()=>w.navigate(url)) : clients.openWindow(url);
    })
  );
});

/* ── Message (تحديث يدوي) ── */
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data?.type === 'CACHE_URLS') {
    caches.open(CACHE_VER).then(c =>
      Promise.allSettled((e.data.urls||[]).map(u => fetch(u).then(r=>r.ok?c.put(u,r):null).catch(()=>{})))
    );
  }
});
