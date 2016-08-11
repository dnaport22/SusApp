
angular.module('susapp',
[
  'ionic',
  'Getitems',
  'Viewitem',
  'Myitems',
  'DrawerLinks',
  'Postitem',
  'Services',
  'ngCordova',
  'ResetPass',
  'Login',
  'Submitform',
  'ngStorage',
  'Register',
  'Message',
  'Useraccount',
  'angular-cache',
  'MainpageServices',
  'test'
])



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.scrolling.jsScrolling(false);

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'DrawerController'
  })

    .state('app.menu', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'DrawerController'
  })

  .state('app.main', {
    cache: false,
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'MainpageCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login/:path',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
      }
    }
  })

  .state('app.getitem', {
    url: '/getitem/:itemName/:itemDesc/:itemDate/:itemUid/:itemImg',
    views: {
      'menuContent': {
        templateUrl: 'templates/getitem.html',
        controller: 'ViewitemController'
      }
    }
  })

  .state('app.resetpassword', {
    url: '/resetpassword/:key',
    views: {
      'menuContent': {
        templateUrl: 'templates/resetpassword.html',
        controller: 'ResetPassController'
      }
    }
  })

  .state('app.requestreset', {
    url: '/requestreset',
    views: {
      'menuContent': {
        templateUrl: 'templates/requestreset.html'
      }
    }
  })

  .state('app.myitems', {
    url: '/myitems',
    views: {
      'menuContent': {
        templateUrl: 'templates/myitems.html',
        controller: 'MyitemsController'
      }
    }
  })

  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutus.html'
      }
    }
  })

  .state('app.terms', {
    url: '/terms',
    views: {
      'menuContent': {
        templateUrl: 'templates/terms.html'
      }
    }
  })

  .state('app.test', {
    url: '/test',
    views: {
      'menuContent': {
        templateUrl: 'templates/test.html',
        controller: 'testCtrl'
      }
    }
  })

  .state('app.useraccount', {
    url: '/activation/:uniqueId',
    views: {
      'menuContent': {
        templateUrl: 'templates/activateaccount.html',
        controller: 'UseraccountController'
      }
    }
  })

  .state('app.postitem', {
    url: '/postitem',
    views: {
      'menuContent': {
        templateUrl: 'templates/postitem.html',
        controller: 'PostitemController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
