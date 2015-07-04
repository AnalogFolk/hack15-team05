(function($, window, undefined){
	var tripSave, localData, $window;

	$window = $('window');

	localData= localStorage;
	
	tripSave = function(e){
		e.preventDefault();
		console.log(e);
		var formData = $(e.currentTarget).serializeArray(),
			geocoder = new google.maps.Geocoder(),
			address = $('#to').val(),
			currentStorage = localStorage,
			allTrips,
			currentTrip;

		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log(results[0].geometry.location);

				if(currentStorage.trips) {
					console.log('hello');
					console.log(formData);
					allTrips = JSON.parse(currentStorage.getItem('trips'));
					console.log(currentStorage.getItem('trips'));

				} else {
					allTrips = [formData];
					console.log('else');
					console.log(formData);
					currentStorage.setItem('trips', JSON.stringify(allTrips));
					console.log(currentStorage.getItem('trips'));
				}
				// localData.destination =  {
				// 	address: address,
				// 	latitude: results[0].geometry.location.A,
				// 	longitude: results[0].geometry.location.F
				// }
			} else {
				console.log('Google Geocoding has failed: ' + status);
			}
		});
		if(localStorage.trips){
			console.log(localStorage.trips);
		}
		
	};


	$('#create-trip').on('submit', function(e){tripSave(e);});





	
}(jQuery, window));

