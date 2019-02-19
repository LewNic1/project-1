//Here is where the map ajax will go
let yelpURL;
let yelpAPIKey;
let yelpLink;
let bizAlias;
let recommendation_list = [];
let getBizAlias = function(){};
let lookupLocation = function(){};
let getCoordinates = function(){};
let loadRecommendations = function(){};

// - Setting up APIs
$(document).ready(function(){

  console.log('Doc Ready');

  yelpURL = config.yelpURL;
  yelpAPIKey = config.yelpAPIKey;
  yelpLink = $('#yelp-link');

  let map = new google.maps.Map(document.getElementById('map'),{
      center: {lat: 37.7909, lng: -122.4013},
      zoom: 16
      });
  
  $.ajax({
    method: 'GET',
    url: '/recommendations',
    success: load,
    error: handleError
  });



  function loadRecommendations(recommendation) {       
    $.each (recommendation, (rec => {
      $('#recommendation').append(
        `<div>
          <p>${rec.name}</p>
          <p>${rec.yelpLink}</p>
          <p>${rec.description}</p>
        </div>`);

        let marker;
        marker = new google.maps.Marker({
          map: map,
            position: {
              lat: `${rec.latitude}`,
              lng: `${rec.longitude}`
            },
          // We can set a custom pin icon if we want
          //   icon: {
          //     url: './images/earthquake.png',
          //     scaledSize: new google.maps.Size(30,30)
          //   }
          });
          $('#map').append(marker);
    }));
  };
  
  $.ajax({
    method: 'GET',
    url: '/',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess(response) {
    res.json(response);
  };

  function handleError() {
    console.log('uh oh');
  };

// Function to get bizAlias for yelpAPI call and coordinates
    
   getBizAlias = function () {
      let yelpLink = $('.yelp-link-test').html();
        console.log(yelpLink);
      let questionMarkIndex = yelpLink.indexOf('?')
        console.log(questionMarkIndex);
      const lastSlashIndex = yelpLink.lastIndexOf('/')
        console.log(lastSlashIndex);
      if (questionMarkIndex === -1) {
        questionMarkIndex = yelpLink.length
      }
      bizAlias = yelpLink.substring(lastSlashIndex + 1, questionMarkIndex)
      console.log(bizAlias);
    };
// Function to lookup business
     lookupLocation = function() {
      getBizAlias();
      $.ajax({
        method: 'GET',
        url: `${yelpURL}${bizAlias}`,
        //replace API key with variable
        Authorization: `ggjGZ7Ke4SFvR-CiWy5D62_b6C3AALsCd0mxDl1fVy5xjxVXkY_lPxIubyL3aM8B4RdXkqsrtu7dUHLchp-4wYfcNw-R8OjTx9-qncc9rx2Pk2Q03sPfyB8_v1JnXHYx`,
        success: getCoordinates(json),
        error: handleError
      });
    };

  getCoorindates = function(json) {
    let latitude = parceInt(json.coordinates.latitude);
    let longitude = parceInt(json.coordinates.longitude);
  };

});
