const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", require("./routes/Routes"));
mongoose.connect(
  "mongodb+srv://MomenGharib:Xdesignerstrange2022@cluster0.4fxgyat.mongodb.net/usersDB"
);

app.listen(process.env.PORT || 3001, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
