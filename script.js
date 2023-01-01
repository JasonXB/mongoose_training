const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./mongo/setup");

mongoose.set("strictQuery", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // client side application port
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

// visit http://localhost:3000/?name=amy to search for document with name: "amy"
app.get("/", async (req, res) => {
  // console.log(req.query.name)
  try {
    // GET STUDENT DOCUMENT USING THE STATIC METHOD (which acts as a premade query)
    const studentDoc = await Student.findStudentByName(req.query.name); // null if not found
    console.log(studentDoc);
    // CALC & RETURN STUDENT'S LETTER GRADE USING THE INSTANCE METHOD
    return res.status(200).send({ letterAverage: studentDoc.letterAverage() }); // prettier-ignore
  } catch (error) {
    return res.status(401).send(error);
  }
});

// CREATE a new student document
// Make a post request with  { name, age, grades, faculty } payload
app.post("/", async (req, res) => {
  // Extract data from request body
  const { name, age, grades, faculty } = req.body;
  // Calc average from grades array
  const sum = grades.reduce((a, b) => a + b, 0);
  let average = sum / grades.length || 0;
  average = average.toFixed(1);
  // Create a new Student with the info you've got
  try {
    await Student.create({ name, age, grades, faculty, average }); // create new Student
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(401).send({ failure: true });
  }
});

app.listen(5500);
