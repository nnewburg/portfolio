//function for the AI to place their ships does this by adding a class to their grid called occupied ship


$(function() {
$('body').on('click', '#startGame', function(){


//creates a matrix so it can track if a cell is already occupied by a ship

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

    //while loop to continue attempting placing a ship if one has not been placed successfully
      while(flag){

        //randomly selecting if ship will be placed vertically or horizontally
        //as well as the starting cell of the ship's placement
          let direction = Math.floor(Math.random() * 2);
          let col = Math.floor(Math.random() * 10)
          let row = Math.floor(Math.random() * 5)

        //checks if the placement of the ship will occur on top of an already placed ship
        //if so a boolean data type will change to false
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

    //if the placement will not overlap a ship already placed the placement will occur
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

//run the function for the 5 ships in the game with varying length
  placeShip(5);
  placeShip(4);
  placeShip(3);
  placeShip(3);
  placeShip(2);

//takes the id of the tiles which are from 1-100 and retrieves coordinates that are
//two seperate one digit numbers to represent the cell clicked coordinates
//if the cell has an occupied ship the tile turns red. if unoccupied it turns green
//then the turns division changes to AI turn
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