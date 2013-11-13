var ical = require('ical');

exports.gcal2json = function(req, res) {
	ical.fromURL(req.query.url, {}, function(err, data) {
		var ret = [];
		var now = new Date();
		for (var k in data) {
			if (data.hasOwnProperty(k)) {
				var ev = data[k];
				if (ev.summary && ev.start) {
					var newev = {
						what : ev.summary,
						when : {
							begin : new Date(ev.start),
							end : new Date(ev.end)
						},
						where : ev.location
					};
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
};

var FeedParser = require('feedparser'), request = require('request');

exports.rss2json = function(req, res) {
	var ret = [];
	var title;
	request(req.query.url).pipe(new FeedParser().on('error', function(error) {
		// always handle errors
	}).on('meta', function(meta) {
		title = meta.title;
	}).on('readable', function() {
		var stream = this, item;

		while ( item = stream.read()) {
			ret.push({
				title : item.title,
				description : item.description,
				pubdate : new Date(item.pubdate),
				link : item.link
			});
		}
	}).on('end', function() {
		res.json({
			title : title,
			items : ret
		});
	}));
};

var OAuth = require('oauth');
var oauth = new OAuth.OAuth('https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token', 'naiJZ2uUGP4HjpLhMe5rw', 'vsIufN7mBaCrLVYx7OjkecHruMr1JmJeXkD3OYiK41I', '1.0A', null, 'HMAC-SHA1');

exports.twitter2json = function(req, res) {
	oauth.get('https://api.twitter.com/1.1/search/tweets.json?count=8&q=' + req.query.q, '12613832-QoV1CORW5WTi2LS2DU0eBDLnx8NDGCPjUqMASOqdo', 'WgRu4n52AM9JE78Taupe6RxJgDvtG60lUzcFZjqvjI', function(e, data) {
		if (e)
			console.error(e);
		else {
			res.type('application/json');
			res.send(data);

		}
	});
}

exports.facebook2json = function(req, res) {
	var tokurl = 'https://graph.facebook.com/oauth/access_token?client_id=520332708022054&client_secret=308c4bbca0d8a7e9274592ae324cc98e&grant_type=client_credentials';
	request(tokurl, function(error, response, token) {
		url = 'https://graph.facebook.com/' + req.query.id + '?fields=id,name,posts.limit(8).fields(message,full_picture,link)&' + token;
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.type('application/json');
				res.send(body);
			}
		});
	});
}

