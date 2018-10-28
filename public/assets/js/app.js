var getComments = function(thisId) {
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	});
};

// When you click the save comment button
$(document).on("click", "#submitComment", function(event) {
	event.preventDefault();
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");
	var commentTitle = $("#comment-title").val();
	var commentText = $("#comment-text").val();

	if (!commentText && !commentTitle) {
		alert("Please enter a title and comment!");
	} else {
		$.ajax({
			method: "POST",
			url: "/articles/" + thisId,
			data: {
				// Value taken from title input
				title: commentTitle,
				// Value taken from comment textarea
				text: commentText
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
				// getComments(thisId);
				location.reload();
			});
	}

	// Run a POST request to change the comment, using what's entered in the inputs
});
