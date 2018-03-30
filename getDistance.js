const getDistance = (x1, x2, y1, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const compareTwoPoints = arrayOfObj => {
  var smallestDistance = Number.POSITIVE_INFINITY;
  var insideArray;
  var eachObj, lat, lng;

  var lat1 = 40.7505984;
  var lng1 = -73.976542;

  for (var i = 0; i < arrayOfObj.length; i++) {
    eachObj = arrayOfObj[i];

    lat = eachObj.latitude;
    lng = eachObj.longitude;

    var calc = getDistance(lat1, lng1, lat, lng);

    console.log("sd", smallestDistance);

    if (calc < smallestDistance) {
      smallestDistance = calc;
      insideArray = eachObj;
    }
  }
  return insideArray;
};

module.exports.compareTwoPoints = compareTwoPoints;
