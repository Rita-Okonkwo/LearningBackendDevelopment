var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedSequence = [];
var level = 0;

$(document).on("keydown", nextSequence);

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedSequence.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedSequence.length - 1);
})

function nextSequence() {
    userClickedSequence = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var selectedButton = $("#" + randomChosenColor);
    selectedButton.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $(document).unbind();
    $("h1").text("Level " + level);
    level += 1;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedSequence[currentLevel] === gamePattern[gamePattern.length - 1]) {
        if (userClickedSequence.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, press any key to restart");
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    $(document).on("keydown", nextSequence);
}