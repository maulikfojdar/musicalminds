var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tech Miners Inc.' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Tech Miners Inc.' });
});

router.get('/dashboard', function(req, res) {
	  res.render('dashboard', { title: 'Tech Miners Inc.' });
	});

router.get('/project', function(req, res) {
	  res.render('project', { title: 'Tech Miners Inc.' });
	});




module.exports = router;
