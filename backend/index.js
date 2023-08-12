const express = require("express");
const app = express();
const cors = require ("cors")
//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 3050;

// apply middleware
app.use(express.json());

// cors
app.use(cors());

const userRoutes  = require("./routes/user");

// routes
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

//connect to the database
const dbConnect = require("./config/database");
dbConnect();

app.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE</h1>`);
});