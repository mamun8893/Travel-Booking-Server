const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
var cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const port = 5000;

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
    console.log("database COnnected");
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

    //Get My Order API

    app.get("/myOrders/:email", async (req, res) => {
      const userEmail = req.params.email;
      const result = await bookPackageCollection
        .find({ email: userEmail })
        .toArray();
      res.json(result);
    });

    app.delete("/orderDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookPackageCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
