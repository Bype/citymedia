var uuid = require('node-uuid');

exports.upload = function(req, res) {
	res.redirect("http://qi.bype.org/w/" + uuid.v4() + "#" + req.params.tag);
};
