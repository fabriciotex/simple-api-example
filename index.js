// import express
const express = require("express");

// import users array
const users = require("./users");

// initialize express
const app = express();

// set up express listen port
const port = "5500";
app.listen(port, () => console.log(`Server running on port ${port}...`));

// enable JSON middleware
app.use(express.json());

// get all users
app.route("/users").get((req, res) => res.json(users));

// get user by id
app.route("/users/:id").get((req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => Number(user.id) === Number(userId));

  user ? res.json(user) : res.json(`User not found.`);
});
