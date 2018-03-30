// When user clicks on 'show my location' button
var output = document.getElementById("out");

function getLocation() {
  function error() {
    output.innerHTML = "Unable to retrieve your location, Please try again!";
  }

  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    axios
      .get("/api/getTree", {
        params: {
          lat: latitude,
          lng: longitude
        }
      })
      .then(function(response) {
        console.log(response.data);
        var details = response.data;
        output.innerHTML = `<div class='info-back'> 
          <ul>
            <li>${details.tree_id}</li>
            <li>${details.spc_latin}</li>
            <li>${details.health}</li>
          </ul>
        </div>`;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  output.innerHTML =
    "<div> <div class='loader'/></div> <p>Fetching information..</p>";

  if (navigator.geolocation) {
    console.log("getting location..");
    navigator.geolocation.getCurrentPosition(showPosition, error, {
      timeout: 30000,
      enableHighAccuracy: true,
      maximumAge: 75000
    });
  } else {
    output.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// If the user types in their address
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");

//Form Event Listener
searchForm.addEventListener("submit", function(e) {
  e.preventDefault();

  //Get search term
  var searchTerm = searchInput.value;

  output.innerHTML =
    "<div> <div class='loader'/></div> <p>Fetching information..</p>";

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=AIzaSyCn1886_Sxx7XVDi4xAjhKCKigLJyoxtvU`
    )
    .then(res => {
      var info = res.data.results[0].geometry.location;
      axios
        .get("/api/getTree", {
          params: {
            lat: info.lat,
            lng: info.lng
          }
        })
        .then(function(response) {
          var details = response.data;
          output.innerHTML = `<div> 
          <p>Details about Tree# ${details.tree_id}.</p> 
            <ul>
              <li>${details.tree_id}</li>
              <li>${details.spc_latin}</li>
              <li>${details.health}</li>
            </ul>
          </div>`;

          var img = new Image();
          img.src =
            "https://maps.googleapis.com/maps/api/staticmap?center=" +
            details.latitude +
            "," +
            details.longitude +
            "&zoom=15&size=300x300&sensor=false";

          output.appendChild(img);
        })
        .catch(function(error) {
          console.log(error);
        });
    });

  searchInput.value = "";
});
