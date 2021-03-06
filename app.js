
/**
 * Module dependencies.
 */

var express = require('express'),
gallery = require('node-gallery'),
routes = require('./routes'),
partials = require('express-partials'),
ejs = require('ejs').__express,
ghost = require('ghost'),
path = require('path');


bodyParser = require('body-parser');

http = require('http'),
util = require('util');

var app = express(),
port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
host = process.env.HOSTNAME || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
views = __dirname + '/views';
app.use(require('less-middleware')(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use('/blog/wp-content', express.static(__dirname + '/public/wp-content'));
app.use(bodyParser());


ghost({ config : path.join(__dirname, 'ghostConfig.js') }).then(function (ghostServer) {
  app.use('/blog', function(req, res, next){
    if (req.path.indexOf('/ghost')>-1 && process.env.PATH.indexOf('heroku')>-1){
      return res.send(401).end('Nope');
    }
    return next();
  }, ghostServer.rootApp);
  ghostServer.start(app);

  // Setup the rest of the application
  app.use(partials());
  app.use('/gallery', gallery({urlRoot: 'gallery', staticFiles: '/public/photos', title : 'Gallery', render : false}), routes.gallery);
  app.engine('.ejs', ejs);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', routes.index);
  app.get('/home', routes.index);
  //app.get('/blog', routes.blog);
  app.get('/talks', routes.talks);
  app.get('/beers', routes.beers);
  app.get('/contact', routes.contact);
  app.get('/cv', routes.cv);
  app.get('/gallery*', routes.gallery);
  app.get('/talks', routes.talks);

});


app.listen(port, host, function(){
  console.log("Express server listening on port " + port);
});
