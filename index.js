const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
var cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Database Connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x2jda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("trip_World");
    const packageCollection = database.collection("package");
    const bookPackageCollection = database.collection("book_package");

    //Put API

    app.post("/add-service", async (req, res) => {
      const newService = req.body;
      const result = await packageCollection.insertOne(newService);
      res.json(result);
    });

    //Book package Put API

    app.post("/book-package", async (req, res) => {
      const newBookPackage = req.body;
      const result = await bookPackageCollection.insertOne(newBookPackage);
      res.json(result);
    });

    //GET API

    app.get("/package", async (req, res) => {
      const cursor = packageCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    //Get Single Item API
    app.get("/package/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const package = await packageCollection.findOne(query);
      res.send(package);
    });

    //Get My Package API

    app.get("/myOrders/:email", async (req, res) => {
      const userEmail = req.params.email;
      const result = await bookPackageCollection
        .find({ email: userEmail })
        .toArray();
      res.json(result);
    });

    //Delete Package API

    app.delete("/orderDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookPackageCollection.deleteOne(query);
      res.json(result);
    });

    //Manage All Package API

    app.get("/manage-package", async (req, res) => {
      const cursor = bookPackageCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    //Update Status API

    app.put("/manage-package/:id", async (req, res) => {
      const id = req.params.id;
      const updatePackage = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: true,
        },
      };
      const result = await bookPackageCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.json(result);
    });
  } finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Trip-World Server Running");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
