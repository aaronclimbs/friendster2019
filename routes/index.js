const express = require("express");
const router = express.Router();
const mysql = require("mysql");
// api routes
router.get("/api/friends", (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "friendsterDB"
  });

  db.connect(err => {
    if (err) throw new Error(`Error: ${err.message}`);
    console.log(`Connected to database. Status: ${db.state}`);
  });
  db.query("SELECT * FROM friends", (err, data) => {
    if (err)
      throw new Error(`Error: ${err.message}
    ${err.stack}`);
    db.end();
    res.json(data);
  });
});

router.post("/friends", (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "friendsterDB"
  });

  db.connect(err => {
    if (err) throw new Error(`Error: ${err.message}`);
    console.log(`Connected to database. Status: ${db.state}`);
  });
  const answers = [
    req.body.binge,
    req.body.outdoors,
    req.body.exotic,
    req.body.livesports,
    req.body.cooking,
    req.body.fitness,
    req.body.eatout,
    req.body.gaming,
    req.body.clean,
    req.body.sleep
  ].join(",");
  const friend = [
    [
      req.body.name,
      req.body["avatar-file"].length > 0
        ? req.body["avatar-file"]
        : req.body["avatar-wl"],
      answers
    ]
  ];
  db.query(
    "INSERT INTO friends(user_name, user_pic, answers) VALUES ?",
    [friend],
    async (err, data) => {
      if (err) throw err;
      console.log("New User Added", data);
    }
  );

  const user = friend[0];
  // run a query to database and get latest list of users
  db.query("SELECT * FROM friends", async (err, result) => {
    if (err) throw new Error(`Error: ${err.message}, ${err.stack}`);
    // await result of database fetch
    const data = await result;
    // filter through users and return names and question answers
    const filteredData = data
      .map(person => Object.values(person))
      .filter(data => data[1] !== user[0])
      .map(item => {
        return { id: item[0], name: item[1], ansArr: item[3].split(",") };
      });
    //map through filtered data and return object of person names and alike score
    const sortedAlike = filteredData
      .map(person => {
        return {
          id: person.id,
          name: person.name,
          alike: person.ansArr
            .map((ans, index) => {
              return Math.abs(
                parseInt(ans) - parseInt(user[2].split(",")[index])
              );
              // filter away any zeros and use reduce to add up differences
            })
            .reduce((prev, cur) => prev + cur, 0)
        };
        // sort by score so that most alike is at the top
      })
      .map(person => {
        return {
          name: person.name,
          alike: ((person.alike / data.length) * 100).toPrecision(4)
        };
      })
      .sort((a, b) => {
        return b.alike - a.alike;
      });
    db.end();
    res.render("friend", {match: sortedAlike[0]});
  });
});

// html routes
router.get("/", (req, res) => {
  res.render("landing", { pageTitle: "Home Page" });
});

router.get("/friends/new", (req, res) => {
  res.render("survey", { pageTitle: "Survey Page" });
});

// router.get("/friends/:id", (req, res) => {
//   const friend = req.params.id;
//   const db = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "password",
//     database: "friendsterDB"
//   });

//   db.connect(err => {
//     if (err) throw new Error(`Error: ${err.message}`);
//     console.log(`Connected to database. Status: ${db.state}`);
//   });

//   db.query(
//     "SELECT * FROM friends WHERE ?",
//     { user_id: friend },
//     (err, data) => {
//       const friend = data[0];
//       if (err || !data.length) {
//         //if no data or error log error page
//         res.render("error", { pageTitle: "Not Found" });
//         db.end();
//       } else {
//         // otherwise render page of match
//         res.render("friend", { match: friend, pageTitle: "Match" });
//         db.end();
//       }
//     }
//   );
// });

// error
router.get("*", (req, res) => {
  res.render("error", { pageTitle: "Not Found" });
});

module.exports = router;
