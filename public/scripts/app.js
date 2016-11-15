


/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

  $.get({
    method: 'GET',
    url: '/api/albums',
    type: 'json',
    success: albumGetSuccess,
    error: function( err ){
      console.log("there was an error")
    }
  })

  // $.get('/api/albums').success(function (albums) {
  //   albums.forEach(function (album) {
  //     renderAlbum(album);
  //   })
  // })
  //   sampleAlbums.forEach(function (e) {
  //     renderAlbum(e);
  // });




}); //END OF - document ready function

function albumGetSuccess (json){
  var receivedAlbums = json.albums;
  console.log(receivedAlbums);
  receivedAlbums.forEach(function renderOneAlbum (album) {
    renderAlbum(album);
  });
}

  // this function takes a single album and renders it to the page
function renderAlbum(album) {
  /* - - - Handlebars - - - */
  var source = $('#hb-template-script').html(); // Pulling html structure
  var template = Handlebars.compile(source); // Sending html to compiler
  var albumResultsHtml = template(album); // Grabbing data from source and storing it in variable;
  $('#albums').prepend(albumResultsHtml); //Inserts templated html on page
  console.log('rendering album:', album);
}
