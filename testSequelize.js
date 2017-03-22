/** Exemple de connexion SQL via Sequelize */

// Chargement du module sequelize
var Sequelize = require("sequelize");

// configuration des paramètres de la connexion
var sequelize = new Sequelize('gretajs', 'steph', 'azerty', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Connexion effective à la base de données via la méthode authenticate
// qui retourne une Promise (.then, .catch)
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    // Requête SQL via l’instance sequelize
    sequelize.query("SELECT * FROM countries", {
        type: sequelize.QueryTypes.SELECT
      })
      .then(function(countries) {
        console.log('listes des pays : ', countries);
      }).catch(function(err) {
        console.log('error select', err);
      });
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });
