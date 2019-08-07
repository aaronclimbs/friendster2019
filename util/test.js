const data = [
  {
    user_id: 1,
    user_name: "Noah",
    user_pic: "photo.jpg",
    answers: [4, 3, 4, 5, 6, 2, 2]
  },
  {
    user_id: 2,
    user_name: "Ava",
    user_pic: "photo.jpg",
    answers: [2, 3, 4, 5, 6, 2, 2]
  },
  {
    user_id: 3,
    user_name: "Liam",
    user_pic: "photo.jpg",
    answers: [2, 5, 4, 5, 4, 4, 2]
  },
  {
    user_id: 4,
    user_name: "Isabella",
    user_pic: "photo.jpg",
    answers: [2, 3, 6, 5, 4, 2, 4]
  },
  {
    user_id: 5,
    user_name: "Jacob",
    user_pic: "photo.jpg",
    answers: [2, 3, 3, 5, 4, 2, 1]
  },
  {
    user_id: 6,
    user_name: "Mia",
    user_pic: "photo.jpg",
    answers: [2, 3, 4, 4, 3, 2, 1]
  },
  {
    user_id: 7,
    user_name: "Mason",
    user_pic: "photo.jpg",
    answers: [2, 3, 4, 5, 2, 2, 1]
  },
  {
    user_id: 8,
    user_name: "Abigail",
    user_pic: "photo.jpg",
    answers: [1, 2, 4, 5, 3, 2, 2]
  },
  {
    user_id: 9,
    user_name: "William",
    user_pic: "photo.jpg",
    answers: [2, 3, 5, 5, 4, 2, 2]
  },
  {
    user_id: 10,
    user_name: "Emily",
    user_pic: "photo.jpg",
    answers: [2, 5, 4, 5, 4, 4, 2]
  },
  {
    user_id: 11,
    user_name: "aaron",
    user_pic: "photo.jpg",
    answers: [2, 5, 4, 6, 6, 2, 2]
  },
  {
    user_id: 12,
    user_name: "Charlotte",
    user_pic: "photo.jpg",
    answers: [2, 3, 4, 5, 6, 4, 3]
  },
  {
    user_id: 13,
    user_name: "Paul G",
    user_pic: "http://www.photo.jpg",
    answers: [0, 2, 2, 5, 2, 5, 1]
  }
];

const user = ["aaron", "somethin.jpg", "2,3,4,5,4,3,2".split(',')]

const values = data.map(person => Object.values(person));

const filteredData = data
  .map(person => Object.values(person))
  .filter(data => data[1] !== user[0])
  .map(item => {
    return { name: item[1], ansArr: item[3]};
  });
//map through filtered data and return object of person names and alike score
const filteredData2 = filteredData
  .map(person => {
    return {
      name: person.name,
      alike: person.ansArr
        // @ts-ignore
        .map((ans, index) => {
          return Math.abs(parseInt(ans) - parseInt(user[2][index]));
          // filter away any zeros and use reduce to add up differences
        })
        // .filter(item => item !== 0)
        .reduce((prev, cur) => prev + cur)
    };
  })
  // sort by score so that most alike is at the top
  .map(person => {return {name: person.name, alike: (person.alike / data.length * 100).toPrecision(4)}})
  .sort((a, b) => {
    // @ts-ignore
    return b.alike - a.alike;
  });//?
