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

// create new user
app.route("/users").post((req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = {
    id: newId,
    name: req.body.name,
    avatar_url: req.body.avatar_url,
    location: req.body.location,
  };
  users.push(newUser);

  res.json(`User ${newUser.name} created successfully!`);
});

// update user
app.route("/users/:id").put((req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(
    (user) => Number(user.id) === Number(userId)
  );

  if (userIndex === -1) {
    return res.json(`User not found.`);
  }

  const updatedUser = {
    ...users[userIndex],
    name: req.body.name,
    avatar_url: req.body.avatar_url,
    location: req.body.location,
  };

  users[userIndex] = updatedUser;

  res.json(`User ${userId} updated successfully`);
});

// delete user
app.route("/users/:id").delete((req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(
    (user) => Number(user.id) === Number(userId)
  );

  if (userIndex === -1) {
    return res.json(`User not found.`);
  }

  users.splice(userIndex, 1);

  res.json(`User ${userId} deleted successfully!`);
});
