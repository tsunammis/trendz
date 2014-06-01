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
app.route('/me').get(controllers.User.self);
app.route('/me').put(controllers.User.update);
app.route('/me/status').get(controllers.Status.listByCurrentUser);
app.route('/me/project').get(controllers.Project.listByCurrentUser);
app.route('/users/:id').get(controllers.User.show);
app.route('/users/:id/status').get(controllers.Status.listByUser);
app.route('/users/:id/project').get(controllers.Project.listByUser);
app.route('/status').post(controllers.Status.create);
app.route('/status/:id').delete(controllers.Status.remove);
app.route('/status/:id').get(controllers.Status.show);
app.route('/project').post(controllers.Project.create);
app.route('/project/:id').put(controllers.Project.update);
app.route('/project/:id').get(controllers.Project.show);
app.route('/project/:id').delete(controllers.Project.remove);
app.route('/project/:id/status').get(controllers.Status.listByProject);
app.route('/project/:id/users').get(controllers.User.listByProject);
app.route('/project/:id/users').post(controllers.User.addToProject);
app.route('/project/:id/users/:idUser').delete(controllers.User.removeUserFromProject);

// Handle error(s)
app.use(controllers.Default.errorHandler);

module.exports = app;