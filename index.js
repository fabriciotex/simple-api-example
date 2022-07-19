// import express
const express = require("express");

// import users array
const users = require("./users");

// initialize express
const app = express();

// set up express listen port
const port = "5500";
app.listen(port, () => console.log(`Server running on port ${port}...`));
