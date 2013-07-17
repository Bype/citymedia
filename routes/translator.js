var ical = require('ical');

exports.gcal2json = function(req, res) {
	ical.fromURL(req.query.url, {}, function(err, data) {
		var ret = []
		var now = new Date();
		for (var k in data) {
			if (data.hasOwnProperty(k)) {
				var ev = data[k]
				if (ev.summary && ev.start) {
					var newev = {
						what : ev.summary,
						when : {
							begin : new Date(ev.start),
							end : new Date(ev.end)
						},
						where : ev.location
					}
					if (now < newev.when.begin)
						ret.push(newev);
				}
			};
		}
		function sortev(a, b) {
			return (b.when.begin - a.when.begin);
		}


		ret.slice()
		res.json(ret.sort(sortev));
	});
} 