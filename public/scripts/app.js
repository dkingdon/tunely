

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

    // modal click event handler for add song sprint 4
    $('#albums').on('click', '.add-song', handleAddSongClick);

    //save song modal save button sprint 3
    $('#saveSong').on('click', handleNewSongSubmit);

    //Delete button Sptrint 4
    $('#albums').on('click', '.delete-album', handleDeleteAlbumClick);

    // Edit album & save. Sprint 5
    $('#albums').on('click', '.edit-album', handleEditAlbumClick);
    $('#albums').on('click', '.save-album', handleSaveChangesClick);

}); //END OF - document ready function

    // Edit button handler sprint 5.
  function handleEditAlbumClick (e) {
    console.log('edit album button was pressed');
    var $albumRow = $(this).closest('.album');
    var albumId = $albumRow.data('album-id');
    console.log('album id: ', albumId);

    // shows save changes button note: needs to be hidden in html
    $albumRow.find('.save-album').toggleClass('hidden');
    // hides the edit button
    $albumRow.find('.edit-album').toggleClass('hidden');

    //get the album name and replaces ots field with input eleement.
    var albumName = $albumRow.find('span.album-name').text();
    $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName +  '"></input>');

    // Gets artist name and replaced its field with an input eleement
    var artistName = $albumRow.find('span.artist-name').text()
    $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

    // Gets the release date and replaces its field with an input eleement
    var releaseDate = $albumRow.find('span.album-releaseDate').text();
    $albumRow.find('span.album-releaseDate').html('<input class="edit-album-releaseDate" value="' + releaseDate + '"></input>')
  }

  // save changes handler string 5.
  function handleSaveChangesClick(e) {
    var albumId = $(this).parents('.album').data('album-id');
    var $albumRow = $('[data-album-id=' + albumId + ']');

    //gets data in fields note, need to make sure naming cnventions of the models are honored.
    var data = {
      name: $albumRow.find('.edit-album-name').val(),
      artistName: $albumRow.find('.edit-artist-name').val(),
      releaseDate: $albumRow.find('.edit-album-releaseDate').val()
    };
    console.log('PUTing data for album', albumId, 'with data', data);

    $.ajax({
      method: 'PUT',
      url: '/api/albums/' + albumId,
      data: data,
      success: handleAlbumUpdateResponse
    });
  }
    // handles update response sprint 5
  function handleAlbumUpdateResponse(data) {
      console.log('response to date', data);
      var albumId = data._id;
      //scratch this album from page
      $('[data-album-id=' + albumId + ']').remove();
      // and then re-draw it with the updates
      renderAlbum(data);
    }


  //Delete button onclick function sprint 4.
  function handleDeleteAlbumClick(e) {
    console.log('The delete button was pressed')
    // looks for the closest parent which is .albums and grabs the data which is the ID here
    var albumId = $(this).parents('.album').data('album-id');
    console.log('album id = ', albumId);
    $.ajax({
      url: '/api/albums/' + albumId,
      method: 'DELETE',
      success: handleDeleteAlbumSuccess
    })
  }

  function handleDeleteAlbumSuccess (data) {
    var deletedAlbumId = data._id;
    console.log('removing the folling album: ', deletedAlbumId);
    $('div[data-album-id= ' +deletedAlbumId + ']').remove();
  }

  // Handle click event add song button - sprint 3
  function handleAddSongClick(e) {
    console.log('add-song clicked');
      // looks for the closest instance of .album and grabs the data. this is important to keep in mind when using handlbars because handlebars makes multiple instances of each section. this is how you identify a single one
    var currentAlbumId = $(this).closest('.album').data('album-id');
    console.log("id =", currentAlbumId );
      //Setting data id attribute to modal
    $('#songModal').data('album-id', currentAlbumId);
    $('#songModal').modal();
  };

  // Handles new song modal submit
  function handleNewSongSubmit(e) {
    e.preventDefault();
      //finds modal fields
    var $modal = $('#songModal');
    var $songNameField = $modal.find('#songName');
    var $trackNumberField = $modal.find('#trackNumber');

      // gets data from modal fields
      // note: the server expects keys to be 'name' & 'trackNumber'.
    var dataToPost = {
      name: $songNameField.val(),
      trackNumber: $trackNumberField.val()
    };

    var albumId = $modal.data('albumId');
    console.log('retrieved songName:', songName, ' and trackNumber ', trackNumber, ' for album id: ', albumId);
    // POST's to server
    var songPostToServerUrl = '/api/albums/' + albumId + '/songs';
    $.post(songPostToServerUrl, dataToPost, function(data) {
      // Clears form
      $songNameField.val('');
      $trackNumberField.val('');

      //close modal
      $modal.modal('hide');
      // update the current instance of the album from page
      $.get('/api/albums/' + albumId, function(data) {
        // removes current instance of the album from the page
        $('[data-album-id=' + albumId + ']').remove();
        // rerender it with new album data (including songs)
        renderAlbum(data);
      });
    }).error(function(err) {
      console.log('post to /api/albums/:albumId/song resulted in error', err);
    });
  }


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
