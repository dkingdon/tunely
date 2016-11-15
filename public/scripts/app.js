

$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    type: 'json',
    success: albumGetSuccess,
    error: function( err ){
      console.log("there was an error")
    }
  })




}); //END OF - document ready function

function albumGetSuccess (json){
  var receivedAlbums = json;
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
