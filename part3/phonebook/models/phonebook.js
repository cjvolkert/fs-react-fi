const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("connection to ", url);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((res) => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("error", error.message);
  });

const phonebookSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phonebook", phonebookSchema);
