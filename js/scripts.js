function PigDice(name){
  this.name = name;
}
var dieOne = 0;
var dieTwo = 0;
var tempScore = 0;
var player = true;
var playerOneScore = 0;
var playerTwoScore = 0;
var doubles = false;
// var compScore = 0;

PigDice.prototype.rollDie = function(min, max) {
  return Math.random() * (max - min);
}

PigDice.prototype.roll = function(){
  var dieOne = Math.ceil(dice.rollDie(1, 7));
  var dieTwo = Math.ceil(dice.rollDie(1, 7));
  console.log(dieOne, dieTwo);
  if (doubles) {
    $("button#hold").prop("disabled", false);
    doubles = false;
  }
  if (dieOne === 1 && dieTwo === 1) {
    tempScore = 0;
    if (player) {
      playerOneScore = 0;
      $("#playerOneResults").html(" 0");
    } else if (!player) {
      playerTwoScore = 0;
      $("#playerTwoResults").html(" 0");
    }
      player = !player;
      $("#rolledResult").html("snake eyes and lost all your points!");
  } else if (dieOne === 1 || dieTwo === 1) {
    tempScore = 0;
    player = !player;
    $("#rolledResult").html("1!");
  } else if (dieOne === dieTwo) {
    tempScore += (dieOne + dieTwo);
    $("currentScore").html();
    $("#rolledResult").html("doubles, " + dieOne + " and " + dieTwo + " Roll again!");
    $("button#hold").prop("disabled", true);
    doubles = true;
  } else {
    tempScore += (dieOne + dieTwo);
    $("#rolledResult").html((dieOne.toString()) + " and " + dieTwo.toString())
  }
  return tempScore;
}
PigDice.prototype.hold = function(){
  if (player) {
    playerOneScore += tempScore;
    player = !player;
    tempScore = 0;
    $("#currentScore").html("");
    if (playerOneScore >= 100) {
      $(".results").html("<p>" + name1 + " Wins!</p><br>");
      $("button#reset").show();
    } else {
      return playerOneScore;
    }
  } else if (!player) {
    playerTwoScore += tempScore;
    player = !player;
    tempScore = 0;
    $("#currentScore").html("");
    if (playerTwoScore >= 100) {
      $(".results").html("<p>" + name2 + " Wins!</p><br>");
      $("button#reset").show();
    } else {
      return playerTwoScore;
    }
  }
}

var dice = new PigDice("player");
var name1 = "";
var name2 = "";

$(document).ready(function(event){

  $("button#names").click(function(event){
    event.preventDefault();
    name1 = $("#playerOne").val();
    name2 = $("#playerTwo").val();
    $("#scoreName1").html(name1);
    $("#scoreName2").html(name2);
  });

  $("button#roll").click(function(event){
    event.preventDefault();
    if (player) {
      $("#currentPlayer").html(name1 + ": ");
    } else if (!player) {
      $("#currentPlayer").html(name2 + ": ");
    }
    $("#currentScore").html(dice.roll());
  });

  $("button#hold").click(function(event){
    event.preventDefault();
    console.log("held");

    if (player) {
      $("#currentPlayer").html(name2 + ": ");
      $("#playerOneResults").html(" " + dice.hold());
    } else if (!player) {
      $("#currentPlayer").html(name1 + ": ");
      $("#playerTwoResults").html(" " + dice.hold());
    }
  });

  $("button#reset").click(function(event){
    event.preventDefault();
    location.reload(true);
  });
});
