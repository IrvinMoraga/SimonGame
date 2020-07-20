// Game Color Pattern
var gamePattern = [];

// Colors clicked by user
var userClickedPattern = [];

// Colors of the buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// Level of the game
var level = 0;

// Function choosing the next colour in the game pattern
function nextSequence() {
    // Array is reset ready for next level
    userClickedPattern = [];

    // Generating a random number from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);

    // Picking a random color using the number generated from nextSequence()
    var randomChosenColour = buttonColours[randomNumber];

    // Pushing the random chosen color to the game pattern
    gamePattern.push(randomChosenColour)

    // Variables to be passed as ID selector
    var idOfRandomColour = "#" + randomChosenColour;

    // Animating the random colour selected to flash 
    $(idOfRandomColour).fadeOut(200).fadeIn(100);

    // Playing the sound of the random color next in the sequence
    playSound(randomChosenColour);

    // Increments level
    level++;

    // Change title header according to level
    $("#level-title").text("Level " + level);
}

// Event Listener for Game Start
var gameStarted = false;

$(document).on("keydown", function() {
    while (!gameStarted) {
        gameStarted = true;

        nextSequence();
    }
})

$(".play").on("click", function() {
    while (!gameStarted) {
        gameStarted = true;

        nextSequence();
    }
});

$(".startOver").on("click", function() {
    startOver();
});

// Function for restarting game
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}


// Function for checking user answers
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }

    } else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Press Play Or Any Key to Restart");

        startOver();

    }
}


// Event Listener for button clicks
$(".btn").on("click", function(event) {
    // Pushes the colors that the user clicks to the userClickedPattern array
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    // Plays sound of the button the user clicks
    playSound(userChosenColour);

    // For button animation
    animatePress(userChosenColour);

    // Passes the index of the last color to checkAnswer()
    var lastUserIndex = userClickedPattern.length - 1;
    checkAnswer(lastUserIndex);
});


// Function for animating the button the user clicks
function animatePress(currentColour) {
    // Adds pressed class to the button
    var userChosenColour = "#" + currentColour;
    $(userChosenColour).addClass("pressed");

    // Removes pressed class to button after 100ms
    setTimeout(function() {
        $(userChosenColour).removeClass("pressed");
    }, 100)
}


// Plays the sound of the corresponding color button 
function playSound(name) {
    var soundFilePath = "sounds/" + name + ".mp3";
    var soundUserClick = new Audio(soundFilePath);
    soundUserClick.play();
}