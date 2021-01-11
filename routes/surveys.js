
const express = require('express');
const router  = express.Router();

// const mailgun = require("mailgun-js");



const mailgun = require("mailgun-js")




//Sample Email for testing
const data = {
	from: "connor.mackay@gmail.com",
	to: "alanmak95@gmail.com",
	subject: "Hello",
	text: "go bite a smelly pumpkin"
};


let generateRandomString = require('../public/scripts/generateString.js')

module.exports = (db) => {
router.get('/', (req, res) => {
  db.query('SELECT polls.title FROM polls;')
  .then(data => {
    const polls = data.rows;
    res.render('index', { polls });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

router.get("/new", (req, res) => {
  res.render("new")
})

router.post("/new", (req, res) => {

  // let id = generateRandomString();
  // console.log(id)
  db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;', [req.body.name, req.body.email])
  .then(res=>{
    console.log("Inserted data into Users ",res.rows[0].id);
    db.query(`INSERT INTO polls (title, num_choices, admin_id)
    VALUES ($1, $2, $3);`, [req.body.poll, req.body.option.length, res.rows[0].id])
    .then(res=>{
      console.log("inserted data into polls",res);
    });
  }).catch(err => {
    res
      .status(500)
      .json({ error: err.message });



  });

  //   mg.messages().send(data, function (error, body) {
  //   console.log(body);
  //   console.log(error);
  // });
});

router.get("/:survey_id", (req, res) => {
  const survey_id = req.params.survey_id;
  db.query('SELECT polls.title, choices.title AS choices_title, choices.description FROM polls JOIN choices ON polls.id = choices.poll_id WHERE poll_id = $1;', [survey_id])
  .then(data => {
    const survey = data.rows;
    (survey);
    res.render("survey", { survey } );
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

})

router.get("/:survey_id/results", (req, res) => {
  const survey_id = req.params.survey_id;
  db.query('SELECT polls.title AS poll, choices.title, choices.total_points FROM polls JOIN choices on polls.id = choices.poll_id WHERE poll_id = $1;', [survey_id])
  .then(data => {
    const results = data.rows;
    console.log(results);
    res.render("results", { results });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});
  return router;
};




