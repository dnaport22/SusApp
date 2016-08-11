angular.module('PostitemController')

.controller('PostitemController', function($scope,$localStorage ,$ionicActionSheet, $timeout, $cordovaCamera, $cordovaFileTransfer, $window, $ionicLoading, popAlert) {

  $scope.itemNameid = 'name';
  $scope.itemDescid = 'desc';
  $scope.itemInageid = 'upImage';
  var BASE_URL = 'http://maddna.xyz/postitem.php';

  $scope.imageOptions = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Capture using camera' },
        { text: 'Select from gallery' }
      ],
      titleText: 'How would you like to select picture?',
      buttonClicked: function(index) {
        if (index == 0) {
          $scope.takePicture(Camera.PictureSourceType.CAMERA);
        }
        else if (index == 1) {
          $scope.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
        }
        else if (index == 2) {
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 9000);
  };

  $scope.imageToUpload = null;

  $scope.takePicture = function(source) {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 720,
      popoverOption: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      MediaType: 0
    };

    $cordovaCamera.getPicture(options)
    .then(function(imageURI){
      var image = document.getElementById('upImage');
      var photo = 'data:image/jpeg;base64,' + imageURI;
      image.style.backgroundImage = "url('" + imageURI + "')";
      $scope.imageToUpload = imageURI;
      document.getElementById("upload-image-container").style.display = "block";
      document.getElementById("select-image-button").innerHTML= "Reselect Image";
    }, function(err) {
      popAlert.showAlert('Alert', 'Error while calling native components');
      console.log(err)
    });


  }

  $scope.uploadItem = function() {
    $ionicLoading.show({animation: 'fade-in', showBackdrop: true, maxWidth: 200,});
    var fileURL = $scope.imageToUpload;
    var serverURL = BASE_URL;
    var itemName = inputVal.getValue($scope.itemNameid);
    var itemDesc = inputVal.getValue($scope.itemDescid);
    if(itemName === "" || itemDesc === "" || fileURL == null) {
      $ionicLoading.hide();
      popAlert.showAlert('Alert', 'Please fill all fields and select an image');
    }
    else {
      var imageSrc = $scope.getFileName(fileURL);
      var options = new FileUploadOptions();
      options.fileKey = 'file';
      options.fileName = imageSrc;
      options.mimeType = "image/jpeg";

      var params = new Object();
      params.itemName = itemName;
      params.desc = itemDesc;
      params.code = $localStorage.user_activation;
      options.params = params;

      $cordovaFileTransfer.upload(serverURL, fileURL, options)
        .then(function(result) {
          $ionicLoading.hide();
          popAlert.showAlert('Success', 'Your item will appear in the app soon after approval')
          $cordovaCamera.cleanup();
          $scope.reloadForm();
        }, function(err) {
          $ionicLoading.hide();
          alert('Alert', 'An error occured file uploading the item, please contact app admintrantion team if error presist')
          $cordovaCamera.cleanup();
        }
      )
    }
  }

  $scope.reloadForm = function() {
    inputVal.setValue($scope.itemNameid, null);
    inputVal.setValue($scope.itemDescid, null);
    document.getElementById("upload-image-container").style.display = "none";
    document.getElementById("select-image-button").innerHTML= "Select Image";
  }

  $scope.getFileName = function(fileName) {
    file = fileName.substr(fileName.lastIndexOf('/')+1);
    finalName = null;
    fileCheck = file.split('.jpg');
    if (fileCheck[1] == '') {
      return file;
    }
    else {
      return fileCheck[0]+'.jpg';
    }
  }

  $scope.checkMaxLength = function() {
    var itemName = document.getElementById("name");
    var itemNameMaxLength = document.getElementById("name").maxLength;
    var itemNameWarning = document.getElementById("name-warning");
    var itemDesc = document.getElementById("desc");
    var itemDescMaxLength = document.getElementById("desc").maxLength;
    var itemDescWarning = document.getElementById("desc-warning");

    if (itemName.value.length == itemNameMaxLength) {
      itemName.style.color = "red";
      itemNameWarning.style.display = "block";
    } else {
      itemName.style.color = "black";
      itemNameWarning.style.display = "none";
    }

    if (itemDesc.value.length == itemDescMaxLength) {
      itemDesc.style.color = "red";
      itemDescWarning.style.display = "block";
    } else {
      itemDesc.style.color = "black";
      itemDescWarning.style.display = "none";
    }
  }

});