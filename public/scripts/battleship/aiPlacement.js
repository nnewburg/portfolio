$(function() {
$('body').on('click', '#startGame', function(){

  let oppBoard = []

  for(let i = 0; i < 10; i++){
    oppBoard[i] = [];
    for(let k = 0; k < 10; k++){
      oppBoard[i][k] = 0;
    }
  }


    function placeShip(size){

    let flag = true;
    let goodPlacement = true;

      while(flag){
          let direction = Math.floor(Math.random() * 2);
          let col = Math.floor(Math.random() * 10)
          let row = Math.floor(Math.random() * 5)

          if(direction == 0){
            for(let j = 0; j < size; j ++){
                if(oppBoard[col][row + j] == 1){
                  goodPlacement = false;
                }
              }
          } else {
            for(let j = 0; j < size; j ++){
                if(oppBoard[row + j][col] == 1){
                  goodPlacement = false;
                }
              }
          }

      if(goodPlacement){
          for(let i = row; i < (size + row); i++ ){
              if(direction == 0){
                 oppBoard[col][i] = 1;
              }else{
                  oppBoard[i][col] = 1;
              }

          }
        flag = false;
      }

      goodPlacement = true;
    }
  }





  // function placeShip(size){


  //   let direction = Math.floor(Math.random() * 2);
  //   let col = Math.floor(Math.random() * 10)
  //   let row = Math.floor(Math.random() * 5)

  //   for(let i = row; i < size + row; i++ ){
  //     if(direction == 0){
  //       if(oppBoard[col][i] == 0){
  //         oppBoard[col][i] = 1;
  //       } else {
  //           // placeShip(size)
  //       }
  //     }else{
  //       if(oppBoard[i][row] == 0){
  //         oppBoard[i][row] = 1;
  //       } else {
  //         // placeShip(size)
  //       }
  //     }

  //   }

  // }

  placeShip(5);
  placeShip(4);
  placeShip(3);
  placeShip(3);
  placeShip(2);

  $('#startGame').html("Player's turn - click an Opponent's tile");
    $('body').on('click', '.boardTileOpp', function(){
      if($('#startGame').html() == "Player's turn - click an Opponent's tile"){
      let target = $(this).attr('id');
      target = target.replace(/[A-Za-z]/g, '');
      target = Number(target)
      let firstDigit = Math.floor(target/10)
      let secondDigit = target % 10;
        if(oppBoard[firstDigit][secondDigit] == 1){
          $(this).css('backgroundColor', 'red')
        } else {
          $(this).css('backgroundColor', 'green')
        }
      $('#startGame').html("AI Turn - click for AI to take a shot");
      }
    });
  });





});