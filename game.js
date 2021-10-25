var buttonColours = ["red","blue","purple","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var highscore = 0 ;
var started = false;
var level = 0;
$(".start-button").click(function(){
  if (started == false){
     $("#level-title").text("Level "+level);
     $(".HS").text( "HighScore :"+ highscore)
    nextSequence();
    started = true;

  }
})

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);

})

function nextSequence () {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    }

function playSound(name) {
   var audio = new Audio ("sounds/"+name+".mp3");
   audio.play();

}

function animatePress(currentColour){

    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
      $("."+currentColour).removeClass("pressed")},100
    )
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (highscore >= level){
          highscore;
    }else if (highscore < level){
      highscore++;
    }
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()},1000)


    }
  }
  else{
    console.log("wrong");
    var gameOver = new Audio ("sounds/wrong.mp3");
    gameOver.play();
    $(document.body).addClass("game-over");
    setTimeout(function () {
      $(document.body).removeClass("game-over")},200
    )
    $("#level-title").text("Game Over");

      startOver();



  }
}
function startOver(){
  level = 0;
  gamePattern=[];
  started = false;
}
