var getComments = function(thisId) {
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	});
};

// $(document).on("click", "#commentButton", function() {
// 	var thisId = $(this).attr("data-id");
// 	// Now make an ajax call for the Article
// 	getComments(thisId);
// });

// When you click the save comment button
$(document).on("click", "#saveComment", function() {
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the comment, using what's entered in the inputs
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			// Value taken from title input
			title: $("#comment-title").val(),
			// Value taken from comment textarea
			text: $("#comment-text").val()
		}
	})
		// With that done
		.then(function(data) {
			// Log the response
			// console.log(data);
			// Empty the comments section
			$(".modal-title").val("");
			$("#comment-title").val("");
			$("#comment-text").val("");
			// $("#current-title").empty();
			// $("#current-comment").empty();
			// $("#current-title").append(data.comment.title);
			// $("#current-comment").append(data.comment.text);
			getComments(thisId);
		});
});
