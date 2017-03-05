var express = require('express');
var router = express.Router();

/* GET formUser page to insert a new user */
router.get('/', function(req, res, next) {
    res.render('formUser', {title: 'Create a new user', libelle: "creation", form_action: "/createUser"});
});

module.exports = router;