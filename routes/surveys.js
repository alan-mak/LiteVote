
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
  res.render("survey")
})

router.get("/:survey_id/results", (req, res) => {
  res.render("results");
});
  return router;
};
