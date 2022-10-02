const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

router.route("/createUser").post((req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const id = req.body._id;
  const password = req.body.password;
  const newUser = new User({
    id,
    userName,
    email,
    password,
  });
  newUser.save();
});

router.route("/profile").post((req, res) => {
  const content = req.body.content;
  const reply = req.body.reply;
  const id = req.body._id;
  const to = req.body.to;
  const newMess = new Message({
    id,
    content,
    reply,
    to,
  });
  newMess.save();
});

router.route("/users").get((req, res) => {
  User.find().then((users) => res.json(users));
});

router.route("/messages").get((req, res) => {
  Message.find().then((messages) => res.json(messages));
});

router.route("/reply").post((req, res) => {
  Message.findById(req.body.id, (err, mess) => {
    mess.reply = req.body.reply;
    mess.save();
  });
});

router.route("/delete").post((req, res) => {
  Message.findByIdAndDelete(req.body.id, (err, mess) => {});
});

router.route("/post").post((req, res) => {
  const content = req.body.content;
  const userName = req.body.userName;
  const id = req.body._id;
  const comments = req.body.comments;
  const likes = req.body.likes;
  const newPost = new Post({
    id,
    userName,
    comments,
    likes,
    content,
  });
  newPost.save();
});

router.route("/comments").post((req, res) => {
  Post.findById(req.body.id, (err, post) => {
    post.comments = req.body.comments;
    post.save();
  });
});
router.route("/liked").post((req, res) => {
  Post.findById(req.body.id, (err, post) => {
    post.likes = req.body.likes;
    post.save();
  });
});
router.route("/unliked").post((req, res) => {
  Post.findById(req.body.id, (err, post) => {
    post.likes = req.body.likes;
    post.save();
  });
});
router.route("/posts").get((req, res) => {
  Post.find().then((posts) => res.json(posts));
});

module.exports = router;
