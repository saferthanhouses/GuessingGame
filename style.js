
// Currently -- change to a more obj-oriented method
//			  - wrap globals in a function?

// TODO: Fix the restart
// TODO: Make the lives go down
// TODO: Fix temp arrow better
// Animate moving temp arrow
// Win Animation

// function Game(){
// 	this.guess = [];
// 	this.initial_arrow_height = function() {

// 	} 
// }

// Game.prototype.hotOrNot(){
// 	this.initial_arrow_height 
// }



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

var start_lives = 5;

// create random number between 1-100
var target_no = Math.round(Math.random() * 100);

var guesses = [];

// main script
$(document).ready(function() {
	var currentGame = new Game();
	
	// get the initial height of the arrow in pixels
	var initial_arrow_height = parseInt($(".arrow").css("left"));

	// how to get the inital height of the lives bar?
	var initial_lives_height = parseInt($(".lives2").css("height"));

	//console.log(arrow_height_pixels);

	// get the height of the temperature bar
	console.log(getTempHeight());

	// get the height of the lives bar
	console.log(getLivesHeight());

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
			
			console.log("Target: " + target_no);

			if (guesses.lastIndexOf(guess)==0) {
				flash("Number Guessed Already", "yellow");
			}
			else 
			{
				guesses.push(guess);
				hotOrNot(guess, initial_arrow_height);
				take_lives(initial_lives_height);;
			}
		}
		else 
		{
			flash("	Enter a number between 1 & 100!", "red");
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
	
	if (difference===0) { return win(arrow_height) }

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
		case (difference>=50): 
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

function win(init_height) {
	//TODO: Why is this lower than the other '1's	
	move_arrow_vert(1, init_height);

	// the win animation will take a callback that will 
	// effectively reset the page after the animation has 
	// completed
	winAnimation(function() {
		location.reload();
	});
};

function flash(message, color){
	// flashes the message in the area below the Guess Button
	// used for the hotOrNot messages and the invalid messages
	// not used for win
	var input = "<p class='flash'>" + message + "</p>";
	color = color ? color : "black"; 
	$("button").after(input);
	$(".flash").css("color", color );
	$(".flash").hide().fadeIn();

	// let's get this to fade in and out.
	window.setTimeout(function(){
		$(".flash").fadeOut(400, function() { 
			$( this ).remove();
		});
	}, 400);

};

function winAnimation(callback){
	// TODO: fancy animation for Win
	alert("You Win!")
	// assume the animation takes 2 seconds,
	// after two second reload the page
	window.setTimeout(callback, 2000);
};

function take_lives(lives_height) {
	// changes the height of the lives bar depending on
	// how many lives are remaining.
	var each_life_height = lives_height/start_lives;
	var new_height = each_life_height * (start_lives - guesses.length) + "px";
	console.log("lives height:" + new_height);
	// why is the css assignment not working?
	$("lives2").css("height", new_height);
};

function getLivesHeight() {
	return $(".lives2").height();	
};
