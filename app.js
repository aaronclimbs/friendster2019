const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require("./routes/mainRouter")
const apiRouter = require("./routes/apiRouter")
const PORT = process.env.PORT || 3000;


// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// use body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// view engine ejs
app.use('view engine', 'ejs');

// route handling
app.use("/api", apiRouter);
app.use("/", mainRouter);

// spin up server
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`)
});
