const express = require("express");
const router = express.Router();

// api routes
router.get("/api/friends", (req, res) => {
  res.send("friends");
});

router.post("/api/friends", (req, res) => {
  const newFriend = req.body;
  friends.push(newFriend);
  res.redirect("/");
});

// html routes
router.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home Page" });
});

router.get("/friends/add", (req, res) => {
  res.render("survey", { pageTitle: "Survey Page" });
});

// error
router.get("*", (req, res) => {
  res.render("error", { pageTitle: "Not Found" });
});

module.exports = router;
