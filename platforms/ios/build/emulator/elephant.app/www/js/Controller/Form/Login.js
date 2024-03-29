elephant.controller('LoginController', function($scope, $state, $ionicSideMenuDelegate, $ionicHistory, $stateParams, $localStorage, elephantData_AUTH, elephantData_URL, UserFactory, UIfactory, LoginNotifications) {
  UIfactory.hideSpinner();
  $scope.loginMessage = null;

  var path = $stateParams.path;
  var EmailId = elephantData_AUTH.LOGIN_EMAIL;
  var PassId = elephantData_AUTH.LOGIN_PASS;
  const BASE_URL = elephantData_URL.LOGIN_USER_URL;

  $scope.loginUser = function() {
    UIfactory.showSpinner();
    var login_data = {
      email: inputVal.getValue(EmailId),
      pass: inputVal.getValue(PassId)
    }
    var login = new UserFactory;
    login.loginCredentials(login_data.email, login_data.pass);
    var cleanEmail = login.cleanEmail();
    if(login.validateEmail(cleanEmail) == true) {
      var loginFormSubmit = new Submitform('POST', BASE_URL, login.loginFormData(), false);
      loginFormSubmit.ajaxSubmit(this)
    }
  }

  $scope.onSuccess = function(response) {
    if (response.status == 0) {
      UIfactory.hideSpinner();
      return UIfactory.showAlert('Alert', LoginNotifications.INVALID_ACCOUNT);
    }
    else if(response.status == 1) {
      if(response.user.status == 0) {
        UIfactory.hideSpinner();
        return UIfactory.showAlert('Alert', LoginNotifications.INACTIVE_ACCOUNT);
      }
      else {
        return userStorage(response.user);
      }
    }
  }

  var userStorage = function(data) {
    $localStorage.user_login_id = 1;
    $localStorage.user_username = data.name;
    $localStorage.user_email = data.email;
    $localStorage.user_activation = data.activation;
    $localStorage.expiry = new Date().getTime();
    return reloadForm();
  }

  var reloadForm = function() {
    inputVal.setValue(EmailId, '');
    inputVal.setValue(PassId, '');
    return redirectUser();
  }

  var redirectUser = function() {
    UIfactory.showSpinner();
    if (path == 'getitem') {
        UIfactory.hideSpinner();
        $ionicHistory.goBack();
    }
    else if (path == 'main') {
        UIfactory.hideSpinner();
        $state.go('app.main');
        $ionicSideMenuDelegate.toggleLeft();
    }
    else if (path == 'postitem') {
      UIfactory.hideSpinner();
      $ionicHistory.goBack();
    }
  }

  //Login intent message
  if (path == 'main') {
    $scope.loginMessage = 'Log in to get or post items.';
  }
  else if(path == 'postitem') {
    $scope.loginMessage = 'Log in to post items.';
  }
  else if (path == 'getitem') {
    $scope.loginMessage = 'Log in to send a message.';
  }

});
