var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

/** todo : ici initialiser la connexion à la base postgreSQL via Sequelize */
// Chargement du module sequelize
GLOBAL.db = {};
var Sequelize = require("sequelize");
db.Sequelize = Sequelize;

GLOBAL.modelsSeq = {};
// configuration des paramètres de la connexion SQL Sequelize
var sequelize = new Sequelize('gretajs', 'steph', 'azerty', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
db.sequelize = sequelize;

// Loader Sequelize models into GLOBAL.db
fs.readdirSync(__dirname + '/models')
    .filter(function(file) {
        return (file.indexOf(".js") !== 0); // si on veut exclure du chargement un fichier dans le dossier && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname + '/models', file));
        db[model.name] = model;
        console.log('file read : ' + file);
    });
// ERREUR DE JOINTURE VIA LES MODELES

GLOBAL.db["Companies"].belongsTo(GLOBAL.db["Countries"], {
    foreignKey: "countrieId",
    keyType: GLOBAL.db.Sequelize.INTEGER
});

//GLOBAL.db["Countries"].hasMany(GLOBAL.db["Companies"]);

/* Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
    console.log("db[" + modelName + "]", db[modelName]);
}); */

GLOBAL.schemas = {};

// Configuration de la connexion à la base de données via Mongoose :
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gretajs', function(err) {
    if (err) {
        throw err;
    } else console.log('Connected');
});

var database_schemas = JSON.parse(fs.readFileSync("database_schemas.json", 'utf8'));



for (modelName in database_schemas) {
    GLOBAL.schemas[modelName] = mongoose.model(modelName, database_schemas[modelName].schema, database_schemas[modelName].collection);
}

/* chargement configuration JSON des actions --> controleurs */
GLOBAL.actions_json = JSON.parse(fs.readFileSync("./routes/config_actions.json", 'utf8'));

console.log('data_schemas : ', database_schemas);
console.log('actions_json : ', actions_json);

// Plus nécessaire car on utilise l'extension .html pour les fichiers handlebars
/* var hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials', function() {
  console.log('partials registered');
}); */

//hbs.registerHelper('compare',});

var hbsexp = exphbs.create({
    extname: '.html',
    defaultLayout: 'layout',
    partialsDir: [
        'views/partials/',
        'views/'
    ],
    helpers: {
        compare: function(lvalue, rvalue, options) {
            //console.log("####### COMPARE lvalue :", lvalue, " et rvalue: ", rvalue);
            if (arguments.length < 3)
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            var operator = options.hash.operator || "==";
            var operators = {
                '==': function(l, r) {
                    if (l == r) console.log(l + ' - ' + r + ' : ' + (l == r));
                    return l == r;
                },
                'tabempty': function(obj) {
                    if (!obj || obj.length == 0)
                        return true;
                    return false;
                }
            }
            if (!operators[operator])
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            var result = operators[operator](lvalue, rvalue);
            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', hbsexp.engine);
app.set('view engine', '.html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookieName: 'sessiongreta',
    secret: 'AsipfGjdp*%dsDKNFNFKqoeID13456ÇRFÙOVFK'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    GLOBAL.schemas["Users"].findById(id, function(err, user) {
        done(err, user);
    });
});

// Authentification via passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        GLOBAL.schemas["Users"].findOne({
            login: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log("pas d'utilisateur trouvé");
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (user.mdp != password) {
                console.log("password erroné");
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            console.log("utilisateur : ", user);
            return done(null, user);
        });
    }
));

app.post('/authenticated', passport.authenticate('local'), function(req, res) {
    if (req.session.passport.user != null) {
        res.redirect('/index');
    } else {
        res.redirect('/newUser');
    }
});

// Routes Managed dynamicaly
require('./dynamicRouter')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
