//middleware express
var express = require("express");
var logger = require("morgan");
//database mongoose
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
//Parse request body as JSON
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controller/scraperController.js");
app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI;
//Connect to the mongo db
mongoose.connect(
	MONGODB_URI,
	{ useNewUrlParser: true }
);

//listen on port 3000
app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});
