const CURRENT_VERSION = "4.0.10";
const CACHE_NAME = 'rr-cache-v' + CURRENT_VERSION;
let urlsToCache = [
  '/',
  '/css/styles.css',
  '/restaurantdata',
  '/index.html',
  '/restaurant.html',
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
      return cache.addAll(urlsToCache)
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
  let url = /restaurant.html\?.*?&?id=[a-zA-Z0-9]*&?.*?$/.test(event.request.url) ? '/restaurant.html': event.request;
  event.respondWith(
    caches.match(url)
    .then((response) => {
      if (response) {
        log('Cache hit: ' + url);
        return response;
      } else {
        log('Cache miss: ' + url);
        return fetch(event.request);
      }
    })
  )
});
