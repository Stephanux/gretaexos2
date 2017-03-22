var postgres = require('pg');

var config = {
  user: 'steph', //env var: PGUSER
  database: 'gretajs', //env var: PGDATABASE
  password: 'azerty', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


var client = new postgres.Client(config);

// connect to our database
client.connect(function(err) {
  if (err) throw err;

  // execute a query on our database
  client.query('SELECT * from countries', [], function(err, result) {
    if (err) throw err;

    // just print the result to the console
    console.log(result); // outputs: { name: 'brianc' }

    // disconnect the client
    client.end(function(err) {
      if (err) throw err;
    });
  });
});
