const CACHE_NAME = "tekken8-pwa-v3";
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/manifest.json",
    "/data/alisa.json",
    "/data/asuka.json",
    "/data/bryan.json",
    "/data/lili.json",
    "/data/king.json",
    "/data/paul.json",
    "/data/matchups.json",
    "/data/combos.json",
    "/icons/lili-192.png",
    "/icons/lili-512.png"
];

// Install Service Worker and Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching app resources");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch Requests from Cache First, then Network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Update Cache for New Versions
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    console.log("[Service Worker] Cache updated");
});
