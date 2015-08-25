jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

// setInterval(rotate, 50); // pass rotate the name of the function, not the returned value

function go() {
	console.log("GO!")
}

var rotation=0

function rotate() {
	rotation+=50;
	$('.arrow').rotate(rotation);
}
	
$(document).ready(function(){
	rotate();
})
	
// create random number between 1-100
var target_no = Math.floor(Math.random() * 100);

//TODO:
$(document).ready(function() {

	// ###### set default input & clear on focus ######
	$("input:text.guess_value").val("Enter 1-100");
	$("input:text.guess_value").on("focus", function() {
		$( this ).val("");
	});
	// ################################################

	// on click or enter (bottom of page)
	$("button").click(function(){
		var guess = $("input").val(); // why does this not work with other selectors?
		// reset the input
		$("input").val("")
		// validate guess
		if (validate(guess)) {
			alert("valid");
			// Process stuff
		}
		else {
			alert("Enter a number between 1 & 100!")
			// TODO:
			//$("button").after("Between 1 & 100");  
			// would be cool to show this on the page under the button
			// then remove on next focus / click
		}
	});


	// trigger click event on guess input Enter
	$("input:text.guess_value").keypress(function(e) {
		if (e.which==13) {
			$("button").click();
		};
	});



});

function validate(input) {
	var entered = parseInt(input);
	if ((entered <= 100) && (entered > 0)) { 
	// will this be false in all non-number cases?
	// NaN will always return false here
		return true;
	}
	else {
		return false;
	}
}

	
	// validate guess
	// if guess is good,
			// check if it's the target -> if so, run the congratulations function.
		// work out it's proximity to the target
			// update the position of the arrow
			// remove a life from the lives bar
			//  
// after a guess, indicate whether it's hot or cold

// validate guesses that are real numbers between 1-100

// reset the game with the button

// store all of the guesses and check if any are a repeat
	// (fade in message text)

// button that provides the answer (after the first guess)

// do something creative when the user guesses the correct answer.