self.addEventListener('install', function(cacheevent) {
  var indexPage = new Request('index.html');
  cacheevent.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        return cache.put(indexPage, response);
      });
  }));
});
self.addEventListener('fetch', function(cacheevent) {

  cacheevent.respondWith(
    fetch(cacheevent.request).catch(function(error) {
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(cacheevent.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})