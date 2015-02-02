# ng-cordova-oauth-gatekeeper.js
GitHub OAuth using Apache Cordova and the InAppBrowser plugin

GitHub's OAuth Web Application Flow is not safe enough in client side. So, there is a simple aagent [gatekeeper](https://github.com/prose/gatekeeper), it will protect your client secret more secure.

This simple script is inspired by the [ng-cordova-oauth](https://github.com/nraboy/ng-cordova-oauth), but it's just for GitHub, and just can be used with gatekeeper. So I created this rather than sending a PR to ng-cordova-oauth.

## Install

```sh
$ bower install ng-cordova-gatekeeper --save
```

## Prepare

* Apache Cordova 3.5+
* [Apache Cordova InAppBrowser Plugin](http://cordova.apache.org/docs/en/3.0.0/cordova_inappbrowser_inappbrowser.md.html)
* [A gatekeeper server](https://github.com/prose/gatekeeper)

## Usage

```js
angular.module('myApp', ['ngCordovaGatekeeper'])
  .controller('loginCtrl', function() {
    $scope.doLogin = function() {
      $cordovaGatekeeper.auth(client_id, scope, gatekeeperServer).then(function(result) {
        console.log(result)
      }, function(error) {
        console.log(error);
      })
    };
  })
```

#### Params

* `client_id`: your github OAuth client id
* `scope`: github OAuth scope array
* `gatekeeperServer`: your gatekeeper server addr. should be like `http://ip:9999/authenticate/`

and

```html
<form ng-submit="doLogin()">
  <button class="button button-positive" type="submit">
    Auth
  </button>
</form>
```

## License

MIT @ Leigh Zhu
