const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    id: "",
    content: "",
    reply: "",
    to: "",
  },
  { collection: "messages" }
);

const Message = mongoose.model("Message", messagesSchema);

module.exports = Message;
