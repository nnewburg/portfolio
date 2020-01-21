//function to make the date of my cover letter dynamic and reflect the current date

 $(function( $ ){

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let today = new Date();
let date = today.getFullYear()+' '+(monthNames[today.getMonth()])+' '+today.getDate();

$('#cvDate').text(date);
$('#dayPrefix').text(suffixGen(today.getDate()));
})

 function suffixGen(day){

  if(day % 10  == 1){
    return "st"
  } else if (day % 10  == 2){
     return "nd"
  } else if (day % 10  == 3){
     return "rd"
  } else {
    return "th"
  }

 }