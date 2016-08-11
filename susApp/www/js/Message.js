angular.module('Message', [])

.service('MessageService', function(popAlert) {

  this.constructor = function(to_user, item_name, email, username) {
    this.msg = inputVal.getValue("user_message");
    this.item_name = item_name;
    this.toUserId = to_user;
    this.fromUser = email;
    this.fromUsername = username;
    this.itemid = '';
    this._url = 'http://www.maddna.xyz/message.php';
  }

  this.processInput = function() {
    if (this.msg == '') {
      popAlert.showAlert('Alert', 'Please enter you message');
    } else {
      return this.sendMessage();
    }
  }

  this.sendMessage = function() {
    var dataString = 'msg='+this.msg+'&toUser='+this.toUserId+'&fromUser='+this.fromUser+'&itemName='+this.item_name+'&fromUsername='+this.fromUsername;
    var request = new Submitform('POST', this._url, dataString, false);
    request.ajaxSubmit(this);
    return false;
  }

  this.submitResponse = function(response) {
    if (response == '1') {
      popAlert.showAlert('Message Sent', 'Please keep an eye on your LSBU email account');
      this.reloadForm();
    }
    else {
      popAlert.showAlert('Error occurred', 'Check if you internet is working');
    }
  }

  this.reloadForm = function() {
    inputVal.setValue('user_message', 'Hey, I am interested in your item.');
    return false;
  }

})
