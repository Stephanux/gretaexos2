var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.schemas["Users"].find({}, function (err, result) {
            if (err) {
                throw err;
            }
            console.log('users: ', result);
            res.render('users', {
                title: 'List of users',
                users: result
            });
        });
    } else res.redirect('/');
});

module.exports = router;