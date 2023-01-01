const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./mongo/setup");

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CREATE a new document
// Make a post request with  { name: String, age: Number} payload and save it to DB
app.post("/", async (req, res) => {
  const { name, age } = req.body;
  const updatedAt = new Date();
  try {
    await User.create({ name, age, updatedAt }); // create new user
    if (!name || !age) throw new Error(); // if name/age is not provided, use catch block
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(401).send({ failure: true });
  }
});

// UPDATE an existing user's age
app.put("/", async (req, res) => {
  try {
    // Find a user whose name matches the name property from the request body
    const { name, age } = req.body;
    const user = await User.findOne({ name });
    if (user === null) throw new Error(); // use catch block if we get no matches
    // Change age value on document then save
    user.age = age;
    await user.save();
    // Middleware changes updatedAt value silently
    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res.status(401).send({ failure: true });
  }
});

app.listen(5500);
