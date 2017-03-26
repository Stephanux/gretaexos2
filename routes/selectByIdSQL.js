var express = require('express');
var router = express.Router();

/* GET one record from SQL query by one parameter which it
can be _id or other like field code into countries table. */
router.route('/:_id').all(function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        var options = {};
        options.replacements = req.params;
        options.type = sequelize.QueryTypes.SELECT;

        GLOBAL.sequelize.query(req.message.sql_query, options)
            // SQL query success
            .then(function(datas) {
                console.log('listes des datas : ', datas);
                res.render(req.message.view, {
                    title: 'List from SQL postgreSQL',
                    result: datas
                });
            }) // SQL query error
            .catch(function(err) {
                console.log('error select', err);
            });
        // Not authentified redirect login
    } else res.redirect('/');

});
module.exports = router;
