const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://JasonXB96:TM01Focus@cluster0.1yk3b7k.mongodb.net/?retryWrites=true&w=majority"
); // connect to Atlas cluster

// Create schema for user document objects
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  password: String,
});
// Create a User model to perform CRUD operations on the "Users" collection
const User = mongoose.model("User", userSchema);

async function createUser(name, age, password) {
  // Create a new user object using your schema + model
  const newUser = await User.create({ name, age, password });
}

module.exports = createUser;
