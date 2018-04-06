const CURRENT_VERSION = 4;
const CACHE_NAME = 'rr-cache-v' + CURRENT_VERSION;
let urlsToCache = [
  '/',
  '/css/styles.css',
  '/data/restaurants.json',
  // '/index.html',
  // '/restaurant.html',
  '/js/dbhelper.js',
  '/js/index.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];
for (let i = 1; i < 11; i++) {
  urlsToCache.push('/img/' + i + '_450_1x.jpg');
  urlsToCache.push('/img/' + i + '_600_1x.jpg');
  urlsToCache.push('/img/' + i + '_800_1x.jpg');
  urlsToCache.push('/img/' + i + '_1200_2x.jpg');
}

const log = console.log.bind(console);

self.addEventListener('install', function(event) {
  log('installing service worker')
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      log("cache opened", CACHE_NAME)
      cache.addAll(urlsToCache)
    }).catch((error) => {
      log('error', error);
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
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if (response) {
        log('fulfilling ' + event.request.url + " from cache.");
        return response;
      } else {
        log(event.request.url + ' not found in cache, fetching from network.');
        return fetch(event.request);
      }
    })
  )
});
