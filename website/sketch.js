
//set flag for button to switch between states
var flag;
function preload() {

//load stage of genocide from json-why is it working without ￼'var' and not working with it?
 stagesOfGen = loadJSON('stagesOfGenocide.json');
//load string from json that is being writter and reWritten by server
var creed= loadJSON('creed.json', showMe);
//I think I will have to set up an 'all' route in server js and then call the json on that as the live feed
var userExamples = loadJSON('words.json');
// console.log(stagesOfGen);
// console.log(creed);

}
function setup() {

  noCanvas();

  var containerAll = select('#stages');
  //make the container a row to create a grid be styled and formatted by materialize css
  containerAll.addClass('row')
  containerAll.id('containerAll')


//create a container to hold the names of each stage of genocide
var labelContainer = createElement('div', ' ');
labelContainer.id('labelContainer')

//run a loop through the stages of genocide data to create a label that is a link for each
  for (var i = 0; i < stagesOfGen.length; i++) {
  //create <a> element for each of the stages
  var a = createA('#', stagesOfGen[i].stage+ '<br>');

  //just adding a space
  createSpan(' ');

  //assign a class of wordElement to each
  a.addClass('wordElement');
  // console.log(stagesOfGen[i]);


  // Pair the DOM element with the word
  // and set-up the events in a closure
  canvasAppear(a,i);

  // Just putting a space
  a.parent(labelContainer);
  labelContainer.addClass("col s5");
  labelContainer.parent(containerAll);
}
  function canvasAppear (elt, word) {
  //are 'elt' and 'word' javascript elements, or just placeholders for arguments?

  //display the info when the mouse is clicked
  elt.mousePressed(displayInfo);
  // console.log(word);

  // This happens later, when the user clicks the mouse
  // So all of the variables within scope are maintained for
  // when it is called.  Closure magic!
  function displayInfo() {
  flag = false;

  // var container = createElement('div', ' ');
  var containerTwo = createElement('div', ' ');
  var containerThree = createElement('div', ' ');

  containerTwo.addClass("col s3");
  containerThree.addClass("col s4");
  containerTwo.id("containStageTwo");
  containerThree.id("containStageThree");

  var button = createButton('close');
  button.position(windowWidth/2-200, windowHeight/1.5)
  button.mousePressed(showHide)
 button.id('myButton');


  var characteristicsTitle = createElement('h2', 'Characteristics:');
  var characteristicsLine = createElement('p', stagesOfGen[word].characteristics);

  var preventativeMeasuresTitle = createElement('h2', 'Preventive Measures:');
  var preventativeMeasuresLine = createElement('p', stagesOfGen[word].preventive_measures);


  characteristicsTitle.parent(containerTwo);
  characteristicsLine.parent(containerTwo);
  preventativeMeasuresTitle.parent(containerThree);
  preventativeMeasuresLine.parent(containerThree);
  containerTwo.parent(containerAll);
  containerThree.parent(containerAll);



  //function to show and hide the info for each genocide step by hiding the column it is a part of
     function showHide (elt){

      if (flag == false){
      containerTwo.hide();
      containerThree.hide();
      button.hide();
      flag = true
    }

    else  {
  container.show();
  containerTwo.show();
  containerThree.show();
  flag = false;
     }
    }

  }
  }

//user examples
  //        var examplesRowOne = createElement('div', '');
  //       //  var examplesRowTwo = createElement('div', '');
  //        examplesRowOne.addClass('row')
  //        examplesRowOne.id('exampleHolder')
  //
  // //create elements to turn into columns for materialze grid
  //        var userContainer = createElement('div', ' ');
  //        var userContainerTwo = createElement('div', ' ');
  //        var userContainerThree = createElement('div', ' ');
  // //turn the p5 elements  into materialize columns by adding materialize col class and set each to 4 so that the three share a row total of 12
  //        userContainer.addClass("col s4");
  //        userContainerTwo.addClass("col s4");
  //        userContainerThree.addClass("col s4");
  //
  //        //give containers id (is this neccessary?)
  //        userContainer.id('containStage')
  //        userContainerTwo.id("containStageTwo");
  //        userContainerThree.id("containStageThree");

         //create a container to hold the 4 columns of genocide stages info






//form for creed

//selecting all the inputs to get values
var oneGrab = select('#one');
var twoGrab = select('#two');
var threeGrab = select('#three');
var emojiGrab = select('#emoji');
  // Get the analyze button
  var analyzeit = select('#analyze');
  analyzeit.mousePressed(example);


//get the values and create a js object to post
  function example() {
    //I think I need to read the source creed.json file into a string and then append that string Or do I do that in ther server.js file

var string = oneGrab.value() + twoGrab.value() + threeGrab.value() +emojiGrab.value();
    var params =  {string}

    // Post ! Using the directory created in the server.js file (can be named anything)
    httpPost('/creed', params,'json', dataposted);
    function dataposted(reply) {
      console.log(reply);
    }
  }
}




function showMe (data){
console.log(data);
  var selector = select('#slabtext');
for (var i = 0; i < data.length; i++) {
  var p = createElement('h1', data[i]);
  p.parent(selector)
}

}
