var ical = require('ical');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/citymedia", {
	safe : false
})

db.bind('cache');

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
	db.cache.findOne({
		info : req.query.url,
		type : "rss"
	}, function(err, cFeed) {
		if (!cFeed) {
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
				var feed = {
					title : title,
					items : ret,
					info : req.query.url,
					type : "rss"
				};
				db.cache.insert(feed, function(err, data) {
					res.json(feed);
				});
			}));
		} else {
			console.log(req.query.url + " is cached");
			res.json(cFeed);
		}
	});
};

var OAuth = require('oauth');
var oauth = new OAuth.OAuth('https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token', 'naiJZ2uUGP4HjpLhMe5rw', 'vsIufN7mBaCrLVYx7OjkecHruMr1JmJeXkD3OYiK41I', '1.0A', null, 'HMAC-SHA1');

exports.twitter2json = function(req, res) {
	db.cache.findOne({
		info : req.query.q,
		type : "twitter"
	}, function(err, cFeed) {
		if (!cFeed) {
			oauth.get('https://api.twitter.com/1.1/search/tweets.json?count=8&q=' + req.query.q, '12613832-QoV1CORW5WTi2LS2DU0eBDLnx8NDGCPjUqMASOqdo', 'WgRu4n52AM9JE78Taupe6RxJgDvtG60lUzcFZjqvjI', function(e, data) {
				if (e)
					console.error(e);
				else {
					var feed = {
						info : req.query.q,
						data : data,
						type : "twitter"
					};
					db.cache.insert(feed, function(err, ret) {
						res.type('application/json');
						res.send(data);
					});
				};
			});
		} else {
			console.log(req.query.q + " is cached");
			res.type('application/json');
			res.send(cFeed.data);
		}
	});
};

exports.flickr2json = function(req, res) {
	var url = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + req.query.photosetid + '&per_page=12&format=json';
	db.cache.findOne({
		info : req.query.photosetid,
		type : "flickr"
	}, function(err, cFeed) {
		if (!cFeed) {
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var feed = {
						info : req.query.photosetid,
						data : body.slice(14, -1),
						type : "flickr"
					};
					db.cache.insert(feed, function(err, ret) {
						res.type('application/json');
						res.send(feed.data);
					});
				}
			});
		} else {
			console.log(req.query.photosetid + " is cached");
			res.type('application/json');
			res.send(cFeed.data);
		}
	});
};

exports.youtube2json = function(req, res) {
	var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCQsEOzxwht2kmbrg50e0TTTt7JVWR7f90&playlistId=' + req.query.playlistid;
	db.cache.findOne({
		info : req.query.playlistid,
		type : "youtube"
	}, function(err, cFeed) {
		if (!cFeed) {
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var feed = {
						info : req.query.playlistid,
						data : body,
						type : "youtube"
					};
					db.cache.insert(feed, function(err, ret) {
						res.type('application/json');
						res.send(feed.data);
					});
				}
			});
		} else {
			console.log(req.query.playlistid + " is cached");
			res.type('application/json');
			res.send(cFeed.data);
		}
	});
};

exports.vimeo2json = function(req, res) {
	var url = 'http://vimeo.com/api/v2/channel/' + req.query.channelid + '/videos.json';
	db.cache.findOne({
		info : req.query.channelid,
		type : "vimeo"
	}, function(err, cFeed) {
		if (!cFeed) {
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var feed = {
						info : req.query.channelid,
						data : body,
						type : "vimeo"
					};
					db.cache.insert(feed, function(err, ret) {
						res.type('application/json');
						res.send(feed.data);
					});
				}
			});
		} else {
			console.log(req.query.channelid + " is cached");
			res.type('application/json');
			res.send(cFeed.data);
		}
	});
};

exports.facebook2json = function(req, res) {
	var tokurl = 'https://graph.facebook.com/oauth/access_token?client_id=520332708022054&client_secret=308c4bbca0d8a7e9274592ae324cc98e&grant_type=client_credentials';
	request(tokurl, function(error, response, token) {
		url = 'https://graph.facebook.com/' + req.query.id + '?fields=id,name,posts.limit(8).fields(message,full_picture,link)&' + token;
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.type('text/javascript');
				res.send(body);
			}
		});
	});
};

