   

//  This code will run as soon as the page loads.
//window.onload = function() {

  //  Click events are done for us:
  // $("#start").click(stopwatch.start);
  // $("#start").click(timer.start);
  // $(".btn").click(stopwatch.reset);
  // $(".btn").click(changeColor);
  // $("#summit").click(timer.stop);
  // $("#summit").click(stopwatch.stop);

//};

$(document).ready(function() {

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Data Section
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//creat an array to store a list of players, positions, and list
var playerList = ["Tom Brandy","Antonio Brown","Carson Wentz","Julio Jones","Le'Veno Bell","Todd Gurley","Aaron Donald","Drew Brees",
"Von Miller","Aaron Rodgers","Russell Wilson","Luke Kuechly","DeAndre Hopkings","Calais Campbell","Rob Gronkowski",
"Khalil Mack","Jalen Ramsey","Ben Roethlisberger","Everson Giffen","Alvin Kamara"]

var positionList = ["QB","WR","QB","WR","RB","RB","DT","QB","LB","QB","LB","QB","QB","LB","WR","DE","TE","CB","QB","DE"]

var teamList = ["Patriots","Steelers","Eagles","Falcons","Steelers","Rams","Rams","Saints","Broncos","Packers","Seahawks","Panthers",
"Texans", "Jaguars","Patriots","Raiders","Jaguars","Steelers","Vikings","Saints"]

//using api to creat array that hold images of players

var gifList = [];

for(i=0;i<playerList.length;i++){
//using ajax method to source the gif
//define queryURL, using the player list
search = playerList[i] + " " + teamList[i];
queryURL =  "https://api.giphy.com/v1/gifs/search?api_key=oCj4VUafjzbNv3DPReKh1767b1zmv0QE&q="+search+"&limit=1&offset=0&rating=G&lang=en";
$.ajax({
    url: queryURL,
    method: "GET"
   }).then(function(response) {
//console.log(response.data["0"].images.original.url);
      var giflink = response.data["0"].images.original.url;
      gifList.push(giflink);
     // console.log(giflink);
   });
}

//There are 3 type of questions, namebyGif, teambyGif, positionbyGif;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Basic functions will be called
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//creat a function that change the background image
function changeBackground(){
  $("body").css("background-image","url('assets/images/Qbackground.jpg'")
  console.log("background should change")
}



//creat function used to generate random array of length without repetting, also including a;
function shuffle(array) {
    var i = array.length,
    j = 0,
    temp;
while (i--) {

    j = Math.floor(Math.random() * (i+1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
     return array;
}


//creat a function that return N elements of the random array, including Key element with index, N is the lenth of Array
function randomArray(array,key,N){
     var newRandomArray = [];
     newRandomArray.push(key);
     for(i=0;i<array.length;i++){
          if(array[i]!=key){
              newRandomArray.push(array[i]);
           }
           if(newRandomArray.length==N){
              break;
           }
      }

      if( newRandomArray.length > N){
        newRandomArray = newRandomArray.pop();
      }

      return newRandomArray;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Showing the question
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var choice;
var q1=$("<h2>").text("Who's this player associated the picture below?");
var q2=$("<h2>").text("Which team is related in the picture?");
var q3=$("<h2>").text("what position is the picture indicating?");
// key is the index of playerlist, will be linked through all the functions
var key;

function namebyGif(){
$(".question").append(q1);
}

function teambyGif(){
$(".question").append(q2);
}

function positionbyGif(){
$(".question").append(q3);
}

//creat a function randomly pickup a type of question;
function quesSelector(){
//clear the previous qustion;
    $(".question").empty();
    choice = Math.floor(Math.random()*3);
    if(choice==0){namebyGif();}
    if (choice==1){teambyGif();}
    if (choice==2){positionbyGif();}
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Showing pictures
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//randomly select a gif from the gifList,show in the gif div, name the function randomGif
function randomGif(){
    $(".gif").empty();
    $(".gif").attr("id","quesGif");
    key = Math.floor(Math.random()*10);
    console.log("The key index being selected is")
    console.log(key);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    var playerGif = $("<img>").attr("src", gifList[key]);
    playerGif.css("width","40%")
    playerGif.css("margin-left","30%")
    playerGif.css("margin-top","30px")
    $(".gif").append(playerGif);
    console.log("The name of that player should be")
    console.log(playerList[key]);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//creat function to show the choices of selections.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function answerSection(){
  var randPalyers = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  console.log("generate random array of length without repetting")
  console.log(randPalyers);
  console.log("Before randomListIndex the Key is")
  console.log(key);
// var answerIndex = randomListIndex(key,randPalyers);
// console.log("return the index of key of the random array")
// console.log(answerIndex);
  var answerRandomArray = randomArray(randPalyers,key,4);
  console.log("return N elements of the random array, including Key element with index")
  console.log(answerRandomArray)

//call shuffle again to make the answer list random;
  var answerListRandom = shuffle(answerRandomArray);
  console.log("call shuffle again to make the answer list random")
  console.log(answerListRandom);

//using for loop to creat butns and add aribute, also add classes  
for (i=0;i<4;i++){
  var n = answerListRandom[i];
  var answerText;

  if(choice == 0 ){
   answerText = playerList[n];
  }
  if(choice == 1 ){
   answerText = teamList[n];
  }
  if(choice == 2){
   answerText = positionList[n];
  }

  var answerButn = $("<button>");

  answerButn.text(answerText);
  answerButn.attr("data-answer",answerText);

  answerButn.addClass("answerButton");
  $("#buttons").append(answerButn);

 }

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Select a answer
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//1.Make a select effect, using toggle method, registered on buttons
// ++++++++++++++++++++++++ Not Working +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function clickonButn(){
  $(this).toggleClass(".pressed");
  console.log("trigered");
}

//2.Get the value of selected object

function buttonValue(){
  var val = $(this).attr("data-answer")
  console.log("value worked "+val)
  console.log(this)
  return val
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Set Time Out Function
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= 
//Creat a timeout function to negative page if time out
//Creat a timeout function on the result page to question page
var qTimeout;
var rTimeout;
function changePage(R){
  if ( R==1 ){
    startButtn();
    clearTimeout(rTimeout);
  }
  if ( R==0 ){
    resultPage(0);
    clearTimeout(qTimeout);
  }
}

//Creat a function that when click on button start 


function startButtn(){
  changeBackground();
    quesSelector();
    randomGif();
    answerSection();
    $("h1").remove();
    $("h3").remove();
    qTimeout = setTimeout(changePage(0),5000);
}

 

 //Creat a function to show a result page 
 function resultPage(R){

  $(".question, .gif").empty();
  $("#buttons").empty();
  $("#timer").empty();
  $("body").css("background-image","url('assets/images/Rbackground')")
  var resultGif = $("<img>");
  var resultText = $("<p>");
  //the following if statements changes gif for different results
   if (R==1){ 
    resultGif.attr("src","https://gfycat.com/gifs/detail/accomplishedwillinggrouper");
    resultText.text("SCORED")
   }

   if (R==0){ 
    resultGif.attr("src","https://giphy.com/gifs/life-minute-tough-x6idyrAkU722Q");
    resultText.text("YOU DROPPED BALL")
   }

   $(".question").append(resultText);
   $(".gif").append(resultGif);

   qTimeout = setTimeout(changePage(1),2000);

 }
//creat a function to tell if the answert is creat 
function trueOrnot(){
  var value = this.attr("data-answer");
  
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Stop Watch
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
// prevents the clock from being sped up unnecessarily
var clockRunning = false;


//  Our stopwatch object.
var stopwatch = {

  time: 0,

  reset: function() {

    stopwatch.time = 0;

    $("#timer").text('00:05');

  },

  start: function() {

    //  TODO: Use setInterval to start the count here and set the clock to running.
    
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      console.log("Started")
      console.log(intervalId)
    }

  },

  stop: function() {
      clearInterval(intervalId);
      console.log("stopped")
      console.log(intervalId)

    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.

  },

 
  count: function() {
    //  TODO: increment time by 1
    stopwatch.time++;
    
    var timeRemain = stopwatch.timeCountdown(stopwatch.time);
    $("#timer").text(timeRemain);

  },

  
  timeCountdown: function(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = '00';
    var seconds = 7-t;
    if (seconds<0){
      stopwatch.stop();
      seconds = "00";
    }
     seconds = "0" + seconds;
  
    return minutes + ":" + seconds;
  }

}


$("#start").click(startButtn);
$("#start").click(stopwatch.start)
$("button").click(clickonButn);
$(".answerButton").click(buttonValue);

});
