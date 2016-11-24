var db = require('../models');

  // POST songs sprint 3 ('api/albums/:albumId/songs');
  function create(req, res) {
    db.Album.findById(req.params.albumId, function(err, foundAlbum) {
      console.log(req.body);
      var newSong = new db.Song(req.body); //dangerous, in real app we'd validate incoming data. this bypasses that.
      foundAlbum.songs.push(newSong);
      foundAlbum.save(function(err, savedAlbum) {
        console.log('newSong created: ', newSong);
        res.json(newSong); // responding with just the song, some APIs may respond with parent objects
      });
    });
  }


  module.exports = {
    create: create
  }
