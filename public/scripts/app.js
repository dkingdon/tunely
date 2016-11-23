

$(document).ready(function() {
  console.log('app.js loaded!');

  $.get('/api/albums').success(function (albums) {
    albums.forEach(function (album) {
      renderAlbum(album);
    })
  })
      /* - - - this is the long hand way of writing the above script - - - */
  // $.ajax({
  //   method: 'GET',
  //   url: '/api/albums',
  //   type: 'json',
  //   success: albumGetSuccess,
  //   error: function( err ){
  //     console.log("there was an error")
  //   }
  // });

  // Gets new album input from form
  $('#album-form form').on('submit', function (e){ // extra form is needed
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    /* - - - Posts info from form - - - */
    $.post('/api/albums', formData, function (album) {
      console.log('album after POST', album); // this logs it on the server, appearing on the node console.
      renderAlbum(album);
    });
    $(this).trigger('reset'); // Resets form after submit without reloading page
  });


}); //END OF - document ready function

function albumGetSuccess (json){
  var receivedAlbums = json;
  // console.log(receivedAlbums);
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
