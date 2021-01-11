
const express = require('express');
const router  = express.Router();

const mailgun = require("mailgun-js")

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
  console.log(req.body);
  // let id = generateRandomString();
  // console.log(id)
  db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;', [req.body.name, req.body.email])
  .then(res=>{
    console.log("Inserted data into Users ",res.rows[0].id);
    db.query(`INSERT INTO polls (title, num_choices, admin_id)
    VALUES ($1, $2, $3);`, [req.body.poll, req.body.option.length, res.rows[0].id])
    .then(res=>{
      console.log("inserted data into polls",res);
    })
    .then(result => {
      console.log("POLLID IS HERE!: ", res.rows[0].id);
      const data = {
        from: `${req.body.email}`,
        to: "alanmak95@gmail.com",
        subject: "Hello",
        text: `Your survey ${req.body.poll} has been created! access it here! http://localhost:8080/${res.rows[0].id}. View results at http://localhost:8080/${res.rows[0].id}/results`
      };
      //   mg.messages().send(data, function (error, body) {
      //   console.log(body);
      //   console.log(error);
      // });
    })
  }).catch(err => {
    res
      .status(500)
      .json({ error: err.message });



  });


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
});

router.post("/:survey_id", (req, res) => {
  db.query(`SELECT users.email FROM  users JOIN polls on admin_id = users.id WHERE admin_id = ${req.params.survey_id}`)
  .then(data => {
    const sender = data.rows[0].email;
    const message = {
      from: `${sender}`,
      to: "alanmak95@gmail.com",
      subject: "Hello",
      text: `Someone has completed you're survey. Check their results here! http://localhost:8080/${req.originalUrl}/results. Take the survey yourself here! http://localhost:8080/${req.originalUrl}`
    }
    // mg.messages().send(message, function (error, body) {
    //   console.log(body);
    //   console.log(error);
    // });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

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




