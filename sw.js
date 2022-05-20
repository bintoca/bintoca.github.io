self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        self.caches.open('cache1')
            .then(function (cache) {
                return cache.addAll(['/', '/favicon.ico']);
            })
    );
});
self.addEventListener('activate', event => {
});

self.addEventListener('fetch', function (event) {
    event.respondWith(fetch(event.request).then(x => {
        const u = new URL(event.request.url)
        if (u.origin.includes('bintoca.com') || u.origin.includes('localhost')) {
            event.waitUntil(self.caches.open('cache1').then(cache => cache.put(event.request, x)))
        }
        return x.clone()
    }).catch(x => caches.match(event.request)))
});