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
		//trying to get a one to many relationship
		//for more than one comment
		article: {
			type: Schema.Types.ObjectId,
			ref: "Article"
		}
	},
	{
		timestamps: { createdAt: "created_at" }
	}
);

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
