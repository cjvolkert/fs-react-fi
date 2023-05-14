const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("gibe password");
  //  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://mongo_writer:${password}@cluster0.pp2rb.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Html is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note save");
  mongoose.connection.close();
});
