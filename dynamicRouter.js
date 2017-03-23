var express = require("express");
var router = express.Router();
var appContext;
var url = require("url");

function dynamicRouter(app) {
  //-- Context applicatif
  appContext = app;
  // -- Perform Automate action
  router.use(manageAction);
  // -- routeur global
  appContext.use(router);
}

/* Fonction qui permet d'aguiller les requêtes HTTP vers le bon contrôleur en fonction de l'action du pathname  */
function manageAction(req, res, next) {
  var path; // Le pathname après le port 3000 dans l'URL.
  var type; //(GET ou POST, ... http méthode)

  path = url.parse(req.url).pathname;
  type = req.method;
  // Il faut supprimer pour le routage le param après l'action
  if (path.split('/').length > 0) path = '/' + path.split('/')[1]

  // configuration du message pour les contrôleurs génériques
  req.message = {};
  req.message.action = type + path;
  if (GLOBAL.actions_json[type + path].view)
    req.message.view = GLOBAL.actions_json[type + path].view;
  else
    req.message.view = null;
  if (GLOBAL.actions_json[type + path].sql_query)
    req.message.sql_query = GLOBAL.actions_json[type + path].sql_query;
  else
    req.message.sql_query = null;



  if (typeof GLOBAL.actions_json[type + path] == 'undefined') {
    console.log("Erreur pas d'action " + path + " dans l'annuaire");
    next();
  } else {
    instanceModule = require('./routes/' + GLOBAL.actions_json[type + path].controler);
    router.use(path, instanceModule);
    next();
  }
}

module.exports = dynamicRouter;
