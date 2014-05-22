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

// Routes unprotected
app.route('/users').post(controllers.User.create);

// Enable firewall
app.use('/', passport.authenticate('basic', { session: false }));

// Routes protected
app.route('/users/:id').get(controllers.User.show);
app.route('/users/:id/status').get(controllers.Status.listByUser);
app.route('/status/:id').get(controllers.Status.show);
app.route('/project').post(controllers.Project.create);
app.route('/project/:id').get(controllers.Project.show);

// Handle error(s)
app.use(controllers.Default.errorHandler);

module.exports = app;