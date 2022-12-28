const express = require("express");
const app = express();
const mongoose = require("mongoose");
const createUser = require("./mongo/setup");

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const { name, age } = req.body;
  // If password is "strong enough", create a new user
  createUser(name, age);
  return res.status(200).send({ success: true });
});

app.listen(3000);
