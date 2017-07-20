var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
});

// encrypt password after saving
userSchema.pre("save", function(next) {
	var user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if(err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function( err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	// this.password is our hashed and salted password
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		// if there was an error, return the callback with the error
		if (err) {
			return callback(err);
		}
		// otherwise call the callback
		callback(null, isMatch);
	});
};

var model = mongoose.model("user", userSchema);

module.exports = model;