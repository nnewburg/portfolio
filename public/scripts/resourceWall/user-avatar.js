console.log('hello from user-avatar.js');
 $(function( $ ){
  $('#avatar').change(function(e) {
    console.log("Something connected")
    $('#avatar-display').attr('src', event.target.value);
  })
});