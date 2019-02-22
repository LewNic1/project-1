//Here is where the map ajax will go
let recommendation_list = [];
// - Setting up APIs
$(document).ready(function(){
  console.log('Doc Ready');
  
  // Front end AJAX
  $('.theForm').on('submit', function(e) {
    e.preventDefault();
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
      method: "POST",
      url: '/dashboard/recommend',
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


  $.ajax({
    method: "GET",
    url: '/dashboard/recommend',
    success: function(res) {
      console.log("Found it", res);
      loadRecommendations(res);
    },
    error: function(err) {
      console.log("uh oh, something went wrong", err);
    }
  });
// ---------------------------Darnell's Section----------------------
  // Event listener on a tags
    // Get by ID/Name
    // grab the a tag text "On Click"
    // ajax to get that specific data
      // url: '/dashboard/recommend/:name
      // Set up server side route, to .find({name: req.params.name})
    // On success
      // Delete html for recs
      // Make new template with unique req data
    // On error: flee the scene or set an alert


// Attach a directly bound event handler
$( "#myDropdown a" ).on( "click", function( event ) {
  event.preventDefault();
  console.log( $( this ).text() );

  var str1 = '/dashboard/recommend/'
  var str2 = ($( this ).text());
  var student = str1.concat(str2);
  console.log(student);

  $.ajax({
    method: "GET",
    url: student,
    success: function(res) {
      console.log("Found it", res);
      loadRecommendations(res);
    },
    error: function(err) {
      console.log("uh oh, something went wrong", err);
    }
  })





});



    

    // document.getElementById("myBtn").addEventListener("click", displayDate);


    // $('#pwdForm').on('submit', function(e) {
    //   e.preventDefault();
    //   let formData = $('#landingPwd').val();
    //   console.log(formData);
    //   $.ajax({
    //     method: "POST",
    //     url: '/pwdCheck',       //ESTABLISH A ROUTE FOR THIS BAD BOY!!!!!!!!!!!!
    //     data: formData,
    //     success: function(res) {
    //       console.log("welcome in to whatcu eatin!!", res);
    //       res.redirect('/dashboard');
    //     },
    //     error: function(err) {
    //       console.log("uh oh, something went wrong", err);
    //     }
    //   });
    //  })

// ---------------------------Darnell's Section----------------------




// Google Maps Functions

  // function initAutocomplete() {
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
        
        let recPlaceName = place.name;
        // console.log(recPlaceName);
        let recPlaceId = place.place_id;
        // console.log(recPlaceId);
        let recLatitude = place.geometry.location.lat();
        // console.log(recLatitude);
        let recLongitude = place.geometry.location.lng();
        // console.log(recLongitude);

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
        
        console.log(markers);

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  // }
  // initAutocomplete();

  function loadRecommendations(json) {
    let recMarker;
    json.forEach((rec) => {
      $recDiv.append(
        `<div class='rec-item'>
          <div class='rec-details'>
            <h4>${rec.name}</h4>
            <h5>${rec.description}</h5>
            <p>${rec.author}</p>
          </div>
          <div class='rec-options'>
            <a href="#" class='rec-edit'><i class="fas fa-pencil-alt"></i></a>
            <a href="#" class='rec-delete'><i class="fas fa-trash-alt"></i></a>
          </div>
        </div>`
        );
      recMarker = new google.maps.Marker({
        map: map,
        title: rec.name,
        position: {
          lat: parseFloat(rec.latitude),
          lng: parseFloat(rec.longitude)
        }
      });
      google.maps.event.addListener(recMarker, 'click', function() {
        infowindow.setContent(
          `<div>
          <strong>${rec.name}</strong><br> 
          ${rec.description}<br>
          - ${rec.author}
          </div>`);
        infowindow.open(map, this);
      });
    });
  };

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



//---------------landing.html functionality Begins----------------- 





<<<<<<< HEAD
// ---------------landing.html functionality Ends----------------- 
=======

// ---------------landing.html functionality Ends----------------- 
>>>>>>> 5e1d6a601a04928a01ff1df9d0f6e4fe8167705c
