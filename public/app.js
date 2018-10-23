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
                <div class="col">
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
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	}).then(function(data) {
		$(".modal-title").text(data.title);

		$("#title").append(
			"<label for='comment-title' class='col-form-label'>Comment Title</label>"
		);
		$("#title").append(
			"<input type='text' class='form-control' id='comment-title'>"
		);
		$("#comment").append(
			"<label for='comment-text' class='col-form-label'>Comment</label>"
		);
		$("#comment").append(
			"<textarea class='form-control' id='comment-text'></textarea>"
		);
		$("#saveComment").attr("data-id", data._id);
		console.log(data);
		// If there's a comment in the article
		if (data.userComment) {
			console.log(data);
			// Place the title of the comment in the title input
			$("#comment-title").val(data.userComment.title);
			// Place the body of the comment in the body textarea
			$("#comment-text").val(data.userComment.body);
		} else {
			$(".modal-title").empty();
			$("#title").empty();
			$("#comment").empty();
		}
	});
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
			body: $("#comment-text").val()
		}
	})
		// With that done
		.then(function(data) {
			// Log the response
			// console.log(data);
			// Empty the comments section
			$(".modal-title").empty();
			$("#title").empty();
			$("#comment").empty();
		});

	// Also, remove the values entered in the input and textarea for  entry
	$("#title").val("");
	$("#comment").val("");
});
