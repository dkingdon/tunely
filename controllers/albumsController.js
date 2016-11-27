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
  // sprint 4
  function destroy(req, res) {
    console.log(req.body);
    db.Album.findOneAndRemove({ _id: req.params.albumId }, function ( err, foundAlbum) {
      if (err) {
        console.log('deleting album controller failed', err);
      }
      res.json(foundAlbum);
    })
  }

  // sprint 5
  function update(req, res) {
    console.log('updating with data', req.body);
    db.Album.findById(req.params.albumId, function (err, foundAlbum) {
      if(err) {
        console.log('albumnsController.update error', err);
      }
      foundAlbum.artistName = req.body.artistName;
      foundAlbum.name = req.body.name;
      foundAlbum.releaseDate = req.body.releaseDate;
      foundAlbum.save(function (err, savedAlbum) {
        if (err) {
          console.log('saving edited album failed');
        }
        res.json(savedAlbum);
      });
    });
  }


  // export public methods here
  module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    update: update
  };
