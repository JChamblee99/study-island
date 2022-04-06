const passport = require('passport');

// Passport Config
const User = require('../database/models/user.model');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const auth = {

	showRegistration: (req, res) => {
		res.render('register');
	},

	registerNewUser: (req, res) => {

		User.register(new User({
			username: req.body.username,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		}), req.body.password, (err, user) => {
			if (err) {
				return res.render('error', { error: "Registration error" })
			}

			passport.authenticate('local')(req, res, () => {
				res.render('home')
			})
		})
	},

	showLogin: (req, res) => {
		res.render('login');
	}, 

	loginUser: passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}),
}

module.exports = auth;