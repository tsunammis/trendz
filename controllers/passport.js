var security = require('../middlewares/security.js');

module.exports = function(app, passport) {
	
	// ============
    // [GET] /login
    // ============
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	
	// ============
    // [GET] /signup
    // ============
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// ============
    // [GET] /profile
    // ============
	app.get('/profile', security.isLogged, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// ============
    // [GET] /logout
    // ============
	app.get('/logout', security.isLogged, function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	// ============
    // [POST] /login
    // ============
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// ============
    // [POST] /signup
    // ============
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
};