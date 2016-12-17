elephant.controller('PostitemController', function($state, $scope, $ionicHistory, $localStorage ,$ionicActionSheet, $timeout, $cordovaCamera, $cordovaFileTransfer, $ionicAnalytics, $window, UIfactory, elephantData_URL, elephantData_POSTITEM, PostitemNotification) {
  var itemNameid = elephantData_POSTITEM.ITEM_NAME;
  var itemDescid = elephantData_POSTITEM.ITEM_DESC;
  var itemImageid = elephantData_POSTITEM.ITEM_IMAGE;

  $scope.imageOptions = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-camera"></i>Capture using camera'},
        { text: '<i class="icon ion-images"></i>Select from gallery' }
      ],
      titleText: 'How would you like to select your image?',
      buttonClicked: function(index) {
        if (index == 0) {
          hideSheet();
          $scope.takePicture(Camera.PictureSourceType.CAMERA);
        }
        else if (index == 1) {
          hideSheet();
          $scope.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
        }
        else if (index == 2) {
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };

  var imageToUpload = null;

  $scope.takePicture = function(source) {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 720,
      targetHeight: 720,
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
      imageToUpload = imageURI;
      document.getElementById("upload-image-container").style.display = "block";
      document.getElementById("select-image-button").innerHTML= "Reselect image";
    }, function(err) {
      //Show an event or run analytics functions if required...
    });


  }

  $scope.uploadItem = function() {
    //$ionicHistory.goBack()
    //$state.go('app.main')
    UIfactory.showSpinner();
    var fileURL = imageToUpload;
    var serverURL = elephantData_URL.POST_ITEM_URL;
    var itemName = inputVal.getValue(itemNameid);
    var itemDesc = inputVal.getValue(itemDescid);
    if(itemName === "" || itemDesc === "" || fileURL == null) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'Please complete all fields and select an image.');
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
          UIfactory.hideSpinner();
          UIfactory.showAlert('Success', PostitemNotification.UPLOAD_SUCCESS);
          $cordovaCamera.cleanup();
          //Ionic analytics below
          $ionicAnalytics.track('Posted Item', {item_name: itemName, post_user_activation: $localStorage.user_activation})
          reloadForm();
          $state.go("app.main");
          $ionicSideMenuDelegate.toggleLeft();
        }, function(err) {
          UIfactory.hideSpinner();
          UIfactory.showAlert('Error', PostitemNotification.UPLOAD_ERROR);
          $cordovaCamera.cleanup();
        }
      )
    }
  }

  var reloadForm = function() {
    inputVal.setValue(itemNameid, '');
    inputVal.setValue(itemDescid, '');
    imageToUpload = null;
    document.getElementById("upload-image-container").style.display = "none";
    document.getElementById("select-image-button").innerHTML= "Select image";
  }

  // var redirectUser = function() {
  //   UIfactory.showSpinner();
  //   if (path == 'main') {
  //       UIfactory.hideSpinner();
  //       $ionicHistory.goBack();
  //   }
  //   else if (path == 'menu') {
  //       UIfactory.hideSpinner();
  //       $state.go('app.main');
  //       $ionicSideMenuDelegate.toggleLeft();
  //   }
  //   else if (path == 'postitem') {
  //     UIfactory.hideSpinner();
  //     $ionicHistory.goBack();
  //   }
  // }

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
