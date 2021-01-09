
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get('/', (req, res) => {
  res.render('index');
});
router.get("/new", (req, res) => {
  res.render("new")
})

router.get("/:survey_id", (req, res) => {
  const survey_id = req.params.survey_id;
  db.query('SELECT * FROM polls JOIN choices ON polls.id = choices.poll_id WHERE poll_id = $1', [survey_id])
  .then(data => {
    const survey = data.rows;
    for (let entry of survey) {
      console.log(entry.title);
    }
    res.render("survey", survey);
  });

})

router.get("/:survey_id/results", (req, res) => {
  res.render("results");
});
  return router;
};




