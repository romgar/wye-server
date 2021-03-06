var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require('../db');
const debug = require('debug')('wye');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Will you escape', req: req, activeMenu: 'index' });
});


/* Add authentication */
router.get('/login/',
  function(req, res){
    res.render('login');
  }
);

router.post('/login/',
  passport.authenticate('local', {
    failureRedirect: '/login'}
  ),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout/',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/create-account/',
  function(req, res) {
    debug('creating account');
    res.render('account-creation');
  }
);

router.post('/create-account/',
  function(req, res) {
    db.users.saveUser(req.body['email'], req.body['password'], function(user) {
      debug('user created');
      res.redirect('/');
    });
  }
);

module.exports = router;
