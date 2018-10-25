var mongoose = require("mongoose");

//Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
