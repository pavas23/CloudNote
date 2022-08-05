const connectToMongo = require("./db");
connectToMongo();
// creating express app after connecting mongoose to mongod db
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
// using cors middleware
app.use(cors());
// middleware for sending json in req body
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./Routes/auth.js"));
app.use("/api/notes", require("./Routes/notes.js"));

app.listen(port, () => {
  console.log(`CloudNote app successfully started at port:${port}`);
});
