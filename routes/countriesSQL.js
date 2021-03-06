var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if ((req.session.passport) && (req.session.passport.user != null)) {

    GLOBAL.sequelize.query("SELECT * FROM countries", {
        type: sequelize.QueryTypes.SELECT
      }) // SQL query success
      .then(function(datas) {
        console.log('listes des pays : ', datas);
        res.render('countriesSQL', {
          title: 'List from SQL postgreSQL',
          country: datas
        });
      }) // SQL query error
      .catch(function(err) {
        console.log('error select', err);
      });

  } else res.redirect('/');

});
module.exports = router;
