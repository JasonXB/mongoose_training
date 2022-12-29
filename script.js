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
  try {
    await User.create({ name, age }); // create new user
    if (!name || !age) throw new Error(); // if name/age is not provided, use catch block
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
    const matchesList = await User.where("age")
      .gt(1)
      .limit(3)
      .select("name")
      .select("_id");
    if (matchesList.length === 0) throw new Error(); // if no matches are found, throw an error
    return res.status(200).send({ success: true, matchesList });
  } catch (error) {
    return res.status(401).send({ failure: true });
  }
});

// UPDATE an existing document's age
// Make a put request with { name: String, age: Number} payload and save it to DB
app.put("/", async (req, res) => {
  const { name, age } = req.body;
  try {
    const document = await User.findOne({ name }); // find document (null if not found)
    if (document === null) throw new Error(); // use catch block if we get no matches
    // Edit the document then save changes to the DB
    document.age = age; // change age to new value from body
    await document.save();
    return res.status(200).send({ success: true, document });
  } catch (error) {
    return res.status(401).send({ failure: true });
  }
});

// DELETE an existing document
// Make a put request with { name: String } payload and wipe any matches from the DB
app.delete("/", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await User.deleteOne({ name }); // find document (null if not found)
    console.log(result); // { acknowledged: Boolean, deletedCount: 0 if no matches found
    if (result.deletedCount === 0) throw { noMatch: true };
    return res.status(200).send({ success: true });
  } catch (error) {
    if (error.noMatch)
      return res
        .status(401)
        .send({ message: "No account found with that name" });
    return res.status(401).send(error);
  }
});

app.listen(3000);
