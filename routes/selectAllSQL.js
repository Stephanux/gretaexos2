var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if ((req.session.passport) && (req.session.passport.user != null)) {

    GLOBAL.sequelize.query(req.message.sql_query, {
        type: sequelize.QueryTypes.SELECT
      }) // SQL query success
      .then(function(datas) {
        console.log('listes des datas : ', datas);
        res.render(req.message.view, {
          title: 'List from SQL postgreSQL',
          result: datas
        });
      }) // SQL query error
      .catch(function(err) {
        console.log('error select', err);
      });

  } else res.redirect('/');

});
module.exports = router;
