//Scraping Tools
var cheerio = require("cheerio");
var axios = require("axios");

var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
	db.Article.find({})
		.then(function(dbArticle) {
			var hbsObject = {
				articles: dbArticle
			};
			// console.log(JSON.stringify(hbsObject));
			res.render("index", hbsObject);
		})
		.catch(function(err) {
			res.json(err);
		});
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
	// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
	db.Article.findOne({ _id: req.params.id })
		// ..and populate all of the notes associated with it
		.populate("comment")
		.then(function(dbArticle) {
			// console.log(dbArticle);
			var singleArticle = {
				single: dbArticle
			};
			// If we were able to successfully find an Article with the given id, send it back to the client
			res.render("comments", singleArticle);
		})
		.catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
	// console.log(req.body);
	// Create a new note and pass the req.body to the entry
	db.Comment.create(req.body)
		.then(function(dbComment) {
			// console.log(dbComment);
			// If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
			// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
			// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
			return db.Article.findOneAndUpdate(
				{ _id: req.params.id },
				{ $push: { comment: dbComment._id } }
			);
		})
		.then(function(dbArticle) {
			// If we were able to successfully update an Article, send it back to the client
			res.json(dbArticle);
		})
		.catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});

//Proud of myself here with this one, removed the id from the comment array
router.delete("/comment/:id", function(req, res) {
	db.Article.findOneAndUpdate(
		{ comment: req.params.id },
		{ $pull: { comment: req.params.id } }
	)
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

//Scrapping data from a site
router.get("/scrape", function(req, res) {
	db.Article.deleteMany(function(err, removed) {
		// console.log("collection removed");
	});
	db.Comment.deleteMany(function(err, removed) {
		// console.log("collection removed");
	});
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
					console.log(dbArticle);
				})
				.catch(function(err) {
					// If an error occurred, send it to the client
					return res.json(err);
				});
		});
		res.send("Scrape Complete");
	});
});

module.exports = router;
