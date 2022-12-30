const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./mongo/setup");

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CREATE a new student document
// Make a post request with  { name, age, grades, faculty } payload
app.post("/", async (req, res) => {
  // Extract data from request body
  const { name, age, grades, faculty } = req.body;
  console.log(req.body);
  // Calc average from grades array
  const sum = grades.reduce((a, b) => a + b, 0);
  const average = sum / grades.length || 0;
  // Create a new user with the info you've got
  try {
    await User.create({ name, age, grades, faculty, average }); // create new user
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(401).send({ failure: true });
  }
});

// READ an existing document then return it
// visit http://localhost:3000/?name=amy to search for document with name: "amy"
app.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const matchesList = [];
    return res.status(200).send({ success: true, matchesList });
  } catch (error) {
    return res.status(401).send({ failure: true });
  }
});

app.listen(3000);
