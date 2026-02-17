// Habit Magic — Service Worker
// Version is updated by build.sh on each deploy
var CACHE_VERSION = 'habit-magic-20260216203546';

// Core files to pre-cache on install
var CORE_ASSETS = [
    '/',
    '/index.html',
    '/app.min.js',
    '/styles.min.css',
    '/firebase-config.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Audio files — cached on first use (lazy cache) to avoid 22MB upfront download
var AUDIO_FILES = [
    '/audio/achievement-bell.mp3',
    '/audio/applause-1.mp3',
    '/audio/applause-2.mp3',
    '/audio/bonus-collect.mp3',
    '/audio/brain-like-a-pinball.mp3',
    '/audio/cheer.mp3',
    '/audio/coffee-shop.m4a',
    '/audio/dance-break.mp3',
    '/audio/kids-laughing.mp3',
    '/audio/ocean-waves.m4a',
    '/audio/payout.mp3',
    '/audio/quick-win.mp3',
    '/audio/success-1.mp3',
    '/audio/unlock.mp3',
    '/audio/winning-chimes.mp3'
];

// Install: cache core assets
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function(cache) {
            console.log('[SW] Pre-caching core assets');
            return cache.addAll(CORE_ASSETS);
        }).then(function() {
            return self.skipWaiting();
        })
    );
});

// Activate: clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(name) {
                    return name !== CACHE_VERSION;
                }).map(function(name) {
                    console.log('[SW] Deleting old cache:', name);
                    return caches.delete(name);
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// Fetch: smart caching strategy
self.addEventListener('fetch', function(event) {
    var url = new URL(event.request.url);

    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Firebase/Firestore API calls — let them through (Firestore handles its own offline)
    if (url.hostname.includes('firestore.googleapis.com') ||
        url.hostname.includes('identitytoolkit.googleapis.com') ||
        url.hostname.includes('securetoken.googleapis.com')) {
        return;
    }

    // Firebase SDK scripts — network-first (CDN, want latest)
    if (url.hostname === 'www.gstatic.com') {
        event.respondWith(
            fetch(event.request).then(function(response) {
                var clone = response.clone();
                caches.open(CACHE_VERSION).then(function(cache) {
                    cache.put(event.request, clone);
                });
                return response;
            }).catch(function() {
                return caches.match(event.request);
            })
        );
        return;
    }

    // Audio files — cache-first, lazy cache on first play
    if (url.pathname.startsWith('/audio/')) {
        event.respondWith(
            caches.match(event.request).then(function(cached) {
                if (cached) return cached;
                return fetch(event.request).then(function(response) {
                    var clone = response.clone();
                    caches.open(CACHE_VERSION).then(function(cache) {
                        cache.put(event.request, clone);
                    });
                    return response;
                });
            })
        );
        return;
    }

    // HTML pages — network-first (ensures users get updates quickly)
    if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(event.request).then(function(response) {
                var clone = response.clone();
                caches.open(CACHE_VERSION).then(function(cache) {
                    cache.put(event.request, clone);
                });
                return response;
            }).catch(function() {
                return caches.match(event.request) || caches.match('/index.html');
            })
        );
        return;
    }

    // JS/CSS/assets — stale-while-revalidate (serve cache instantly, update in background)
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            var fetchPromise = fetch(event.request).then(function(response) {
                if (response.status === 200) {
                    var clone = response.clone();
                    caches.open(CACHE_VERSION).then(function(cache) {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            });
            return cached || fetchPromise;
        })
    );
});
