// SERVER-SIDE JAVASCRIPT

//requirements
var express = require('express');
var bodyParser = require('body-parser');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use(bodyParser.urlencoded({extended: true}));
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');
/***********
 * DATABASE *
 ***********/
var db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);
app.get('/api/albums', controllers.albums.index);
app.get('/api/albums/:albumId', controllers.albums.show)
app.post('/api/albums', controllers.albums.create);
app.post('/api/albums/:albumId/songs', controllers.albumSongs.create);
app.delete('/api/albums/:albumId', controllers.albums.destroy); // sprint 4
app.put('/api/albums/:albumId', controllers.albums.update); //sprint 5


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
