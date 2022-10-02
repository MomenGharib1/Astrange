const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    id: "",
    content: "",
    userName: "",
    comments: [],
    likes: [],
  },
  { collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
