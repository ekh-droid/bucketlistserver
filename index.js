var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();
var router = require("./router");
var mongoose = require("mongoose");
var cors = require("cors");

// DB connection
mongoose.connect("mongodb://SuperAdmin:admin@ds019866.mlab.com:19866/bucketlist");

// CORS - middleware on the express side
app.use(cors());

// middleware
app.use(bodyParser.json({ type: "*/*"}));
router(app);

// server
var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port);
console.log("Server listening on " + port);