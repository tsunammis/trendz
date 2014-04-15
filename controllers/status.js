var security = require('../middlewares/security.js'),
    User     = require('../models/user.js'),
    Status   = require('../models/status.js');

module.exports = function(app) {

	// ============
    // [GET] /
    // Desc: Status list
    // ============
	app.get('/', security.isLogged, function(req, res) {

        console.log('GET /status');
        
        var result = [];
        
        Status
            .find({})
            .limit(20)
            .sort('-date')
            .populate('user')
            .exec(function (err, result) {
                if (err) return handleError(err);
                
                console.log(result);
                
                res.render('status.ejs', { listStatus: result });
            });
	});
	
	// ============
    // [GET] /me
    // Desc: Status list for connected user
    // ============
	app.get('/me', security.isLogged, function(req, res) {

        console.log('GET /me');
        
        var result = [];
        
        Status
            .find({ user: req.user._id })
            .limit(20)
            .sort('-date')
            .populate('user')
            .exec(function (err, result) {
                if (err) return handleError(err);
                
                console.log(result);
                
                res.render('status.ejs', { listStatus: result });
            });
	});
	
	// ============
    // [POST] /status
    // Desc: Add status      
    // ============
	app.post('/status', security.isLogged, function(req, res) {

        console.log('POST /status');

        var newStatus = new Status({ user: req.user, content: req.body.status.content });

        newStatus.save(function (err) {
          // err is our ValidationError object
          // err.errors.color is a ValidatorError object
          
          console.log(err) // prints "ValidationError"
        });

        res.redirect('/');
	});
	
};