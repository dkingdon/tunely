/************
 * DATABASE *
 ************/
var db = require('../models');
// GET /api/albums

  function index(req, res) {
    db.Album.find(function ( err, album ){
      if (err){
        console.log (err);
      }
      res.json(album);
    });
  }

  function create(req, res) {
    console.log('body', req.body);
    // splits at commas and removes trailing space
    var genres = req.body.genres.split(',').map(function (item) {
      return item.trim();
    })
    req.body.genres = genres;

    db.Album.create(req.body, function (err, album) {
      if (err) { console.log ('error', err); }
      console.log(album);
      res.json(album);
    })
  }
  // This shows the new song ?? NOTE: could be wrong. Part of sprint 3: step 7.
  function show(req, res) {
    db.Album.findById(req.params.albumId, function( err, foundAlbum) {
      if (err);
        console.log('albumsController.show responded with', foundAlbum);
        res.json(foundAlbum);
    });
  }

  function destroy(req, res) {
    // FILL ME IN !
  }

  function update(req, res) {
    // FILL ME IN !
  }


  // export public methods here
  module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    update: update
  };
