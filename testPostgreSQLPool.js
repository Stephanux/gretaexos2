var postgres = require('pg');

var config = {
  user: 'steph',
  database: 'gretajs',
  password: 'azerty',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new postgres.Pool(config);
// connect to our database
pool.connect(function(err, client, done) {
  if (err) {
    return console.error('error pour récupérer une cnx cliente dans le pool', err);
  }
  // execute a query on our database
  client.query('SELECT * from countries', [], function(err, result) {
    done(err);
    if (err) {
      return console.error('error d\'exécution de la requête postgreSQL query', err);
    }
    // just print the result to the console
    console.log(result); // outputs: { name: 'brianc' }
    // disconnect the client
    client.end(function(err) {
      if (err) throw err;
    });
  });
});
