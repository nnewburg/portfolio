 $(function( $ ){

  $( "#CV" ).hide();

   $( "#switchCV" ).click(function() {
    $("#resume").hide();
    $( "#CV" ).show();

  })

  $( "#switchRes" ).click(function() {
      $("#CV").hide();
    $("#resume").show();
  })

})