var express = require('express');
var app = express();
var ejs	= require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./app/routes/routes.js');

/**
 * Set the port
 */
var port = process.env.PORT || 3000;

/**
 * Rendering engine
 */

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('Views', __dirname + '/Public/Views');

/**
 * Definition of middlewares
 */
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/Public'));

app.get('*', function(req, res){
     res.sendfile('./Public/index.html'); // load our public/index.html file
});
app.post('/contact/mail', routes.contactMail);

var server = app.listen(port, function(){
	var host = server.address().address;
	
	console.log('Server app at http://%s:%s', host, port);
})

// expose app           
exports = module.exports = app;  