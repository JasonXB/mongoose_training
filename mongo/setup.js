const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://JasonXB96:TM01Focus@cluster0.1yk3b7k.mongodb.net/?retryWrites=true&w=majority"
); // connect to Atlas cluster

// Create schema for user document objects
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // mandatory age property. Must be a number if included
  },
  age: {
    type: Number,
    required: true, // mandatory age property. Must be a number if included
  },
  grades: {
    type: [Number], // array of numbers
    required: true,
  },
  faculty: {
    type: String,
    enum: ["FEAS", "FBIT", "FOE", "FOS", "FSSH"], // limited to these strings
    required: true,
  },
  average: {
    type: Number,
    required: true,
  },
});
// Create a User model to perform CRUD operations on the "Students" collection
const Student = mongoose.model("User", studentSchema);
module.exports = Student;
