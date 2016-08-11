angular.module('Services', [])

.factory('popAlert', function($http, $ionicPopup) {

  return {
    showAlert: function(title, template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template,
      });
      return alertPopup;
    }
  }
});
