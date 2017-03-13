var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.schemas["Exercices"].find({}, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            res.render('exos', {
                title: 'Express',
                exos: result[0]
            });
        });
    }  else res.redirect('/');
});

module.exports = router;