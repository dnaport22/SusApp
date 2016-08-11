angular.module('Login', [])

.controller('LoginController', function($scope, $stateParams, $location, $window, $ionicHistory, $ionicSideMenuDelegate, $state, $ionicLoading, $timeout, $localStorage, popAlert) {

  $scope.path = $stateParams.path;
  $scope.loginMessage = 'Log in in to ';
  $scope.EmailId = 'login_email';
  $scope.PassId = 'login_pass';
  $scope._email = '';
  $scope._pass = '';
  $scope._url = 'http://maddna.xyz/login.php';

  $scope.loginUser = function() {
    this._email = inputVal.getValue(this.EmailId);
    this._pass = inputVal.getValue(this.PassId);
    if (this._email == ''  || this._pass == '') {
      popAlert.showAlert('Alert', 'Please fill all the fields');
    }
    else {
      return $scope.validateEmail();
    }
  }

  $scope.validateEmail = function() {
    var validate = new Validation(this._email);
    if (validate.emailValidate() == 'formatError') {
      popAlert.showAlert('Alert', 'Plase enter valid lsbu email');
    }
    else if (validate.emailValidate() == 'invalid') {
      popAlert.showAlert('Alert', 'Invalid Password');
    }
    else {
      return $scope.submit();
    }
  }

  $scope.submit = function() {
    var dataString = 'email=' + this._email + '&pass=' + this._pass;
    var request = new Submitform('POST', this._url, dataString, false);
    return request.ajaxSubmit(this);
  }

  $scope.submitResponse = function(response) {
    if (response.status == 0) {
      popAlert.showAlert('Alert', 'Invalid account');
    }
    else if(response.status == 1) {
      if(response.user.status == 0) {
        popAlert.showAlert('Alert', 'Please activate your account');
      }
      else {
        $scope.userStorage(response.user);
      }
    }
  }

  $scope.userStorage = function(data) {
    $localStorage.user_login_id = 1;
    $localStorage.user_username = data.name;
    $localStorage.user_email = data.email;
    $localStorage.user_activation = data.activation;
    $localStorage.expiry = new Date().getTime();
    return $scope.reloadForm();
  }

  $scope.reloadForm = function() {
    inputVal.setValue($scope.EmailId, '');
    inputVal.setValue($scope.PassId, '');
    return $scope.redirectUser();
  }

  $scope.redirectUser = function() {

    $ionicLoading.show({
      content: 'Logging in',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    if ($scope.path == 'getitem') {
      $timeout(function () {
        $ionicLoading.hide();
        $ionicHistory.goBack();
      }, 1000);
    }
    else if ($scope.path == 'main') {

      $timeout(function () {
        $ionicLoading.hide();
        $state.go('app.main');
        $ionicSideMenuDelegate.toggleLeft();
      }, 1000);

    }
    else if ($scope.path == 'postitem') {

      $timeout(function () {
        $ionicLoading.hide();
        $ionicHistory.goBack();
      }, 1000);
    }
  }

  //Login intent message
  if ($scope.path == 'main') {
    $scope.loginMessage = 'Log in to get or post items';
  }
  else if($scope.path == 'postitem') {
    $scope.loginMessage = 'Log in to post items';
  }
  else if ($scope.path == 'getitem') {
    $scope.loginMessage = 'Log in to send message';
  }
});
