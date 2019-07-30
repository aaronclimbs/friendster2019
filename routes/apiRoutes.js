const express = require('express');
const apiRouter = express.Router();

apiRouter.get("/api/friends", (req, res) => {
  res.send(friends)
});

apiRouter.post("/api/friends", (req, res) => {
  const newFriend = req.body;
  friends.push(newFriend);
  res.redirect("/");
});

module.exports = apiRouter;
