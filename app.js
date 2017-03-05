var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');

/* chargement des contrôleurs */
var index       = require('./routes/index');
var users       = require('./routes/users');
var exos        = require('./routes/exos');
var countries   = require('./routes/countries');

var users       = require('./routes/users');

var formUser    = require('./routes/formUser');
var modifyUser  = require('./routes/modifyUser');

var newUser     = require('./routes/newUser');
var createUser  = require('./routes/createUser');

var hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials', function () {
    console.log('partials registered');
});

hbs.registerHelper('compare', function (lvalue, rvalue, options) {
    //console.log("####### COMPARE lvalue :", lvalue, " et rvalue: ", rvalue);
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    var operator = options.hash.operator || "==";
    var operators = {
        '==': function (l, r) {
            if (l == r) console.log(l + ' - ' + r + ' : ' + (l == r));
            return l == r;
        },
        'tabempty': function (obj) {
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
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Gestion des routes et association routes --> contrôleurs */
app.use('/', index); // exécute le contrôleur index pour pathname '/'
app.use('/users', users);
app.use('/exos', exos);
app.use('/countries', countries);
app.use('/users', users);
app.use('/formUser', formUser);
app.use('/modifyUser', modifyUser);
app.use('/newUser', newUser);
app.use('/createUser', createUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Gestion des erreurs (error handler)
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Configuration de la connexion à la base de données :
GLOBAL.db = {};
var mongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://127.0.0.1:27017/gretajs';
// Use connect method to connect to the server
mongoClient.connect(url, function (err, db) {
    GLOBAL.db = db;
    console.log("Connected successfully to server: GLOBAL.db initialized ");
});

module.exports = app;