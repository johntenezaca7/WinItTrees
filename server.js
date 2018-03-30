const express = require("express");
const bodyParser = require("body-parser");
const JSONObj = require("./trees.json");
const compareTwoPoints = require("./getDistance").compareTwoPoints;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get("/api/getTree", (req, res) => {
  let lat = parseInt(req.query.lat, 10);
  let lng = parseInt(req.query.lng, 10);

  let result = compareTwoPoints(JSONObj, lat, lng);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
