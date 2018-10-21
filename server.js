var cheerio = require("cheerio");
var axios = require("axios");

// Making a request via axios for MassivelyOP's website. This is going to scrape all of the data from the website
axios.get("https://massivelyop.com").then(function(response) {
	//Lets put the response through cheerio and save it to a variable
	//We can then use the variable like JQuery to grab specific data from the DOM
	var $ = cheerio.load(response.data);

	//empty array to store our results
	var results = [];

	//Using cheerio, we are going to find the div tag
	$("div.td_module_10").each(function(i, element) {
		var title = $(element)
			//this children descending is necessary because there is a thumbnail column with the
			//same storys and returns duplicate entries in the results log
			.children(".item-details")
			.children(".entry-title")
			.children()
			.attr("title");

		var text = $(element)
			.children(".item-details")
			.children(".td-excerpt")
			.text();

		var image = $(element)
			.children(".td-module-thumb")
			.children(".td-image-wrap")
			.children(".entry-thumb")
			.attr("src");

		results.push({
			title: title,
			text: text,
			image: image
		});
	});
	console.log(results);
});
