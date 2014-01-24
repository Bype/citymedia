var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/citymedia", {
	safe : false
})

db.bind('project');

var type = new Array();

exports.data = function(req, res) {
	db.project.find().sort({
		type : 1
	}).toArray(function(err, prjs) {
		res.json(prjs);
	});
};

exports.map = function(req, res) {
	var ret = [{
		name : 'Fondation Vasarely',
		map : [[0, 0, 'c1'], [0, 1, 'c1'], [1, 0, 'c1'], [1, 1, 'c1']]
	}, {
		name : 'Seconde Nature',
		map : [[6, -2, 'c3'], [6, -1, 'c3'], [5, 0, 'c1'], [5, -1, 'c0'], [5, -2, 'c0']]
	}];
	res.json(ret);
};
