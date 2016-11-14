var template; // Handlebars template variable


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

  /* - - - Handlebars - - - */
  var source = $('#hb-template-script').html(); // Pulling html structure
  template = Handlebars.compile(source); // Sending html to compiler


  /* - - - Handlebars Continued - - - */
  var albumResultsHtml = template({sampleAlbums}); // Grabbing data from source and storing it in variable
  $('#albums').append(albumResultsHtml);

}); //END OF - document ready function




// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

}
