(function($, window, undefined){
	var saveTrip, localData, $window;

	$window = $('window');

	localData= localStorage;
	
	saveTrip = function(e){
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
				$.get('https://api.what3words.com/position?key=UGYLI1D1&lang=en&position=51.521251,-0.203586', function( data ) {
					console.log(data.words);
					formData.push(data.words);
				});

				if(currentStorage.trips) {
					console.log('hello');
					console.log(formData);
					allTrips = JSON.parse(currentStorage.getItem('trips'));
					console.log('allTrips', allTrips);
					allTrips.push(formData);
					

				} else {
					allTrips = [formData];
					console.log('else');
					console.log(formData);
				}

				localStorage.setItem('trips', JSON.stringify(allTrips));

				window.location.href = 'http://localhost:4000/';
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
			block = $('<ul></ul>'),
			localData = localStorage.getItem('trips'),
			tweet = 'http://twitter.com/share?text=RideWithMe to index home raft via w3w',
			length, i;

		if(container.length > 0 && localData.length > 0) {
			localData = JSON.parse(localData);
			length = localData.length;
			for(i=0; i<length; i++) {
				console.log(localData[i][0]);

				block.append('<li><a href="trip.html">' + localData[i][0].value + ' - ' + localData[i][1].value  + '</a><a class="tweet" href="'+tweet+'"><i class="fa fa-twitter"></i> Ride with me!</a></li>');
			}
			block.appendTo(container);
		}
	}

	$('#create-trip').on('submit', function(e){saveTrip(e);});

	addTrips();



	
}(jQuery, window));

