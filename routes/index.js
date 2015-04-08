var express = require('express');
var router = express.Router();

// Load Home page, with header, footer, and links
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Printers Directory' });
});

module.exports = router;
