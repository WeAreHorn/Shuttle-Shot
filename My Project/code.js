//Startup page
//From here the player can read the instructions, check their highscore, and play
setScreen("Startup");
//Highscore is the highest amount of points the player scored during their sesssion.
//Points is a number that increases and determines if certain events happen.
//Lives is the lives the player gets When the game starts and determines if the game ends.
var Highscore = 0;
var Points=0;
var Lives = 0;
setText("HighscoreDisplay", "Highscore: "+Highscore);
//After a player has restarted the game or is done looking at their Highscore 
//They can start the game
onEvent("ClickTS", "click", function( ) {
  //Switches to the game and gives the player three lives.
  friendlyMove();
  Lives = 3;
  setScreen("gamePage");
  //The "set texts" display the players points and lives which may change over time
  setText("Livesdisplay", "Lives: "+Lives);
  setText("Pointsdisplay", "Points: "+Points);
  //The set positions are to ensure that the user
  //recives a random playstyle every luanch
  setPosition("friendly0", randomNumber(-2, 237), randomNumber(4, 288));
  showElement("friendly0");
  setPosition("friendly1", randomNumber(-2, 237), randomNumber(4, 288));
  showElement("friendly1");
  setPosition("friendly2", randomNumber(-2, 237), randomNumber(4, 288));
  showElement("friendly2");
  setPosition("friendly3", randomNumber(-2, 237), randomNumber(4, 288));
  showElement("friendly3");
  setPosition("friendly4", randomNumber(-2, 237), randomNumber(4, 288));
  showElement("friendly4");
  setPosition("friendly5", randomNumber(-2, 237), randomNumber(4, 288));
  showElement("friendly5");
  setPosition("enemyShuttle", randomNumber(-2, 237), randomNumber(4, 288));
});
//From friendly 0-5, if any of the ships are clicked
//the player will loose a life/ "Live -1"
onEvent("friendly0", "click", function( ) {
  Endgame();
  //The "frinedlyHit" function is used to confirm the hit of 
  //a "friendlyShuttle". The parameter is what decides if a friendly disapears or not.
  friendlyHit("friendly0");
  friendlyMove();
});
onEvent("friendly1", "click", function( ) {
  Endgame();
  friendlyHit("friendly1");
  friendlyMove();
});
onEvent("friendly2", "click", function( ) {
  Endgame();
  friendlyHit("friendly2");
  friendlyMove();
});
onEvent("friendly3", "click", function( ) {
  Endgame();
  friendlyHit("friendly3");
  friendlyMove();
});
onEvent("friendly4", "click", function( ) {
  Endgame();
  friendlyHit("friendly4");
  friendlyMove();
});
onEvent("friendly5", "click", function( ) {
  Endgame();
  friendlyHit("friendly5");
  friendlyMove();
});
//This an enemy shuttle, it awards points for destroying/ clicking it.
onEvent("enemyShuttle", "click", function( ) {
  timedLoop(500, function() {
    if (getXPosition("enemyShuttle") >= (getXPosition("Hitbox") || getYPosition("hitboxY"))) {
      setPosition("enemyShuttle", 0, getYPosition("enemyShuttle"));
    } else {
      setPosition("enemyShuttle", getXPosition("enemyShuttle")+25, getYPosition("enemyShuttle")+randomNumber(-5, 5));
    }
  });
  Points = Points+250;
  extralife();
  Endgame();
  setText("Pointsdisplay", "Points: "+Points);
});
function friendlyMove() {
  Endgame();
  timedLoop(500, function() {
    if (getXPosition("friendly0") >= getXPosition("Hitbox")) {
      setPosition("friendly0", 0, getYPosition("friendly0"));
    } else if (getXPosition("friendly1") >= getXPosition("Hitbox")) {
      setPosition("friendly1", 0, getYPosition("friendly1"));
    } else if (getXPosition("friendly2") >= getXPosition("Hitbox")) {
      setPosition("friendly2", 0, getYPosition("friendly2"));
    } else if (getXPosition("friendly3") >= getXPosition("Hitbox")) {
      setPosition("friendly3", 0, getYPosition("friendly3"));
    } else if (getXPosition("friendly4") >= getXPosition("Hitbox")) {
      setPosition("friendly4", 0, getYPosition("friendly4"));
    } else if (getXPosition("friendly5") >= getXPosition("Hitbox")) {
      setPosition("friendly5", 0, getYPosition("friendly5"));
    } else {
      setPosition("friendly0", getXPosition("friendly0")+25, getYPosition("friendly0"));
      setPosition("friendly1", getXPosition("friendly1")+25, getYPosition("friendly1"));
      setPosition("friendly2", getXPosition("friendly2")+25, getYPosition("friendly2"));
      setPosition("friendly3", getXPosition("friendly3")+25, getYPosition("friendly3"));
      setPosition("friendly4", getXPosition("friendly4")+25, getYPosition("friendly4"));
      setPosition("friendly5", getXPosition("friendly5")+25, getYPosition("friendly5"));
    }
  });
}
function friendlyHit(Attackconfirm) {
  Lives = Lives-1;
  setText("Livesdisplay", "Lives: "+Lives);
  Endgame();
  if (Attackconfirm=="friendly0") {
    hideElement("friendly0");
    setPosition("friendly0", 0, getYPosition("friendly0"));
  } else if (Attackconfirm=="friendly1") {
    hideElement("friendly1");
    setPosition("friendly1", 0, getYPosition("friendly1"));
  } else if (Attackconfirm=="friendly2") {
    hideElement("friendly2");
    setPosition("friendly2", 0, getYPosition("friendly2"));
  } else if (Attackconfirm=="friendly3") {
    hideElement("friendly3");
    setPosition("friendly3", 0, getYPosition("friendly3"));
  } else if (Attackconfirm=="friendly4") {
    hideElement("friendly4");
    setPosition("friendly4", 0, getYPosition("friendly4"));
  } else if (Attackconfirm=="friendly5") {
    hideElement("friendly5");
    setPosition("friendly5", 0, getYPosition("friendly5"));
  } else {
    friendlyHit(Attackconfirm);
  }
}
function extralife() {
  //This function allows for a life to be restored or gained
  //in the event that the player looses one.
  if (Points%1000==0) {
    showElement("friendly0");
    showElement("friendly1");
    showElement("friendly2");
    showElement("friendly3");
    showElement("friendly4");
    showElement("friendly5");
    Lives = Lives+1;
    setText("Livesdisplay", "Lives: "+Lives);
  }
}
function Endgame() {
  var retryText = ["Give it a go!", "1 more time?", "ANOTHER ONE!", "Keep it up.", "So close yet..", "Almost had it", "Watch your shot?", "01101000 01101111 01110111 00111111"];
  if (Lives<=0) {
    setScreen("endGame");
    if (Points>=Highscore) {
      //If you last game had more points than the one before that
      //Your new highscore will be that # of points 
      Highscore = Points;
      setScreen("endGame");
      setText("endGametext", ("Highscore: "+Highscore+" NEW!")+"\n"+"Points this game: "+Points);
      setText("retryButton", retryText[randomNumber(0,retryText.length-1)]);
    } else {
      var almostHighscore = Highscore-Points;
      setScreen("endGame");
      setText("endGametext", ("Highscore: "+Highscore+"\n"+"Points this game: "+Points+"\n"+almostHighscore)+" More points for a new Highscore");
      setText("retryButton", retryText[randomNumber(0,retryText.length-1)]);
    }
  }
  onEvent("retryButton", "click", function( ) {
    setScreen("Startup");
    setText("HighscoreDisplay", "Highscore: "+Highscore);
    //Afterwards, points is reset to zero to start the next game
    Points = 0;
  });
}
