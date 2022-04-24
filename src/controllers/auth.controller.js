const passport = require('passport');

// Import Services
const authService = require('../services/auth.service');

// Passport Config
const User = require('../database/models/user.model');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const auth = {

	// Shows user registration page
	showRegistration: (req, res) => {
		res.render('register');
	},

	// Creates new user according to Form Data
	registerNewUser: (req, res) => {

		let user = User.register(new User({
			username: req.body.username,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			active: process.env.NODE_ENV === 'production' ? 'inactive' : 'active'
		}), req.body.password, (err, user) => {
			if (err) {
				return res.render('error', { error: "Registration error" })
			}
			if (process.env.NODE_ENV === 'production') {
				passport.authenticate('local')(req, res, () => {
					res.redirect(`./request-email-verification/${user._id}/${req.body.email}`)
				})
			} else {
				passport.authenticate('local')(req, res, () => {
					res.redirect(`/`)
				})
			}
		})
	},

	// Shows user the login page
	showLogin: (req, res) => {
		res.render('login');
	},

	// Logs in user
	loginUser: passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}),

	// Logs out User
	logoutUser: (req, res) => {
		req.logout();
		res.redirect('/');
	},

	// Sends email verification and asks user to check it
	requestEmailVerification: (req, res) => {
		authService.requestEmailVerification(req.params.userId, req.params.email);
		res.render('registerEmail');
	},

	// Verifies user
	verifyEmail: async (req, res) => {
		await authService.verifyEmail(req.params.token);

		res.redirect('/');
	}
}

module.exports = auth;