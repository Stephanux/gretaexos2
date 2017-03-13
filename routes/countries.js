var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.schemas["Countries"].find({}, function (err, result) {
            if (err) {
                throw err;
            }
            //console.log(result);
            res.render('countries', {
                title: 'Liste countries',
                country: result
            });
        });
    } else res.redirect('/');

});
module.exports = router;