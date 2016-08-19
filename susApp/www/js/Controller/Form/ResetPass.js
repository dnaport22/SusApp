elephant.controller('ResetPassController', function($state, $stateParams, $scope, UIfactory, UserFactory, elephantData_RESETPASS, elephantData_URL){

  var PassId = elephantData_RESETPASS.RESET_PASS;
  var Pass2Id = elephantData_RESETPASS.RESET_PASS_VALIDATE;
  const BASE_URL = elephantData_URL.RESET_VERIFY_URL;
  const key = $stateParams.key;

  $scope.resetPassword = function() {
    var resetPassword_data = {
      pass: inputVal.getValue(this.PassId),
      key: key
    }
    var resetVerify = new UserFactory;
    if(resetVerify.validatePassword() == true) {
      var resetVerifyFormSubmit = new Submitform('POST', BASE_URL, resetPassword_data, false);
      resetVerifyFormSubmit.ajaxSubmit(this)
    }
  }

  $scope.onSuccess = function(response) {
    if (response.status == 1) {
      UIfactory.showAlert('Success', 'Successfully Changed pass');
    }
    else if(response.status == 0) {
      alert('Alert', 'Error occured');
    }
    else {
      reloadForm();
    }
  }

  var reloadForm = function() {
    inputVal.setValue(PassId, '');
    inputVal.setValue(Pass2Id, '');
  }
});
