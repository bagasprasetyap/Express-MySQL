var express = require("express");
var app = express();
var route_mysql = require("./router/route_mysql");

app.use(route_mysql);

app.get("/", (req, res) => {
  res.send("Server aktif!");
});

app.listen(1234, () => {
  console.log("Server aktif di port 1234");
});
