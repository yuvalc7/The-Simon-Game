var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function (event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequnce();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function nextSequnce() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("." + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(() => {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // check the recent answer same as game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log(
      userClickedPattern[currentLevel] + " , " + gamePattern[currentLevel]
    );
  }
  //if user wrong
  else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over, press any key to restart");
    startOver();
  }
  // check if the user finish sequence correctly
  if (currentLevel + 1 === level) {
    userClickedPattern = [];
    setTimeout(function () {
      nextSequnce();
    }, 1000);
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
  userClickedPattern = [];
}
