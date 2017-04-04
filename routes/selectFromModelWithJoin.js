var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/').get(function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.db["Companies"].belongsTo(GLOBAL.db["Countries"], {
            foreignKey: "countrieId",
            keyType: GLOBAL.db.Sequelize.INTEGER
        });
        GLOBAL.db["Companies"].findAll({
            include: [{
                model: GLOBAL.db.Countries,
                keyType: GLOBAL.db.Sequelize.INTEGER
            }]
        }).then(function(datas) {
            res.render(req.message.view, {
                title: 'List from SQL postgreSQL',
                result: datas
            });
        });
    } else res.redirect('/');
});
module.exports = router;

/** **************************************** REQUETE GENEREE PAR SEQUELIZE D'APRES LES CONFIGURATION DES MODELS ***********************************************************************
Executing (default): SELECT "companies"."id", "companies"."name", "companies"."age", "companies"."adress1", "companies"."adress2", "companies"."postal_code",
                            "companies"."city", "companies"."countries_oid", "country"."oid" AS "country.oid", "country"."code" AS "country.code",
                            "country"."libelle_us" AS "country.libelle_us", "country"."libelle_fr" AS "country.libelle_fr"
FROM "companies" AS "companies"
LEFT OUTER JOIN "countries" AS "country" ON "companies"."id" = "country"."oid";
********************************************************************************************************************************************************************************* **/
//
// -- PROBLEME DANS LA CONSTRUCTION DE LA REQUETE SQL CAR UTILISE companies.id au lieu de companies.countries_oid dans le LEFT OUTER JOIN  ????

/** ************************************************************ ERREUR A L'EXECUTION ???? **********************************************************************************************
Unhandled rejection Error: Countries (Countries) is not associated to Companies!
    at validateIncludedElement (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/lib/model.js:558:11)
    at /home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/lib/model.js:440:29
    at Array.map (native)
    at validateIncludedElements (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/lib/model.js:436:37)
    at null.<anonymous> (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/lib/model.js:1372:32)
    at tryCatcher (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/util.js:16:23)
    at Promise._settlePromiseFromHandler (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/promise.js:512:31)
    at Promise._settlePromise (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/promise.js:569:18)
    at Promise._settlePromise0 (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/promise.js:614:10)
    at Promise._settlePromises (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/promise.js:693:18)
    at Async._drainQueue (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/async.js:133:16)
    at Async._drainQueues (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/async.js:143:10)
    at Immediate.Async.drainQueues [as _onImmediate] (/home/stephane/workspaceGreta/gretaexos2/node_modules/sequelize/node_modules/bluebird/js/release/async.js:17:14)
    at processImmediate [as _immediateCallback] (timers.js:396:17)

******************************************************************************************************************************************************************************* **/
