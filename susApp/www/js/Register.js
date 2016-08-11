angular.module('Register', [])

.controller('RegisterController', function($scope, popAlert, $ionicHistory) {
  $scope.isChecked = {
    checkbox: false
  }

  $scope.NameId = 'set_name';
  $scope.EmailId = 'set_email';
  $scope.PassId = 'set_pass';
  $scope.Pass2Id = 'set_pass2';
  $scope._name = '';
  $scope._email = '';
  $scope._pass = '';
  $scope._pass2 = '';
  $scope._url = 'http://maddna.xyz/register.php';

  $scope.processInput = function() {
     $scope._name = inputVal.getValue($scope.NameId);
     $scope._email = inputVal.getValue($scope.EmailId);
     $scope._pass = inputVal.getValue($scope.PassId);
     $scope._pass2 = inputVal.getValue($scope.Pass2Id);
     var nameMatching = name.match($scope.nameMatch);
     if ($scope._name == ''  || $scope._email == '' || $scope._pass == '' || $scope._pass2 == '' ) {
       popAlert.showAlert('Alert', 'Please fill all the fields');
     }
     else {
       return $scope.validateEmail();
     }
  }

  $scope.validateEmail = function() {
    var validate = new Validation($scope._email);
    if (validate.emailValidate() == 'formatError') {
      popAlert.showAlert('Alert', 'Please enter valid LSBU email address');
    }
    else if (validate.emailValidate() == 'invalid') {
      popAlert.showAlert('Alert', 'Invalid email');
    }
    else {
      $scope.validatePassword();
    }
  }

  $scope.validatePassword = function() {
    if ($scope._pass != $scope._pass2){
      popAlert.showAlert('Alert', 'Password does not match');
    }
    else {
      return $scope.validateTC();
    }
  }

  $scope.validateTC = function() {
    if ($scope.isChecked.checkbox == false) {
      popAlert.showAlert('Alert', 'Agree terms and conditions')
    }
    else {
      return $scope.submit();
    }
  }

  $scope.submit = function() {
    var dataString = 'name=' + $scope._name + '&email=' + $scope._email + '&pass=' + $scope._pass;
    var request = new Submitform('POST', $scope._url, dataString, false);
    request.ajaxSubmit($scope);
    return false;
  }

  $scope.submitResponse = function(response) {
    if (response.status == 1) {
      popAlert.showAlert('Registred successfully', 'A validation email has been sent to your LSBU email account, please validate your email to start using your account.');
      $scope.reloadForm();
    }
    else if(response.status == 0) {
      popAlert.showAlert('Alert', 'Email already registred');
    }
  }

  $scope.reloadForm = function() {
    inputVal.setValue($scope.NameId, '');
    inputVal.setValue($scope.EmailId, '');
    inputVal.setValue($scope.PassId, '');
    inputVal.setValue($scope.Pass2Id, '');
    $scope.isChecked.checkbox = false;
    return $ionicHistory.goBack();;
  }

})
