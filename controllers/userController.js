// import npm modules
// import async from 'async';
// import validator from 'validator';

// import user model
var User = require("../models/user")


list = (req, res) => {
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

};

module.exports = {
    list: list
}