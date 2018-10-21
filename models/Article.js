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
	note: {
		type: Schema.Types.ObjectId,
		ref: "UserComment"
	}
});

module.exports = Article;
