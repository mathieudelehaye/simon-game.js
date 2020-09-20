var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = true;
var playerSequenceIndex = 0;

// handle player button press
$(".btn").click(function(event) {

  if (!gameOver) {

    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    checkAnswer(userChosenColour);

  }

});

// handle key press and reset game
$(document).keypress(function(event) {
  // console.log(event.key);
  if (gameOver) {

    startOver();
    $("h1").text("Level 0");
    nextSequence();

  }
});

// game finds next colour
function nextSequence() {

  // increase level on screen
  level++;
  $("h1").text("Level " + level);

  // game select a random colour
  var randomNumber = Math.random();
  randomNumber *= 4;
  randomNumber = Math.floor(randomNumber); // random number between 0 and 3
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  // console.log($("#"+randomChosenColour));

  // colour is added to game pattern
  gamePattern.push(randomChosenColour);

  // last colour button is animated and a sound is played
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // reset player sequence for the next level:
  userClickedPattern = [];
  playerSequenceIndex = 0;
}

// animate button pressing
function animatePress(buttonName) {

  $("#" + buttonName).addClass("pressed");

  setTimeout(function() {
    $("#" + buttonName).removeClass("pressed");
  }, 100);

}

// play a sound
function playSound(name) {

  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();

}

// check the answer
function checkAnswer(userChosenColour) { // check player clicked pattern against the game one:
  if (userChosenColour == gamePattern[playerSequenceIndex]) {

    // console.log("well done");

    // animate button and play sound
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if (playerSequenceIndex == gamePattern.length - 1) {
      // player has correctly completed the sequence, wait timeout and go to the next level

      setTimeout(function() {
        nextSequence();
      }, 1000);

    } else {
      // increment sequence index as sequence is not finished

      playerSequenceIndex++;

    }

  } else {
    // player has lost, play sound, change temporarily body style and reset game

    playSound("wrong");

    $("body").addClass("game-over ");
    setTimeout(function() {
      $("body").removeClass("game-over ");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    gameOver = true;

  }

}

// restart the game
function startOver() {

  level = 0;
  gamePattern = [];
  gameOver = false;
  userClickedPattern = [];
  playerSequenceIndex = 0;

}
