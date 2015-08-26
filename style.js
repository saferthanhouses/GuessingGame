// TODO: Move the restart when small

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
	
// create random number between 1-100
var target_no = Math.floor(Math.random() * 100);


//TODO:
$(document).ready(function() {
	
	// get the initial height of the arrow in pixels
	var arrow_height_pixels = parseInt($(".arrow").css("left"));
	console.log(arrow_height_pixels);

	console.log(getTempHeight());



	// ###### set default input & clear on focus ######
	$("input:text.guess_value").val("Enter 1-100");
	$("input:text.guess_value").on("focus", function() {
		$( this ).val("");
	});
	// ################################################


	// on click or enter (bottom of page) #############
	$("button").click(function(){
		var guess = $("input").val(); // why does this not work with other selectors?
		// reset the input
		$("input").val("")
		// validate guess
		if (validate(guess)) {
			// get the height of the temp_guage
			// move the arrow based on the height of the temp guage
			// guess -> hot_or_not_function(guess) -> call move_arrow
			//									   -> get hot or not words  ???
			arrow_height_pixels = move_arrow_vert(arrow_height_pixels, 100);
			console.log(arrow_height_pixels);
			console.log("Target: " + target_no);
			hotOrNot(guess);
			// alert("valid");

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
	// #################################################



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

function getTempHeight() {
	return $(".temp_guage").height();
}

function hotOrNot(guess) {
	// how to evaluate how far from the total number the guess is?
	var difference = guess > target_no ? guess - target_no : target_no - guess;
	if (difference===0) { return win() }
	var message = "";
	switch (true) {
		case (difference<=5): 
			message+="Burning Hot!";
			break;
		case (difference<=15): 
			message+="You're Hot!";
			break;
		case (difference<=25): 
			message+="You're warm.";
			break;
		case (difference<=35): 
			message+="Pretty cool...";
			break;
		case (difference>35 && difference < 50): 
			message+="Too cool man!";
			break;
		case (difference>50): 
			message+="Ice Cold!";
			break;
	}
	if (guess > target_no) { 
		message+=" Try lower.";
	}
	else {
		message+=" Go higher.";
	}
	flash(message);

	return difference;

}

function move_arrow_vert(prev, number) {
	// need to set the zero value in pixels depending on the size of the browser
	// function to move the arrow to a height on the temp_guage
	// from 1-100
	// need to change this !!!! NEED THIS TO BE ABSOLUTE.
	// e.g. setArrowHeight(value)
	// this value comes out of a hot or not function.
	// make it a proportion of the height of the temp_guage.
	// how accurate do we want this to be?
	var next_height_px = number + prev;
	// how to: 
	// move with jquery?
	$(".arrow").css(
		{"left": next_height_px + "px"}
	);
	return next_height_px;
};

function win() {
	// the win animation will take a callback that will 
	// effectively reset the page after the animation has 
	// completed
	winAnimation(function() {
		location.reload();
	});
}

function flash(message){
	// flashes the message in the area below the Guess Button
	// used for the hotOrNot messages and the invalid messages
	// not used for win
	var input = "<p class='flash'>" + message + ",</p>"
	$("button").after(input);
	window.setTimeout(function(){ $(".flash").remove()}, 2000);

}

function winAnimation(callback){
	// TODO: fancy animation for Win
	alert("You Win!")
	// assume the animation takes 2 seconds,
	// after two second reload the page
	window.setTimeout(callback, 2000);
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