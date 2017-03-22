var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if ((req.session.passport) && (req.session.passport.user != null)) {
    GLOBAL.sequelize.query("SELECT * FROM countries", {
      type: sequelize.QueryTypes.SELECT
    }).then(function(countries) {
      console.log('listes des pays : ', countries);
      res.render('countriesSQL', {
        title: 'List countries from SQL postgreSQL',
        country: countries
      });
    }).catch(function(err) {
      console.log('error select', err);
    });
  } else res.redirect('/');

});
module.exports = router;
