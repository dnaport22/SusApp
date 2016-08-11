angular.module('MainpageServices', [])

.config(function (CacheFactoryProvider) {
  angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
})

.service('GetitemService', function(CacheFactory, $http) {
  if (!CacheFactory.get('itemsCache')) {
    CacheFactory.createCache('itemsCache', {
      deleteOnExpire: 'aggressive',
      recycleFreq: 60000
    });
  }


  var itemsCache = CacheFactory.get('itemsCache');

  return {
    getitems: function() {
      $http.get('http://maddna.xyz/getitems.php')
        .then(function(response) {
          console.log(response)
        })
    }
  }
})
