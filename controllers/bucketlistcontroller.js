var BucketList = require("../models/bucketlist.js");

exports.addBucketList = function(req, res, next) {
	// for postman use
	// var title = req.body.title;
	// var category = req.body.category;
	// var url = req.body.url;
	// var content = req.body.content;
	// var specificUser = req.user._id; 
	var title = req.body.props.title;
	var category = req.body.props.category;
	var url = req.body.props.url;
	var content = req.body.props.content;
	var specificUser = req.user._id;

	var bucketList = new BucketList({
		title: title,
		category: category,
		url: url,
		content: content,
		specificUser: specificUser
	});

	bucketList.save(function(err){
		if(err) {
			return next(err);
		}
		res.json(bucketList);
	});
}

exports.fetchBucketLists = function(req, res) {
	var specificUser = req.user._id;
	BucketList.find({specificUser: specificUser})
	.then(
		function fetchSuccess(data) {
			res.json(data);
		},
		function fetchError(err) {
			res.send(500, err.message);
		}
	);
}

exports.fetchBucketList = function(req, res) {
	var specificBucketList = req.params.id;
	BucketList.findOne({_id: specificBucketList})
	.then(
		function fetchSuccess(data) {
			res.json(data);
		},
		function fetchError(err) {
			res.send(500, err.message);
		}
	);
}

exports.deleteBucketList = function(req, res) {
	var specificBucketList = req.params.id;
	BucketList.remove({_id: specificBucketList})
	.then(
		function deleteSuccess(data) {
			res.json(data);
		},
		function deleteError(err) {
			res.send(500, err.message);
		}
	);
}