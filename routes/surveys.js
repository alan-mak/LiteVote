
const express = require('express');
const router  = express.Router();
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox12380c005e9e430a9a24bf7178babe5b.mailgun.org";
const mg = mailgun({apiKey: "3d0809fb-9ef7d0a0", domain: DOMAIN});
//Sample Email for testing
const data = {
	from: "Mailgun Sandbox <postmaster@sandbox12380c005e9e430a9a24bf7178babe5b.mailgun.org>",
	to: "connor.mackay@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};


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
  mg.messages().send(data, function (error, body) {
    console.log(body);
    console.log(error);
  });

})

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




