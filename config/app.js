var morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    Configuration       = require('../config/configuration'),
    express             = require('express'),
    passport            = require('passport'),
    controllers         = require('../controllers'),
    app                 = express();

// Configuration
require('../config/passport')(passport);

app.set('port', Configuration.port);
app.use(morgan(Configuration.env));
app.use(bodyParser());
app.use(methodOverride());
app.use(passport.initialize());

// Routes
app.use('/',        passport.authenticate('basic', { session: false }));
app.use('/users',   controllers.User.router);
app.use('/status',  controllers.Status.router);
app.use('/project', controllers.Project.router);
app.use(controllers.Default.errorHandler);

module.exports = app;