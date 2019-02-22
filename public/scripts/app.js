//Here is where the map ajax will go
let recommendation_list = [];
let allRecMarkers = [];
// - Setting up APIs
$(document).ready(function(){
  console.log('Doc Ready');
  let $recDiv = $('#rec-list');
  let recMarker;

  // Ajax GET
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

  // Function to perform GET when we need to reflect DB changes
  function getUpdatedRecList() {
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
  };

  // Ajax POST
  $('.theForm').on('submit', function(e) {
    e.preventDefault();
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
      method: "POST",
      url: '/dashboard/recommend',
      data: formData,
      success: function(res) {
        console.log("success!!", res);
        createRecItem(res);
      },
      error: function(err) {
        console.log("uh oh, something went wrong", err);
      }
    });
  });

  // Edit Rec - Email validation version
  // $recDiv.on('click','.rec-item .rec-options .rec-edit', function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let recItem = $(this).closest('.rec-item');
  //   let recItemId = recItem.attr('id');
  //   recItem.empty();
  //   recItem.append(
  //     `<div class="auth-box">
  //     <input class="auth-input" type="text" id="email" name="email" placeholder="Enter email to edit">
  //     <input type="submit" value="Authorize" class="btn auth-btn">
  //     </div>`
  //     ); 
  //     // Needs Ajax get by ID, lookup and validate email, if true, return editable desc
  // });

  // Ajax PUT
  // Edit Rec - No email validation version
  $recDiv.on('click','.rec-item .rec-options .rec-edit', function(e){
    e.preventDefault();
    e.stopPropagation();
    let recItem = $(this).closest('.rec-item');
    let recItemId = recItem.attr('id');
    console.log(`Entering edit mode on ${recItemId}`);
    let recItemName = recItem.find('.rec-details h4').text();
    let currentRecItemDesc = recItem.find('.rec-details h5').text();
    let currentRecItemAuthor = recItem.find('.rec-details p').text();
    recItem.empty();
    recItem.append(`
      <div class="rec-details">
        <h4>${recItemName}</h4>
        <textarea style='color: black'>${currentRecItemDesc}</textarea>
        <input type="text" value='${currentRecItemAuthor}' style='color: black'></input>
      </div>
      <div class="rec-options">
        <a href="" class='rec-edit-mode-save-btn'><i class="far fa-save"></i></a>
      </div>`
    );
  });

  $recDiv.on('click','.rec-item .rec-options .rec-edit-mode-save-btn', function(e){
    e.preventDefault();
    e.stopPropagation();
    let recItem = $(this).closest('.rec-item');
    let recItemId = recItem.attr('id');
    let newRecItemDesc = recItem.find('.rec-details textarea').val();
    let newRecItemAuthor = recItem.find('.rec-details input').val();
    let updatedData = {
      description: newRecItemDesc,
      author: newRecItemAuthor
    };
    console.log(updatedData);
    console.log(`Heard edit on ${recItemId}`);
    $.ajax({
      method: 'PUT',
      url: `/dashboard/recommend/${recItemId}`,
      dataType: 'json',
      data: updatedData,
      success: updateRecSuccess,
      error: updateRecError
    });
  });

  // Delete Rec - No email validation version
  $recDiv.on('click','.rec-item .rec-options .rec-delete', function(e){
    e.preventDefault();
    e.stopPropagation();
    let recItem = $(this).closest('.rec-item');
    let recItemId = recItem.attr('id');
    console.log(`delete rec clicked on ${recItem} with ${recItemId}`)
    $.ajax({
      method: 'DELETE',
      url: `/dashboard/recommend/${recItemId}`,
      success: deleteRecSuccess,
      error: deleteRecError
      });
    });



// Google Maps Functions

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

// Google Maps Search Behavior
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
      
      // Set Place Details For POST to DB
      $('#place-name').val(place.name);
      $('#place-id').val(place.place_id);
      $('#place-latitude').val(place.geometry.location.lat());
      $('#place-longitude').val(place.geometry.location.lng());

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
  }); // End of Google Search Box functioanlity
  
// Functions used in AJAX calls

  function createRecItem(rec) {
    $recDiv.append(
      `<div class='rec-item' id='${rec._id}'>
        <div class='rec-details'>
          <h4>${rec.name}</h4>
          <h5>${rec.description}</h5>
          <p>${rec.author}</p>
        </div>
        <div class='rec-options'>
          <a href="" class='rec-edit'><i class="fas fa-pencil-alt"></i></a>
          <a href="" class='rec-delete'><i class="fas fa-trash-alt"></i></a>
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
    }); allRecMarkers.push(recMarker);

    google.maps.event.addListener(recMarker, 'click', function() {
      infowindow.setContent(
        `<div>
        <strong>${rec.name}</strong><br> 
        "${rec.description}"<br>
        - ${rec.author}
        </div>`);
      infowindow.open(map, this);
    });
  };

  function loadRecommendations(json) {
    json.forEach((rec)=> {createRecItem(rec)});
    };

  function clearRecommendations() {
    $recDiv.empty();
    allRecMarkers.forEach((pin) => {
      pin.setMap(null);
      });
    };
  
  function updateRecSuccess(json) {
    console.log(`Updated: ${json}`);
    console.log(`New Description: ${json.description} New Author: ${json.author}`);
    clearRecommendations();
    getUpdatedRecList();
    };

  function updateRecError(json) {
    console.log('update error!');
    };

  function deleteRecSuccess(json) {
    let recItem = json;
    console.log(`${recItem} was deleted`);
    clearRecommendations();
    getUpdatedRecList();
  };

  function deleteRecError() {
    console.log('deletebook error!');
  };
}); // End of Doc Ready

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










// ---------------landing.html functionality Ends----------------- 