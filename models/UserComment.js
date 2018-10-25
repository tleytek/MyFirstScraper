var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserCommentSchema = new Schema(
	{
		title: String,
		text: String
	},
	{
		timestamps: { createdAt: "created_at" }
	}
);

var UserComment = mongoose.model("UserComment", UserCommentSchema);

module.exports = UserComment;
