const CURRENT_VERSION = "4.1.121";
const CACHE_NAME = 'rr-cache-v' + CURRENT_VERSION;
let urlsToCache = [
  '/',
  './css/styles.css',
  'http://localhost:1337/restaurants',
  './index.html',
  './restaurant.html',
  './js/dbhelper.js',
  './js/index.js',
  './js/main.js',
  './js/restaurant_info.js'
];
for (let i = 1; i < 11; i++) {
  urlsToCache.push('/img/' + i + '_450_1x.webp');
  urlsToCache.push('/img/' + i + '_600_1x.webp');
  urlsToCache.push('/img/' + i + '_800_1x.webp');
  urlsToCache.push('/img/' + i + '_1200_2x.webp');
}

const log = console.log.bind(console);

self.addEventListener('install', function(event) {
  log('installing service worker')
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      log("cache opened", CACHE_NAME, urlsToCache)
      return cache.addAll(urlsToCache).catch(c=>console.error('couldnt add cache path', c))
    }).catch((error) => {
      log('error', CACHE_NAME, urlsToCache, error);
    })
  );
});
self.addEventListener('activate', function(event) {
  log('service worker activated')
  event.waitUntil(
    caches.keys()
      .then((keylist)=>{
          let p = keylist.map((k)=>{
            if(k != CACHE_NAME){
              log('serviceWorker deleting old cache ', k);
              return caches.delete(k);
            }
          })
      })
  );
});
self.addEventListener('fetch', (event) => {
  //let request = /restaurant.html\?.*?&?id=[a-zA-Z0-9]*&?.*?$/.test(event.request.url) ? '/restaurant.html': event.request;
  let request = event.request;
  event.respondWith(
    caches.match(request)
      .then(function(matchedResponse){
        if (matchedResponse) {
          return matchedResponse;
        } 
        return fetch(request).then(function(networkResponse){
          return caches.open(CACHE_NAME).then(cache=>{
            cache.put(request, networkResponse.clone());
            return networkResponse;
          })
        });
      }).catch(e=>{
        console.error("Error in fetch handler: ", e);
        throw e;
      })
  )
});
