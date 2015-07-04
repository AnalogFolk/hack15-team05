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

			console.log(address);

		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log(results[0].geometry.location);

				if(currentStorage.trips) {
					console.log('hello');
					console.log(formData);
					allTrips = JSON.parse(currentStorage.getItem('trips'));
					console.log('allTrips', allTrips);
					allTrips.push(formData);
					localStorage.setItem('trips', JSON.stringify(allTrips));

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
	addTrips = function() {
		var container = $('#trips'),
			localData = localStorage.getItem('trips'),
			length, i;

		if(container.length > 0 && localData.length > 0) {
			localData = JSON.parse(localData);
			length = localData.length;
			for(i=0; i<length; i++) {
				console.log(localData[i][0]);

				container.append('<a href="trip.html">' + localData[i][0].value + ' - ' + localData[i][1].value  + '</a>');
			}

		}
	}

	$('#create-trip').on('submit', function(e){tripSave(e);});

	addTrips();



	
}(jQuery, window));

