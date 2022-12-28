const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://JasonXB96:TM01Focus@cluster0.1yk3b7k.mongodb.net/?retryWrites=true&w=majority"
); // connect to Atlas cluster

// Create schema for user document objects
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    // Create a validate property and assign it a validator function that returns a Boolean
    validate: {
      // validator: (i) => i % 2 === 0, // validator function will only pass even number ages
      validator: (i) => {
        console.log("WHAT IS I", i);
        return i % 2 === 0;
      },
      message: (props) => {
        console.log(props);
        return `${props.value} is not an even number`;
      },
    },
  },
});
// Create a User model to perform CRUD operations on the "Users" collection
const User = mongoose.model("User", userSchema);

async function createUser(name, age) {
  // Create a new user object using your schema + model
  const newUser = await User.create({ name, age });
  await newUser.save();
}

module.exports = createUser;
