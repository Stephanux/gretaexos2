var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
/* GET users listing. */
router.route('/:_id').get(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        console.log('req.originalUrl : ', req.originalUrl);
        GLOBAL.schemas["Users"].update({
                _id: new ObjectID(req.params._id)
            }, {
                $set: req.query
            },
            function (err, result) {
                if (err) {
                    throw err;
                }
                console.log('modifyUser: ', result);
                GLOBAL.schemas["Users"].find({
                    _id: new ObjectID(req.params._id)
                }, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log('users: ', result);
                    res.render('modifyUser', {
                        title: 'User modified without error',
                        user: result[0]
                    });
                }); // fin du find() après update
            } // fin callback de l'update
        ); // fin de l'update()
    }  else res.redirect('/');
}); // fin de la gestion de la route

module.exports = router;