var morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    Configuration       = require('../config/configuration'),
    express             = require('express'),
    passport            = require('passport'),
    DefaultCtrl         = require('../controllers/default'),
    UsersCtrl           = require('../controllers/users'),
    StatusCtrl          = require('../controllers/status'),
    ProjectCtrl         = require('../controllers/project'),
    app                 = express();

// Configuration
require('../config/mongo')();
require('../config/passport')(passport);

app.set('port', Configuration.port);
app.use(morgan(Configuration.env));
app.use(bodyParser());
app.use(methodOverride());
app.use(passport.initialize());

// Routes
app.use('/',        passport.authenticate('basic', { session: false }));
app.use('/users',   UsersCtrl.router);
app.use('/status',  StatusCtrl.router);
app.use('/project', ProjectCtrl.router);
app.use(DefaultCtrl.errorHandler);

module.exports = app;