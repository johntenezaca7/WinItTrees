const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const csv = require("csvtojson");
const obj = require("./trees.json");
// console.log("OBJ", obj[0]);
const compareTwoPoints = require("./getDistance").compareTwoPoints;
console.log(compareTwoPoints(obj));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get("/api/test", (req, res) => {
  console.log(req.headers);
  console.log("hitting the back end", res.query);

  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
