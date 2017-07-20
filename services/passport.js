var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

// create local strategy,
var localOptions = { usernameField: 'email'};
// default for LocalStrategy first argument would be username, so we have to override
var localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	User.findOne({email: email}, function(err, user) {
// if there's an error in the search, return error object
		if(err) {
			return done(err);
		}
// user not found
		if(!user) {
			return done(null, false);
		}
// compare passwords - is "password" = user.password
// compate pw from req with users saved pw
		user.comparePassword(password, function(err, isMatch) {
	// if there was an error, return early
			if (err) {
				return done(err);
			}
	//not the same, it will return false
			if(!isMatch) {
				return done(null, false);
			}
//same, it will call passport callback with user model
			return done(null, user);
		});
// salted the pw and decode encrypted pw to normal pw
	});
	// otherwise call it done with false
});

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: config.secret
};

// create jwt strategy
var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	// on payload we have sub property, use the User model, look through all users and fine user with given
	User.findById(payload.sub, function(err, user) {
		// in the findById callback, we will get two arguments: err and user.  Err is going to be
		// populated only if search fails
		if (err) {
			return done(err, false);
			// if we can find the user, pass it to done callback.  They are authenticated
		}
		if (user) {
			done(null, user);
		} else {
			// if we cannot find user with id, we are going to call done function without user obj
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);