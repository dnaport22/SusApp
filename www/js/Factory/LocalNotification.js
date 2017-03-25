elephant.factory('LocalNotification', function ($cordovaLocalNotification) {
	var now = new Date().getTime();
	var _10SecondsFromNow = new Date(now + 10 * 1000);
	return {
		scheduleNotification: function () {
			$cordovaLocalNotification.schedule({
				id: 1,
				title: 'Checkout free items!',
				message: 'Hey! lets do some freecycling',
				at: _10SecondsFromNow
			}).then(function (result) {
				console.log(result)
			})
		}
	}
});