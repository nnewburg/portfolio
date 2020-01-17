 $(function( $ ){

  $("#codingApt").hide();
  $("#personalityTra").hide();

  $( "#switchHist" ).click(function() {
    $("#codingApt").hide();
    $("#personalityTra").hide();
    $("#history").show();

  })

  $("#switchCoding").click(function() {
    $("#personalityTra").hide();
    $("#history").hide();
    $("#codingApt").show();
  })

  $( "#switchPersonality" ).click(function() {
    $("#codingApt").hide();
    $("#history").hide();
    $("#personalityTra").show();

  })

})
