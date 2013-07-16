/*
 * GET home page.
 */

var admin=require('./admin');

module.exports = function(app) {
	app.get('/project/list', admin.projectlist);
	app.post('/project/add', admin.projectadd);
	app.post('/project/:id/add', admin.moduleadd);
	app.get('/project/:id/list', admin.modulelist);
	app.get('/project/del/:id', admin.projectdel);
}
