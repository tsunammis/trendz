var express        = require('express'),
    morgan         = require('morgan'),
    mongoose       = require('mongoose'),
    serveStatic    = require('serve-static'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    expressSession = require('express-session'),
    passport       = require('passport'),
    connectFlash   = require('connect-flash'),
    console        = require('console'),
    configDB       = require('./config/database.js');

var app = express();

mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport);

// configuration ===============================================================

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('secret', 'mysecretkey');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());

app.use(expressSession({ secret: app.get('secret'), key: 'trendzid'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(connectFlash()); // use connect-flash for flash messages stored in session
app.use(serveStatic(__dirname + '/public'));

require('./controllers/passport.js')(app, passport);
require('./controllers/status.js')(app);

// 404
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Not found');
});

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});