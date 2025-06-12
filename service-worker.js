const CACHE_NAME = "family-journals-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/book.css",
  "/styles.css",
  "/savestate.js",
  "/swipe-navigation.js",
  "/images/charles.png",
  "/images/may-large.png",
  "/charlie/cfj-auto-home.html",
  "/charlie/auto-chapters/auto-ch-1.html",
  "/charlie/auto-chapters/auto-ch-2.html",
  "/charlie/auto-chapters/auto-ch-3.html",
  "/charlie/auto-chapters/auto-ch-4.html",
  "/charlie/auto-chapters/auto-ch-5.html",
  "/charlie/auto-chapters/auto-ch-6.html",
  "/charlie/auto-chapters/auto-ch-7.html",
  "/charlie/auto-chapters/auto-ch-8.html",
  "/charlie/auto-chapters/auto-ch-9.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
