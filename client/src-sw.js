const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

//registerRoute= Workbox tool= directs where request should go
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
//"If there is a request for 'style', 'script', or 'worker'...""
({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  //"...check if we have a version in the cache. If so, use it but also go get the latest from the network and update the cache for next time.
  //...If it's not in the cache, fetch it from the network. Keep up to 60 of these items in the cache, and remove them if they're older than 30 days."
  //Anology: Imagine if you asked your helper (service worker) to get a toy from your toy box(network request). 
    //But to save time, instead of getting the toy right away, your helper gives you an old toy that you played before (that's the "stale" part) 
    //while it goes to find the toy you asked for in the toy box (that's the "revalidate" part). So, you get to play with the old toy immediately, while your helper is fetching the new toy. That way, you don't have to wait.  
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      //This is a plugin that ensures only certain HTTP response statuses are cached(0, or 200)
        //HTTP status of 200 means the request was successful, 0 means the request was fulfilled by a service worker.
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      //"...keep up to 60 of these items in the cache, and remove them if they're older than 30 days."
        //This plugin limits the number of entries in the cache and how long they stay there
      new ExpirationPlugin({
        //maximum number of responses that can be stored in the cache. 
        maxEntries: 60,
        //cache storage time limit= 30days = conversions(30days*(24hrs/day)*(60min/hr)*(60secs/min))
        maxAgeSeconds: 30 * 24 * 60 * 60,
      })
    ],
  })
);