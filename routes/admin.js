var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/citymedia", {
	safe : false
})

db.bind('project');

exports.projectadd = function(req, res) {
	if (req.body.mongoid) {
		db.project.update({
			"_id" : new db.project.ObjectID(req.body.mongoid)
		}, {
			$set : req.body
		}, function(err, data) {
			res.json({
				sucess : true,
				update : true
			});
		});
	} else {
		db.project.insert(req.body, function(err, data) {
			console.log(req.body);
			data.success = true;
			data.mongoid = data['_id'];
			res.json(data);
		});
	}
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
		req.body.id = req.params.id;
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

exports.projectinfo = function(req, res) {
	db.project.findOne({
		"_id" : new db.project.ObjectID(req.params.id)
	}, {
		modules : 0
	}, function(err, prj) {
		res.json(prj);
	});
};

exports.projectlist = function(req, res) {
	db.project.find({}, {
		prjtitle : 1,
		appsubtitle : 1
	}).toArray(function(err, prjs) {
		res.json(prjs);
	});
};
