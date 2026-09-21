const CACHE_NAME = 'chen-chu-ky-pdf-cache-v1'; // đổi "v1" -> "v2" khi cần bust cache

const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  // Phần mềm này không gọi thư viện ngoài qua CDN — không có gì thêm ở đây.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Chỉ xử lý GET tới tài nguyên tĩnh của app shell.
  // KHÔNG bắt hết mọi request — mọi request khác (nếu có) để trình duyệt xử lý
  // bình thường. localStorage/IndexedDB không đi qua fetch nên không bị ảnh hưởng.
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => res)
        .catch(() => {
          // Offline và không có trong cache -> fallback về index.html
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
