const mysql = require("mysql");

const seedDB = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "friendsterDB"
});

seedDB.connect(err => {
  if (err) throw new Error(`Error: ${err.message}`);
  console.log(`Connected to database. Status: ${seedDB.state}`);
});

seedDB.query("DROP TABLE IF EXISTS friends", (err, data) => {
  if (err) throw new Error(`Error: ${err.message}`);
  console.log("TABLE DROPPED.");
});

seedDB.query(
  "CREATE TABLE friends(user_id INT NOT NULL AUTO_INCREMENT, user_name VARCHAR(50), user_pic VARCHAR(100), answers VARCHAR(20), PRIMARY KEY (user_id))",
  (err, data) => {
    if (err) throw new Error(`Error: ${err.message}`);
    console.log("TABLE CREATED.");
  }
);

const seedData = [
  ["Noah", "photo.jpg", "1,4,3,5,2,3,4,4,1,1"],
  ["Ava", "photo.jpg", "1,4,1,1,3,4,4,1,3,1"],
  ["Liam", "photo.jpg", "5,1,2,2,1,4,1,5,1,1"],
  ["Isabella", "photo.jpg", "1,5,3,4,2,5,4,5,2,4"],
  ["Jacob", "photo.jpg", "1,2,5,5,3,2,2,1,4,5"],
  ["Mia", "photo.jpg", "3,5,2,2,3,2,5,2,3,5"],
  ["Mason", "photo.jpg", "5,2,5,1,1,1,3,4,5,2"],
  ["Abigail", "photo.jpg", "4,2,3,3,4,3,1,3,5,2"],
  ["William", "photo.jpg", "5,3,2,1,4,5,3,3,4,2"],
  ["Emily", "photo.jpg", "3,2,3,4,1,3,1,5,3,5"],
  ["Ethan", "photo.jpg", "3,5,3,1,5,4,3,3,5,2"],
  ["Charlotte", "photo.jpg", "3,3,3,4,3,3,4,2,4,3"]
];

seedDB.query(
  "INSERT INTO friends(user_name, user_pic, answers) VALUES ?",
  [seedData],
  (err, data) => {
    if (err) throw new Error(`Error: ${err.message}`);
    console.log(`DATA INSERTED: ${data.affectedRows} rows`);
    seedDB.end();
  }
);
