var fs = require('fs');
var mongoose = require('mongoose');
var genericModel = require(__dirname + '/otf_mongooseGeneric');

loadModels: function (directory) {
        //temporaire
        var directory_schema = {};
        GLOBAL.schemas = [];
        // Load File
        try {
            logger.debug("OTF² Load Schema Name [%s]", util.inspect(directory.schema));
            directory_schema = JSON.parse(fs.readFileSync(directory.schema, 'utf8'));
            //logger.debug("OTF² Load Schema [%s]", util.inspect(directory_schema));
        } catch (err) {
            logger.error("OTF² Load Schema File ERROR mess [%s] ", util.inspect(err.message));
        }
        // Tableaux
        try {
            for (modelName in directory_schema) {
                var _schema = directory_schema[modelName].schema
                logger.debug("OTF² schema_loader --> Model Name      [", modelName, "]");
                logger.debug("OTF² schema_loader --> Collection Name [", directory_schema[modelName].collection, "]");
                logger.debug("OTF² schema_loader --> Schema          [%s]", util.inspect(directory_schema[modelName].schema));
                GLOBAL.schemas[modelName] = new genericModel.mongooseGeneric(modelName, directory_schema[modelName].schema, directory_schema[modelName].collection);
                logger.debug("OTF² schema_loader Model Name          [", modelName + " Loaded OK]");
                logger.debug("---------------------------------------");
            }

        } catch (err) {
            logger.error(" Load Schema ERROR mess :%s ", err.message);
        }
    }