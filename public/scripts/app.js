//Here is where the map ajax will go
let recommendation_list = [];
// - Setting up APIs
$(document).ready(function(){
  console.log('Doc Ready');
  // Front end AJAX
  $('.theForm').on('submit', function(e) {
    e.preventDefault();
    let formData = $(".theForm").serialize();
    console.log(formData);
    $.ajax({
      method: "POST",
      url: '/recommend',
      data: formData,
      success: function(res) {
        console.log("success!!", res)
      },
      error: function(err) {
        console.log("uh oh, something went wrong", err);
      }
    });
  })

  let $recDiv = $('#recList');
  function loadRecommendations(json) {
    json.forEach((rec) => {
      $recDiv.append(
        `<div class='rec-item'>
          <div class='rec-details'>
            <h4>${rec.name}</h4>
            <h5>${rec.yelp}</h5>
            <p>${rec.description}</p>
          </div>
          <div class='rec-photo'>
          </div>
        </div>`
        );
      
    });
  };

  $.ajax({
    method: "GET",
    url: '/recommend',
    success: function(res) {
      console.log("Found it", res);
      loadRecommendations(res);
    },
    error: function(err) {
      console.log("uh oh, something went wrong", err);
    }
  });



// Google Maps Functions

  function initAutocomplete() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.7909, lng: -122.4013},
      zoom: 16,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Creating pin info window
    let infowindow = new google.maps.InfoWindow();
    // Connecting place services
    let service = new google.maps.places.PlacesService(map);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      console.log(bounds);
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        
        let recPlaceId = place.place_id;
        console.log(recPlaceId);
        let recLatitude = place.geometry.location.lat();
        console.log(recLatitude);
        let recLongitude = place.geometry.location.lng();
        console.log(recLongitude);

        let icon = {
          url: place.icon, // update with our own
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  initAutocomplete();

});

//------------------drop down functionality starts here------------------------------- 

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


//------------------drop down functionality ends here------------------------------- 
