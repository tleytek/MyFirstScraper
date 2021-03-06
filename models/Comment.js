var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		article: {
			type: String,
			required: true
		}
	},
	{
		timestamps: { createdAt: "created_at" }
	}
);

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
