	var fs = require('fs');
    GLOBAL.schemas = {};

	var mongoose = require('mongoose');
	mongoose.connect('mongodb://127.0.0.1:27017/gretajs', function (err) {
	    if (err) {
	        throw err;
	    } else console.log('Connected');
	});

	var database_schemas = JSON.parse(fs.readFileSync("database_schemas.json", 'utf8'));

	for (modelName in database_schemas) {
	    GLOBAL.schemas[modelName] = mongoose.model(modelName, database_schemas[modelName].schema, database_schemas[modelName].collection);
	}

	/* Schema mongoose instacié sur collection "countries" */
	/*var countriesSchema = new mongoose.Schema({
        _id: {type : mongoose.Schema.ObjectId},
	    code: {type: String},
	    name: {type: String}
    });*/

	/* Association entre la collection "countries" et le schéma */
	//var country = mongoose.model('Countries', countriesSchema, 'countries');

	/* On obtient un Model permettant d'exécuter des requêtes */
	GLOBAL.schemas["Countries"].find(function (err, comms) {
	    if (err) {
	        throw err;
	    }
	    // comms est un tableau de hash
	    console.log(comms);
	    mongoose.connection.close();
	});