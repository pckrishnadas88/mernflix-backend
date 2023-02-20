var express = require('express');
var userController = require("../controllers/UserController")

var router = express.Router();

/* GET users listing. */
router.get('/',function(req, res, next) {
  return userController.list(req, res)
});
module.exports = router;
