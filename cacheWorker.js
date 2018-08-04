const cache_name = 'restaurant_review_cahe'; 
let app_cache = null;

self.addEventListener('activate', function(event) {
});

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
            app_cache = cache;
            console.log('cache open');
            return cache.addAll([
                '/', 
                'img/',
                'css/responsive.css',
                'css/styles.css',
                'data/restaurants.json',
                'js/main.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(cache_name).then(function(cache) {
            return fetch(event.request.clone()).then(function(response) {        
                console.log("Caching " + event.request.url);
                cache.put(event.request, response.clone());
                return response;
            }).catch(function() {
                console.log("Connection error");
                return cache.match(event.request).then(function(cached_response) {
                    console.log("Offline, response found in cache: " + cached_response.url);
                    return cached_response;
                })
            })
        })
    );
});