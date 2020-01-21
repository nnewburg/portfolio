//functionality to swap between the biography paragraphs, hiding one and showing the one associated with the button clicked

 $(function( $ ){

  $("#codingApt").hide();
  $("#personalityTra").hide();

  $("#bioText").text("My History");

  $( "#switchHist" ).click(function() {
    $("#codingApt").hide();
    $("#personalityTra").hide();
    $("#history").show();
    $("#bioText").text("My History");

  })

  $("#switchCoding").click(function() {
    $("#personalityTra").hide();
    $("#history").hide();
    $("#codingApt").show();
    $("#bioText").text("Coding Aptitude");
  })

  $( "#switchPersonality" ).click(function() {
    $("#codingApt").hide();
    $("#history").hide();
    $("#personalityTra").show();

    $("#bioText").text("Personal Traits");

  })

})
