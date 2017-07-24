var Auth = require("./controllers/auth");
var BucketList = require("./controllers/bucketlistcontroller");

var passportService = require("./services/passport");
var passport = require("passport");

var requireAuth = passport.authenticate("jwt", {session: false});
// we are overriding the default to return a cookie by potting "jwt"
var requireSignin = passport.authenticate("local", {session: false});

module.exports = function(app) {

	app.get("/", function(req, res) {
		res.send({message: "hey"});
		// res.send({hi: "there"});
	});

	app.post("api/signup", Auth.signup);

	app.post("api/signin", requireSignin, Auth.signin);

	app.post("/newitem", requireAuth, BucketList.addBucketList);

	app.get("/items", requireAuth, BucketList.fetchBucketLists);

	app.get("/items/:id", requireAuth, BucketList.fetchBucketList);

	app.delete("/items/:id", requireAuth, BucketList.deleteBucketList);

};