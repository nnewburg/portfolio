 $(function( $ ){

$("#slideshow > div:gt(0)").hide();

console.log("coding hard")
setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
}, 3000);

})