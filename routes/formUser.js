var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* GET user from _id into url */
router.route('/:_id').get(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        console.log('req.originalUrl : ', req.originalUrl);
        GLOBAL.schemas["Users"].find({
            _id: new ObjectId(req.params._id)
        }, function (err, result) {
            if (err) {
                throw err;
            }
            console.log('formUser: ', result);
            res.render('formUser', {
                title: "Form user\'s datas",
                libelle: "modification",
                form_action: "/modifyUser",
                user: result[0] // il n'y a qu'une réponse possible donc un seul élément dans le tableau
            });
        });
    }  else res.redirect('/');
});

module.exports = router;