const mysql = require("mysql");

function calculateDiff(user) {
  const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "friendsterDB"
  });
  let val;
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
        return { name: item[1], ansArr: item[3].split(",") };
      });
    //map through filtered data and return object of person names and alike score
    const sortedAlike = filteredData
      .map(person => {
        return {
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
      .sort((a, b) => {
        return a.alike - b.alike;
      });
  });
}

module.exports = {
  calculateDiff
};
