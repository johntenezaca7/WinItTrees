function getLocation() {
  var output = document.getElementById("out");

  function error() {
    output.innerHTML = "Unable to retrieve your location, Please try again!";
  }

  function showPosition(position) {
    console.log("first call back..");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log("hello");
    output.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude;
  }

  output.innerHTML =
    "<div> <div class='loader'/></div> <p>Fetching location..</p>";

  axios
    .get("/api/test", {
      params: {
        lat: "test1",
        lng: "test"
      }
    })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });

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
