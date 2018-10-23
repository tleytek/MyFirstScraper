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
                    >Comment</button>
                </div>
            </div>`
		);
	}
});

$(document).on("click", "button", function() {
	$("#userComment").empty();

	var thisId = $(this).attr("data-id");
	// Now make an ajax call for the Article
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	}).then(function(data) {
		$("#userComment").append(`<h2> ${data.title}</h2>`);
		$("#userComment").append("<input id='titleinput' name='title' >");
		$("#userComment").append(
			"<textarea id='bodyinput' name='body'></textarea>"
		);
		$("#userComment").append(
			`<button data-id='${data._id}' id='savecomment'>Save Comment</button>`
		);

		// If there's a comment in the article
		if (data.comment) {
			// Place the title of the comment in the title input
			$("#titleinput").val(data.comment.title);
			// Place the body of the comment in the body textarea
			$("#bodyinput").val(data.comment.body);
		}
	});
});

// When you click the save comment button
$(document).on("click", "#savecomment", function() {
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the comment, using what's entered in the inputs
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			// Value taken from title input
			title: $("#titleinput").val(),
			// Value taken from comment textarea
			body: $("#bodyinput").val()
		}
	})
		// With that done
		.then(function(data) {
			// Log the response
			console.log(data);
			// Empty the comments section
			$("#userComment").empty();
		});

	// Also, remove the values entered in the input and textarea for  entry
	$("#titleinput").val("");
	$("#bodyinput").val("");
});
