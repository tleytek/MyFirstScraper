//Scraping Tools
var cheerio = require("cheerio");
var axios = require("axios");

//middleware express
var express = require("express");
var logger = require("morgan");
//database mongoose
var mongoose = require("mongoose");

//Require models
var db = require("./models");
var PORT = 3000;

var app = express();

app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Connect to the mongo db
mongoose.connect(
	"mongodb://localhost/massivelyOPdb",
	{ useNewUrlParser: true }
);

// Retrieve data from the db
app.get("/", function(req, res) {
	// Find all the results from the scrapedData collection in the db
	db.Article.find({})
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

//Scrapping data from a site
app.get("/scrape", function(req, res) {
	// Making a request via axios for MassivelyOP's website. This is going to scrape all of the data from the website
	axios.get("https://massivelyop.com").then(function(response) {
		//Lets put the response through cheerio and save it to a variable
		//We can then use the variable like JQuery to grab specific data from the DOM
		var $ = cheerio.load(response.data);

		//Using cheerio, we are going to find the div tag
		$("div.td_module_10").each(function(i, element) {
			var result = {};

			result.title = $(element)
				//this children descending is necessary because there is a thumbnail column with the
				//same storys and returns duplicate entries in the results log
				.children(".item-details")
				.children(".entry-title")
				.children()
				.attr("title");

			result.text = $(element)
				.children(".item-details")
				.children(".td-excerpt")
				.text();

			result.link = $(element)
				.children(".item-details")
				.children(".entry-title")
				.children()
				.attr("href");

			result.image = $(element)
				.children(".td-module-thumb")
				.children(".td-image-wrap")
				.children(".entry-thumb")
				.attr("src");

			//Create a new Article using the 'result object built from scraping
			db.Article.create(result)
				.then(function(dbArticle) {
					// View the added result in the console
					//console.log(dbArticle);
				})
				.catch(function(err) {
					// If an error occurred, send it to the client
					return res.json(err);
				});
		});
		res.send("Scrape Complete");
	});
});

//listen on port 3000
app.listen(3000, function() {
	console.log("App running on port " + PORT + "!");
});
