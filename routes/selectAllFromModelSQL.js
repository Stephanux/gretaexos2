var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/').get(function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {

        GLOBAL.db["Companies"].findAll().then(function(datas) {
            res.render(req.message.view, {
                title: 'List from SQL postgreSQL',
                result: datas
            });

        });
    } else res.redirect('/');
});
module.exports = router;
