// TODO: Move the restart when small

// function Game(){
// 	this.guess = [];
// 	this.initial_arrow_height = function() {

// 	} 
// }

// Game.prototype.hotOrNot(){
// 	this.initial_arrow_height 
// }

()()

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

// #################### Game Code #################

	
// create random number between 1-100
var target_no = Math.floor(Math.random() * 100);

var guesses = [];

// main script
$(document).ready(function() {
	var currentGame = new Game();
	
	// get the initial height of the arrow in pixels
	var initial_arrow_height = parseInt($(".arrow").css("left"));

	//console.log(arrow_height_pixels);

	// get the height of the temperature bar
	console.log(getTempHeight());

	// ############# Restart Button ##################
	$("a").on('click', function() { 
		location.reload();
	});

	// ###### set default input & clear on focus ######
	$("input:text.guess_value").val("Enter 1-100");
	$("input:text.guess_value").on("focus", function() {
		$( this ).val("");
	});
	// ################################################


	// ##### on click or enter (bottom of page) #######
	$("button").click(function(){

		var guess = $("input").val(); 
		// why does this not work with other selectors?
		
		// reset the input
		$("input").val("");
		
		// validate guess
		if (validate(guess)) {
			
			// guess -> hot_or_not_function(guess) -> call move_arrow
			//									   -> get hot or not words  ???
			// arrow_height_pixels = move_arrow_vert(arrow_height_pixels, 100);
			// console.log(arrow_height_pixels);
			
			console.log("Target: " + target_no);
			hotOrNot(guess, initial_arrow_height);
			// how to not pass the initial arrow height down through the functions?
		}
		else {
			flash("Enter a number between 1 & 100!", "red");
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


// ################## Other functions ##############

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

function hotOrNot(guess, arrow_height) {
	// how to evaluate how far from the total number the guess is?

	var message = "";
	var color = "";
	var arrow_height;

	var difference = guess > target_no ? guess - target_no : target_no - guess;
	
	if (difference===0) { return win() }

	switch (true) {
		case (difference<=5): 
			message+="Burning Hot!";
			color = "#CF0418";
			arrow_height = 1;
			break;
		case (difference<=15): 
			message+="You're Hot!";
			color = "#E81919";
			arrow_height = 0.8;
			break;
		case (difference<=25): 
			message+="You're warm.";
			color = "#FF8080";
			arrow_height = 0.6;
			break;
		case (difference<=35): 
			message+="Pretty cool...";
			color = "#9966FF";
			arrow_height = 0.4;
			break;
		case (difference>35 && difference < 50): 
			message+="Too cool man!";
			color = "#AD85FF";
			arrow_height = 0.2;
			break;
		case (difference>50): 
			message+="Ice Cold!";
			color = "#C2A3FF";
			arrow_height = 0;
			break;
	}

	if (guess > target_no) { 
		message+=" Try lower...";
	}
	else {
		message+=" Go higher...";
	};

	// flash the message up.
	// How can we add a css selector 
	flash(message, color);

	// move arrow to position
	move_arrow_vert(arrow_height, arrow_height);

	return difference;

}

function move_arrow_vert(arrow_h, init_height) {
	// given that the arrow always start in the right spot.
	// what displacement do we have to give it?

	var position = getTempHeight();
	// left =
	var height = position * arrow_h;

	$(".arrow").css(
		{"left": height + init_height + "px"}
	);

};

function win() {
	// the win animation will take a callback that will 
	// effectively reset the page after the animation has 
	// completed
	winAnimation(function() {
		location.reload();
	});
}

function flash(message, color){
	// flashes the message in the area below the Guess Button
	// used for the hotOrNot messages and the invalid messages
	// not used for win
	var input = "<p class='flash'>" + message + ",</p>";
	color = color ? color : "black"; 
	$("button").after(input);
	$(".flash").css("color", color );
	$(".flash").hide().fadeIn();

	// if we hear a keypress or mouse click, disappear message
	// $(document).on('click', function() {
	// 	$(".flash").remove();
	// });

	// let's get this to fade in and out.
	window.setTimeout(function(){
		$(".flash").fadeOut(400, function() { 
			$( this ).remove();
		});
	}, 400);

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