angular.module('Myitems', [])

.controller('MyitemsController', function($scope, $http, $timeout, $localStorage, $ionicActionSheet) {
  $scope.myitems = [];
  $scope.offset = 0;
  $scope.limit = 10;

  $scope.itemOptions = function(itemid, item) {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Delete'},
      ],
      buttonClicked: function(index) {
        if (index == 0) {
          var dataString = 'code='+$localStorage.user_activation+'&name='+itemid;
          console.log(dataString)
          $.ajax({
            type: 'POST',
            url: 'http://maddna.xyz/dismiss.php',
            data: dataString,
            success:function(response) {
              hideSheet();
              var index = $scope.myitems.indexOf(item);
              $scope.myitems.splice(index, 1);

            },
            error: function(error) {
              console.log(error)
            }
          })
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 9000);
  };



  $scope.loadMore = function() {

    $http({
      url: 'http://maddna.xyz/myitems.php',
      method: 'GET',
      params: {
        code: $localStorage.user_activation,
        offset: $scope.offset,
        limit: $scope.limit
      }}).success(function(response) {
        console.log(response)
        $scope.myitems = $scope.myitems.concat(response.items)
        $scope.retrieved = response.items.length
        $scope.offset += $scope.retrieved
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.check = function() {
    return $scope.retrieved > 0
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });


 });
