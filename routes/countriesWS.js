var express = require('express');
var router = express.Router();

/* GET coutriesWS.hbs page to test socket.io */
router.get('/', function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        res.render(req.message.view, {
            title: 'Websocket connection test'
        });
    } else res.redirect('/');
});

module.exports = router;
