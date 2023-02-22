var express = require('express');
var Movie = require("../models/movieModel")
var router = express.Router();

/* GET movies listing. */
router.get('/', function (req, res, next) {
  const query = req.query || {};

  Movie.apiQuery(query)
    // limit the information returned (server side) – e.g. no password
    .select('id title description url category createdAt createdBy')
    .sort({ createdAt: -1 })
    .then(movies => {
      res.json(movies);
    })
    .catch(err => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
});

router.post('/', async function (req, res, next) {
  // create a user
  try {
    const data = Object.assign({}, req.body) || {};
    const movie = new Movie(data);
    await movie.save()
    res.json(movie)
  } catch (err) {
    //console.log(err.name)
    if (err.name == 'ValidationError') {
      return res.status(422).send(err)
    }
    if ("code" in err && err["code"] == 11000) {
      const fieldName = Object.keys(err.keyValue || "")
      return res.status(422).json({ "message": fieldName.toString() + " already exists", "error": err })
    }
    res.status(500).send(err)
  }

})
module.exports = router;
