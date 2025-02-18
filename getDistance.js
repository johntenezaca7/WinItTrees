const getDistance = (x1, x2, y1, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const compareTwoPoints = (arrayOfObj, lat1, lng1) => {
  var smallestDistance = Number.POSITIVE_INFINITY;
  var insideArray;
  var eachObj, lat2, lng2, calc;

  for (var i = 0; i < arrayOfObj.length; i++) {
    eachObj = arrayOfObj[i];

    lat2 = parseFloat(eachObj.latitude);
    lng2 = parseFloat(eachObj.longitude);

    calc = getDistance(lat1, lng1, lat2, lng2);

    if (calc < smallestDistance) {
      smallestDistance = calc;
      insideArray = eachObj;
    }
  }
  return insideArray;
};

module.exports.compareTwoPoints = compareTwoPoints;
