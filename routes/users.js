var express = require('express');
var User = require("../models/userModel")
var router = express.Router();

/* GET users listing. */
router.get('/',function(req, res, next) {
  const query = req.query || {};

	User.apiQuery(query)
		// limit the information returned (server side) – e.g. no password
		.select('name email username')
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
});

router.post('/', async function(req, res, next){
  // create a user
  try {
    const data = Object.assign({}, req.body) || {};
    const user = new User(data);
    await user.save()
    res.json(user)
  } catch(err) {
    //console.log(err.name)
    if(err.name == 'ValidationError') {
      return res.status(422).send(err)
    }
    if("code" in err && err["code"] == 11000) {
      const fieldName = Object.keys(err.keyValue ||  "")
      return res.status(422).json({"message": fieldName.toString() + " already exists", "error": err})
    }
    res.status(500).send(err)
  }
	
	// User.create(data)
	// 	.then(user => {
	// 		res.json(user);
	// 	})
	// 	.catch(err => {
	// 		logger.error(err);
	// 		res.status(500).send(err);
	// 	});
  

})
module.exports = router;
