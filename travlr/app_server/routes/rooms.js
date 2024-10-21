var express = require('express');
var router = express.Router();
const controller = require('../controllers/rooms');

/* GET travel page. */
router.get('/', controller.room);

module.exports = router;