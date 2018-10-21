var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserCommentSchema = new Schema({
	title: String,
	body: String
});

var UserComment = mongoose.model("UserComment", UserCommentSchema);

module.exports = UserComment;
