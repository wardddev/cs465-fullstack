var express = require('express');
var router = express.Router();
const controller = require('../controllers/main');

/* GET main page. */
router.get('/', controller.index);

module.exports = router;