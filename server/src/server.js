const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
//=========================================================================

/*
TODO: Implement all routes
*/

const uri =
  "mongodb+srv://subhamswostikpradhan2004:UcqsuR9R6CVTUtcx@cluster0.dcefp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your actual MongoDB URI
const app = express();
const port = 3000;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());

//===============================================API=====================================================

//POST=====================================================================

app.post("/api/check-user", async (req, res) => {
  const userNameToCheck = req.body.name;

  if (!userNameToCheck) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const db = client.db("codex_db");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ name: userNameToCheck });

    if (user) {
      res.json({ message: "User found", userName: user.name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Database error checking user:", error);
    res.status(500).json({ error: "Error checking user in database" });
  }
});

app.post("/api/submit-form", async (req, res) => {});
app.post("/api/create-form", async (req, res) => {});

//GET=====================================================================

app.get("/api/get-server-message", (req, res) => {
  const message = "Hello from the backend!";
  res.json({ msg: message });
});
app.get("/api/get-input-form", (req, res) => {});
app.get("/api/get-input-form-response", (req, res) => {});
app.get("/api/compute-aggregate-data", (req, res) => {});

//PUT===================================================================================================

app.put("/api/update-form", async (req, res) => {});

//SERVER===================================================================================================

async function connectDatabase() {
  try {
    await client.connect(); // Connect to MongoDB ONCE when server starts
    console.log("Successfully connected to MongoDB!");
    // Optionally, you can perform a ping here to verify the connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment - connection is healthy.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Start the server AFTER attempting to connect to the database
connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
