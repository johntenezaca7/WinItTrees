const express = require("express");
const bodyParser = require("body-parser");
const JSONObj = require("./trees.json");
const compareTwoPoints = require("./getDistance").compareTwoPoints;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
//Send static files
app.use(express.static(__dirname + "/public"));

app.get("/api/getTree", (req, res) => {
  let lat = parseFloat(req.query.lat, 8);
  let lng = parseFloat(req.query.lng, 8);

  //pass JSONObj and geo location algo to calculate and return the nearest tree obj
  let result = compareTwoPoints(JSONObj, lat, lng);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
