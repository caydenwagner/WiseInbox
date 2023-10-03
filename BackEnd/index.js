// File: index.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Launch point for the back end server
const express = require("express");

const app = express();

app.listen(3000,() => console.log("Server listening at port 3000"));

app.get("/", (req, res) => {
  console.log("Entered Get");
  res.json({response: "Hello World"});
});