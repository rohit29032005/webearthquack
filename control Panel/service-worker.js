// Install event - runs when the service worker is first installed
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    // Optionally, we can cache some assets here during the install phase.
    event.waitUntil(self.skipWaiting()); // Immediately activate the service worker
});

// Activate event - runs when the service worker is activated
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(self.clients.claim()); // Start controlling all pages
});

// Fetch event - intercepts all fetch requests
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    // Currently, it just passes through requests without caching
    event.respondWith(fetch(event.request));
});
