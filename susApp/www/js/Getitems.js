angular.module('Getitems', [])

.controller('MainpageCtrl', function($scope, $http, $location, $ionicLoading, $timeout, $state, $localStorage) {

  $scope.$on('$ionicView.beforeEnter', function() {
    console.log('loading')
    $scope.loadMore();
  });

  $ionicLoading.show({
    content: 'Logging in',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  $scope.$storage = $localStorage.$default({
    user_login_id: 0,
    user_username: null,
    user_activation: null,
    user_email: null,
    expiry: 0
  });

  $scope.items = [];
  var offset = 0;
  var limit = 10;


  $scope.loadMore = function() {
    $http({
      url: 'http://maddna.xyz/getitems.php',
      method: 'GET',
      cache: true,
      params: {
        offset: offset,
        limit: limit,
        filter: document.getElementById('search').value
      }}).success(function(response) {
        $scope.items = $scope.items.concat(response.items)
        $scope.retrieved = response.items.length
        offset += $scope.retrieved
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
    }).error(function(error) {
      $scope.loadMore();
    });
  };

  $scope.search = function(filter) {
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.pullToRefresh = function() {
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.check = function() {
    return $scope.retrieved > 0
  }


  $scope.trafficLight = function(route, item_name, item_desc, item_date, item_uid, item_img) {
    if (route == 'getitem') {
      $location.path("/app/getitem/" + item_name + "/" + item_desc + "/" + item_date + "/" + item_uid + "/" + item_img )
    }
  }

  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.expiryCheck = function() {
    var two_weeks = 336;
    var now = new Date().getTime();
    if(now - $localStorage.expiry > two_weeks*60*60*1000) {
      $localStorage.expiry = 0;
      $localStorage.user_login_id = 0;
      $localStorage.user_email = null;
      $localStorage.user_username = null;
      $localStorage.user_activation = null;
    }
  }

  $scope.expiryCheck()

 });
