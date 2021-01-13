const express = require('express');
const { ClientBase } = require('pg');
const router  = express.Router();
// const mailgun = require("mailgun-js")

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
    res.render("new");
  });

  router.post("/new", (req, res) => {

    db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;', [req.body.name, req.body.email])


    .then(data=>{
      console.log(data.rows);
      return db.query(`INSERT INTO polls (title, num_choices, admin_id)
      VALUES ($1, $2, $3)
      RETURNING *;`, [req.body.poll, req.body.option.length, data.rows.id])
    })
    .then(data=>{
      for (let index in req.body.option) {
        db.query('INSERT INTO choices (poll_id, title, description) VALUES ($1, $2, $3);', [data.rows[0].id, req.body.option[index], req.body.option_description[index]])
      }
      const message = {
        from: `${req.body.email}`,
        to: "connor.mackay@gmail.com",
        subject: "Hello",
        text: `Your survey ${req.body.poll} has been created! access it here! http://localhost:8080/${data.rows[0].id}. View results at http://localhost:8080/${data.rows[0].id}/results`
      };
        mg.messages().send(message, function (error, body) {
        console.log(body);
        console.log(error);
      });
      res.redirect('/')
    })
    .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
    });
  });

  router.get("/:survey_id", (req, res) => {
    const survey_id = req.params.survey_id;
    db.query('SELECT polls.title, choices.title AS choices_title, choices.description FROM polls JOIN choices ON polls.id = choices.poll_id WHERE polls.id = $1;', [survey_id])
      .then(data => {
        const survey = data.rows;
        res.render("survey", { survey, survey_id });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:survey_id", (req, res) => {
    const results = req.body;
    for (let result in results) {
      db.query(`UPDATE choices SET total_points = total_points + $1 WHERE poll_id = $2 and choices.title = $3`, [results[result], req.params.survey_id, result]);
    }
    db.query(`SELECT users.email FROM  users JOIN polls on admin_id = users.id WHERE admin_id = ${req.params.survey_id}`)
      .then(data => {
        const sender = data.rows[0].email;
        const message = {
          from: `${sender}`,
          to: "connor.mackay@gmail.com",
          subject: "Hello",
          text: `Someone has completed you're survey. Check their results here! http://localhost:8080/${req.originalUrl}/results. Take the survey yourself here! http://localhost:8080/${req.originalUrl}`
          };

    // mg.messages().send(message, function (error, body) {
    //   console.log(body);
    //   console.log(error);
    // })
    res.redirect('/')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/:survey_id/results", (req, res) => {
    const survey_id = req.params.survey_id;
    db.query('SELECT polls.title AS poll, choices.title, choices.total_points FROM polls JOIN choices on polls.id = choices.poll_id WHERE poll_id = $1 ORDER BY choices.total_points DESC;', [survey_id])
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




