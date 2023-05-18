const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password");
  //  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://mongo_writer:${password}@cluster0.pp2rb.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const note = new Phonebook({
  name,
  number,
});

if (name || number) {
  note.save().then((result) => {
    console.log(`phonebook save  ${result}`);
    mongoose.connection.close();
  });
} else {
  Phonebook.find({}).then((result) => {
    for (let e of result) {
      console.log(`entry  ${e.name} ${e.number}`);
    }
    mongoose.connection.close();
  });
}
