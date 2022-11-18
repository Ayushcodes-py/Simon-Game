var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

$(document).click(function(){
    if (!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
    }
})

function nextSequence(){
    level = level  + 1;
    $("#level-title").text("Level " + level);
    userClickPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);

    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
}

function checkGame(currentIndex){
    if(userClickPattern[currentIndex]===gamePattern[currentIndex]){
        console.log("success")
        if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        playSound("wrong");
        setTimeout(function(){
            restart();
        },1000);
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currenColor){
    $("#" + currenColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currenColor).removeClass("pressed");
    },100);
}

function gameCheck(currenIndex){
    if (gamePattern[currenIndex]==userClickPattern[currenIndex]){
        started = true;
    }
    else {
        started = false;
    }
}

$(".btn").click(function(){
   
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);    
    checkGame(userClickPattern.length-1);
})


function restart(){
    $("h1").text("Game Over! Score : "+ level+" Press Any key to restart");
    level = 0;
    gamePattern = [];
    userClickPattern = [];
    started = false;
}


