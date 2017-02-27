

/**
* Remove a heart of the life container
*/
var remove_heart = function() {

  var hearts_list = document.getElementById('the_health_container');
  var empty_heart_class = 'fa fa-heart-o';
  console.log('here I am');

}

/**
* Add a heart to the life container
*/
var add_heart = function() {

  var hearts_list = document.getElementById('the_health_container').getElementsByTagName('li');
  var heart_class = 'fa fa-heart';
  var length = hearts_list.length;
  var i = 0;

  for(i = 0; i <= length; i++){


  }//end for

}

//event listeners

//add heart
document.getElementById('add_heart').addEventListener("click", add_heart);

//remove heart
document.getElementById('remove_heart').addEventListener("click", remove_heart);
