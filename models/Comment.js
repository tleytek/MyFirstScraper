var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema(
	{
		title: String,
		text: String
	},
	{
		timestamps: { createdAt: "created_at" }
	}
);

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
