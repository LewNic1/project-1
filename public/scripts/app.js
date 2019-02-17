//Here is where the map ajax will go

// - Setting up APIs
$(document).ready(function(){

    let map = new google.maps.Map(document.getElementById('map'),{
        center: {lat: 37.7909, lng: 122.4013},
        zoom: 8
        });

    $.ajax({
        method: "GET",
        url: `${yelpURL}`,
        success: function(response) {
          console.log(response);
          let earthquakes = response.features;
          for (let i = 0; i < earthquakes.length; i++) {
            $('#info').append(`<p>${earthquakes[i].properties.title}</p>`);
            var marker;
              marker = new google.maps.Marker({
              map: map,
              position: {
                lat: earthquakes[i].geometry.coordinates[1],
                lng: earthquakes[i].geometry.coordinates[0]
              },
              icon: {
                url: './images/earthquake.png',
                scaledSize: new google.maps.Size(30,30)
              }
            });
            $('#map').append(marker);
          };
        },
    
        error: function() {
        console.log('Error');
        }
    
      });
});