var morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    cookieParser        = require('cookie-parser'),
    Configuration       = require('../config/configuration'),
    express             = require('express'),
    passport            = require('passport'),
    DefaultCtrl         = require('../controllers/default.js'),
    UsersCtrl           = require('../controllers/users.js'),
    StatusCtrl          = require('../controllers/status.js'),
    app                 = express();

// Configuration
require('../config/mongo')();
require('../config/passport')(passport);

app.set('port', Configuration.port);
app.use(morgan(Configuration.env));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(passport.initialize());

// Routes
app.use('/',        passport.authenticate('basic', { session: false }));
app.use('/users',   UsersCtrl.router);
app.use('/status',  StatusCtrl.router);
app.use(DefaultCtrl.errorHandler);

module.exports = app;