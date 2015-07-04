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
				$.get('https://api.what3words.com/position?key=UGYLI1D1&lang=en&position='+results[0].geometry.location.A +','+results[0].geometry.location.F, function( data ) {
					console.log(data.words);
					formData.push(data.words[0]+ ' ' + data.words[1]+ ' ' + data.words[2]);

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
				});

				

				
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
			block = $('<ul class="collection"></ul>'),
			localData = localStorage.getItem('trips'),
			words = '',
			tweet = 'http://twitter.com/share?url=false&text=' + encodeURIComponent('#RideWithMe to \'index home raft\' via @what3words'),
			length, i;


		if(container.length > 0 && localData && localData.length > 0) {
			localData = JSON.parse(localData);

			console.log(localData);
			length = localData.length;
			for(i=0; i<length; i++) {
				console.log(localData[i][0]);
				words = localData[i][3];
				console.log('what 3 words', words);
				tweet = 'http://twitter.com/share?url=false&text=' + encodeURIComponent('#RideWithMe to \''+ words +'\' via @what3words #AFHackFestival');

				
				block.append('<li class="collection-item"><a href="trip.html">' + localData[i][0].value + ' - ' + localData[i][1].value  + '</a><a class="tweet secondary-content" href="'+tweet+'"><i class="fa fa-twitter"></i> Ride with me!</a></li>');
			}
			block.appendTo(container);
		}
	}

	$('#create-trip').on('submit', function(e){saveTrip(e);});

	addTrips();

	
}(jQuery, window));





var notifications = (function() {
	'use strict';

	var notifications = {

		init : function() {

			$(window).keypress(function( event ) {
  			if (event.which==112) {notifications.showPing();}
     		else if (event.which==100) {notifications.showDisruption();}
  		});

  		$('.close-notification').on('click', function(e) {
  			e.preventDefault();
  			$('.notification').fadeOut(400);
  		});
		},
		showPing : function() {
			$('.notification.ping').fadeIn(400);
		},
		showDisruption : function() {
			$('.notification.disruption').fadeIn(400);
		}
	};

	return notifications;
}());
notifications.init();
