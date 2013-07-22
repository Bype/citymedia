/*
 * GET home page.
 */

var admin = require('./admin');
var trans = require('./translator');

module.exports = function(app) {
	app.get('/project/list', admin.projectlist);
	app.post('/project/add', admin.projectadd);
	app.post('/project/:id/add', admin.moduleadd);
	app.get('/project/:id/del/:idx', admin.moduledel);
	app.get('/project/:id/list', admin.modulelist);
	app.get('/project/del/:id', admin.projectdel);
	app.get('/gcal2json', trans.gcal2json);
	app.get('/rss2json', trans.rss2json);
	app.get('/twitter2json', trans.twitter2json);
	app.get('/facebook2json', trans.facebook2json);
}
