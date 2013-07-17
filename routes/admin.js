var mongo = require('mongoskin');
var db = mongo.db("mongodb://dbserver/citymedia", {
	safe : false
})

db.bind('project');

exports.projectadd = function(req, res) {
	db.project.insert(req.body, function(err, data) {
		data.success = true;
		data.mongoid = data['_id'];
		res.json(data);
	});
};

exports.modulelist = function(req, res) {
	db.project.findOne({
		"_id" : new db.project.ObjectID(req.params.id)
	}, function(err, data) {
		if (data.modules)
			res.json(data.modules);
		else
			res.json({});
	});
};

exports.moduleadd = function(req, res) {
	db.project.update({
		"_id" : new db.project.ObjectID(req.params.id)
	}, {
		$push : {
			modules : req.body
		}
	}, function(err, data) {
		res.json(req.body);
	});

};

exports.moduledel = function(req, res) {
	db.project.findOne({
		"_id" : new db.project.ObjectID(req.params.id)
	}, function(err, data) {
		db.project.update({
			"_id" : new db.project.ObjectID(req.params.id)
		}, {
			$pull : {
				modules : data.modules[req.params.idx]
			}
		}, function(err, ret) {
			res.json({});
		});
	});

};

exports.projectdel = function(req, res) {
	db.project.remove({
		"_id" : new db.project.ObjectID(req.params.id)
	}, function(err) {
		res.json({
			success : true
		});
	});
};

exports.projectlist = function(req, res) {
	db.project.find({}, {
		prjtitle : 1,
		appsubtitle : 1
	}).toArray(function(err, prjs) {
		res.json(prjs);
	});
}