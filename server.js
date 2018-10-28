//middleware express
var express = require("express");
var logger = require("morgan");
//database mongoose
var mongoose = require("mongoose");
var PORT = 3000;

var app = express();

app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controller/scraperController.js");
app.use(routes);

//Connect to the mongo db
mongoose.connect(
	"mongodb://localhost/massivelyOPdb",
	{ useNewUrlParser: true }
);

//listen on port 3000
app.listen(3000, function() {
	console.log("App running on port " + PORT + "!");
});
