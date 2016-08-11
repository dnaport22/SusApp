angular.module('Viewitem', [])

.controller('ViewitemController', function($scope, $stateParams, $location, $localStorage, MessageService) {
  $scope.item_name = $stateParams.itemName;
  $scope.item_description = $stateParams.itemDesc;
  $scope.item_date = $stateParams.itemDate;
  $scope.item_uid = $stateParams.itemUid;
  $scope.item_img = $stateParams.itemImg;
  $scope.email = $localStorage.user_email;
  $scope.username = $localStorage.user_username;

  $scope.messageCheck = function() {
    if ($localStorage.user_login_id == 1) {
      var itemRequest = MessageService;
      itemRequest.constructor($scope.item_uid, $scope.item_name, $scope.email, $scope.username)
      itemRequest.processInput();
    }
    else {
      $location.path("/app/login/getitem")
    }
  }

  $scope.defaultMessagevalue = "Hey, I am interested in your " + $scope.item_name;

  $scope.checkMaxLength = function() {
    var mesageName = document.getElementById("user_message");
    var mesageNameMaxLength = document.getElementById("user_message").maxLength;
    var mesageNameWarning = document.getElementById("user_message-warning");

    if (mesageName.value.length == mesageNameMaxLength) {
      mesageName.style.color = "red";
      mesageNameWarning.style.display = "block";
    } else {
      mesageName.style.color = "black";
      mesageNameWarning.style.display = "none";
    }
  }
});
