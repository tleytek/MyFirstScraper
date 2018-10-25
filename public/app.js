var getComments = function(thisId) {
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	}).then(function(data) {
		$(".modal-title").text(data.title);
		$("#saveComment").attr("data-id", data._id);
		$("#current-title").empty();
		$("#current-comment").empty();
		// If there's a comment in the article
		if (data.comment) {
			console.log(data.comment);
			$("#current-title").append(data.comment.title);
			$("#current-comment").append(data.comment.text);
			// Place the name of the user in the name id and the comment in the comment id
			// Place the body of the comment in the body textarea
		}
	});
};

$.getJSON("/articles", function(data) {
	for (var i = 0; i < data.length; i++) {
		//I really don't like this appending html cluster ff
		$("#articles").append(
			`<div class="row mt-4">
                <div class="col-3">
                    <img class="rounded thumbnail" 
                    style="width:100%" 
                    src='${data[i].image}' alt='article image'>
                </div>
                <div class="col-9">
                    <a  href='${data[i].link}'  
                        target='_blank'>
                            <h3 class='mx-auto text-center'>
                            ${data[i].title}
                            </h3>
                    </a>
                    <p class="mb-0"> ${data[i].text}</p>
                    <button 
                        type="button" 
                        class="btn btn-primary float-right" 
                        data-id='${data[i]._id}'
                        data-toggle="modal" 
                        data-target=".bd-example-modal-lg"
                        id="commentButton"
                    >Comment</button>
                </div>
            </div>`
		);
	}
});

$(document).on("click", "#commentButton", function() {
	var thisId = $(this).attr("data-id");
	// Now make an ajax call for the Article
	getComments(thisId);
});

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
