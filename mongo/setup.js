const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://JasonXB96:TM01Focus@cluster0.1yk3b7k.mongodb.net/?retryWrites=true&w=majority"
); // connect to Atlas cluster

// Create schema for user document objects
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  updatedAt: { type: Date, required: true },
});

// Middleware function runs before each .save()
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next(); // pass control to next function
});
// Middleware function runs after each .save()
userSchema.post("save", function (doc, next) {
  console.log("UPDATED USER DATA");
  next(); // pass control to next function
});

// Create a User model to perform CRUD operations on the "Users" collection
const User = mongoose.model("User", userSchema);
module.exports = User;
