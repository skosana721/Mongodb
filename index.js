const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");

// Connecting the app to mongodb
// CRUD
mongodb.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true },
  async (err, client) => {
    const db = client.db();
    // reading date from the database

    const result = await db.collection("people").find().toArray();

    // Creating a document to the database
    const person = db.collection("people");
    const createPerson = await person.insertOne({
      name: "James",
      age: 72,
      favoriteFoods: ["sushi", "rice", "egg", "beans"],
    });
    // // update a document in the database collection
    const updatePerson = await person.updateOne(
      {
        _id: mongodb.ObjectId("605af6b51b33362ec3ee0b09"),
      },
      { $set: { name: "Ed" } }
    );
    // Deleting a document from the collection in the database

    const deletedPerson = await person.deleteOne({
      _id: mongodb.ObjectId("605af91efe9a582fdd19bbfd"),
    });
    try {
    } catch (error) {
      console.log(err);
    }

    client.close();
  }
);
