var express = require('express');
var router = express.Router();

/* GET formUser page to insert a new user */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        res.render('formUser', {
            title: 'Create a new user',
            libelle: "creation",
            form_action: "/createUser"
        });
    }  else res.redirect('/');
});

module.exports = router;