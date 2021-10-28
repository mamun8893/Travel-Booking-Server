const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
var cors = require("cors");
require("dotenv").config();
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Database Connection

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x2jda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("volunteer");
//     const categoriesCollection = database.collection("categories");

//     //Put API

//     app.post("/add-activity", async (req, res) => {
//       const newActivites = req.body;
//       const result = await categoriesCollection.insertOne(newActivites);
//       res.json(result);
//     });

//     //GET API

//     app.get("/activity", async (req, res) => {
//       const cursor = categoriesCollection.find({});
//       const result = await cursor.toArray();
//       res.send(result);
//     });
//   } finally {
//     // await client.close()
//   }
// }

// run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
