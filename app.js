const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/index")
const mysql = require("mysql");
const PORT = process.env.PORT || 3000;
const morgan = require('morgan')

//logger
app.use(morgan('tiny'));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// use body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine ejs
app.set("view engine", "ejs");

// route handling
app.use("/", routes);

// spin up server
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
