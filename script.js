const express = require("express");
const app = express();
const createUser = require("./mongo/setup");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const { name, age, password } = req.body;
  console.log(req.body);
  // Add some logic that only allows things to happen if conditions are met
  if (password !== "strong enough") {
    return res.status(400).end();
  }
  // If password is "strong enough", create a new user
  createUser(name, age, password);
  return res.status(200).send({ success: true });
});

// Listen for events on these endpoints (i think this method is for development-only)
app.listen(3000);
