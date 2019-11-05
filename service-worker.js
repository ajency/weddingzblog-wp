importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// workbox.setConfig({
//   debug: true
// });

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// cache apis
workbox.routing.registerRoute(
  new RegExp('https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1/misc/*'),
  new workbox.strategies.CacheFirst({
    cacheName: 'ggb-apis',
    plugins: [
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24,
            maxEntries: 50,
            purgeOnQuotaError: true
        })
    ]
  })
);


//cache js and css - production
workbox.routing.registerRoute(
    new RegExp('https://order.greengrainbowl.com/*'),
    workbox.strategies.cacheFirst({
        cacheName: 'ggb-prod',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
                maxEntries: 50, 
                purgeOnQuotaError: true
            })
        ]
    })
);


//cache js and css - staging
workbox.routing.registerRoute(
    new RegExp('http://order-staging.greengrainbowl.com/*'),
    workbox.strategies.cacheFirst({
        cacheName: 'ggb-stage',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
                maxEntries: 50, 
                purgeOnQuotaError: true
            })
        ]
    })
);

//cache js and css - local
workbox.routing.registerRoute(
    new RegExp('/greengrainbowl/app/build/*'),
    workbox.strategies.cacheFirst({
        cacheName: 'ggb-local',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
                maxEntries: 50, 
                purgeOnQuotaError: true
            })
        ]
    })
);

workbox.precaching.precacheAndRoute([]);