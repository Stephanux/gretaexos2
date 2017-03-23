var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* DELETE user from _id into url */
router.route('/:_id').get(function(req, res) {
  console.log('req.originalUrl : ', req.originalUrl);
  GLOBAL.schemas["Users"].remove({
    _id: new ObjectId(req.params._id)
  }, function(err, result) {
    if (err) {
      throw err;
    }
    GLOBAL.schemas["Users"].find({}, function(err, result) {
      res.render('users', {
        title: "List of users",
        users: result // il n'y a qu'une réponse possible donc un seul élément dans le tableau
      });
    });
  });
});

module.exports = router;
