/* =====================================================
   خدماتي المنيا — service-worker.js v1.0
   استراتيجية: Cache-First للأصول، Network-First للبيانات
   ===================================================== */

const CACHE_VER  = 'khedmaty-v2';
const DATA_CACHE = 'khedmaty-data-v1';

// الأصول الأساسية — تُحمَّل مع التثبيت
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/effects.css',
  '/js/effects.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;700;800&display=swap'
];

// ── التثبيت: تخزين الأصول الأساسية
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VER).then(c => c.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

// ── التفعيل: حذف الكاشات القديمة
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VER && k !== DATA_CACHE).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── الطلبات: Cache-First للأصول | Network-First للـ API
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // تجاهل طلبات غير HTTP
  if (!url.protocol.startsWith('http')) return;

  // بيانات JSON (vendors, offers ...) → Network-First
  if (url.pathname.includes('/data/') || url.pathname.endsWith('.json')) {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(DATA_CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // كل شيء آخر → Cache-First
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        // فقط الموارد الناجحة تُخزَّن
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE_VER).then(c => c.put(request, clone));
        return res;
      }).catch(() => {
        // صفحة Offline احتياطية
        if (request.destination === 'document') return caches.match('/index.html');
      });
    })
  );
});

// ── Background Sync (طلبات عاجلة أثناء انقطاع الشبكة)
self.addEventListener('sync', e => {
  if (e.tag === 'emergency-request') {
    e.waitUntil(syncEmergency());
  }
});

async function syncEmergency() {
  try {
    const db = await openDB();
    const requests = await getAll(db, 'pendingRequests');
    for (const req of requests) {
      await fetch('/api/emergency', { method: 'POST', body: JSON.stringify(req), headers: { 'Content-Type': 'application/json' } });
    }
  } catch (_) {}
}

// ── Push Notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'خدماتي المنيا', body: 'لديك إشعار جديد' };
  e.waitUntil(
    self.registration.showNotification(data.title || 'خدماتي المنيا', {
      body: data.body || '',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-96.png',
      dir: 'rtl',
      lang: 'ar',
      vibrate: [100, 50, 100],
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});
