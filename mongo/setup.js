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

studentSchema.virtual("letterAverage").get(function () {
  const numAvg = this.average;
  if (numAvg < 50) return "F grade";
  else if (numAvg < 60) return "D grade";
  else if (numAvg < 70) return "C grade";
  else if (numAvg < 80) return "B grade";
  else if (numAvg < 90) return "A grade";
  else if (numAvg < 100) return "S grade";
  else return null;
}); // return a value from this function

// Create a User model to perform CRUD operations on the "Students" collection
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
