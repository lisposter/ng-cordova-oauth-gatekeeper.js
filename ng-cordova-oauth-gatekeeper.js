(function() {

  angular.module('ngCordovaGatekeeper', []).factory('$cordovaGatekeeper', ['$q', '$http',
    function($q, $http) {

      return {
        auth: function(clientId, appScope, gatekeeperUri) {
          var deferred = $q.defer();
          if (window.cordova) {
            var cordovaMetadata = cordova.require('cordova/plugin_list').metadata;
            if (cordovaMetadata.hasOwnProperty('org.apache.cordova.inappbrowser') === true) {
              var iab = window.open('https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(','), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
              iab.addEventListener('loadstart', function(event) {
                if ((event.url).indexOf('http://localhost/callback') === 0) {
                  tempCode = (event.url).split('code=')[1];
                  $http.get(gatekeeperUri + tempCode, {
                    headers: {
                      accept: 'application/json'
                    }
                  })
                    .success(function(data) {
                      deferred.resolve(data);
                    })
                    .error(function(data, status) {
                      deferred.reject('error occured');
                    })
                    .
                  finally(function() {
                    setTimeout(function() {
                      iab.close();
                    }, 10);
                  });
                }
              });
              iab.addEventListener('exit', function(event) {
                deferred.reject('Exit');
              });
            } else {
              deferred.reject('Cannot find InAppBrowser plugin');
            }
          } else {
            deferred.reject('Cannot running without Cordova');
          }
          return deferred.promise;
        }
      }
    }

  ]);

})();
