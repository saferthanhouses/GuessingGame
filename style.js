// TODO: Fix Losing ...  

function Game(start_lives) {
	// game
	this.guesses = [];
	this.target_no = Math.round(Math.random() * 100);	// this will be different for each game, so best to keep in the instance
	this.start_lives = start_lives;

	// graphics
	this.initial_arrow_height = parseInt( $(".arrow").css("left") );
	this.lives_height = parseInt( $(".lives2").css("height") );
	this.temperature_height = parseInt( $(".temp_guage").css("height") );
	this.lives_increment = this.lives_height / this.start_lives;
}

// validate the guess 
Game.prototype.validate = function(input) {
	var entered = parseInt(input);
	if ((entered <= 100) && (entered > 0)) { 
		return true;
	}
	else {
		return false;
	}
}

// hot or not does what:
Game.prototype.hotOrNot = function(guess) {

	// initialize function variables
	var message = "";
	var color = "";
	var arrow_height;

	// how far off is the guess?
	var difference = guess > this.target_no ? guess - this.target_no : this.target_no - guess;
	
	// is it a winning guess?
	if (difference===0) { return this.win() } // no longer need to pass around arrow height.

	// assign variables depending on the difference
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

	// direction to go in
	if (guess > this.target_no) { 
		message+=" Try lower...";
	}
	else {
		message+=" Go higher...";
	};

	this.move_arrow(arrow_height);

	// Don't show the message if out of lives
	if (this.guesses.length == this.start_lives){
		return;
	}
	// flash the message up w appropriate color
	this.flash(message, color);

}

// Flashes message to the screen in given color.
Game.prototype.flash = function(message, color) {
	
	// string to insert
	var input = "<p class='flash'>" + message + "</p>";
	// if no color then black
	color = color ? color : "black"; 
	
	// insert, hide, then fadeIn to opaque
	$("button").after(input);
	$(".flash").css("color", color );
	$(".flash").hide().fadeIn();

	// fadeOut then remove 
	window.setTimeout(function(){
		$(".flash").fadeOut(400, function() { 
			$( this ).remove();
		});
	}, 400);
};

// move the arrow to the arrow_height proportion of the height of the bar
Game.prototype.move_arrow = function(arrow_height) {
	// new height of the arrow (proportion of bar) * 
	var new_height = arrow_height * this.temperature_height;

	// move the arrow to that height by adding the pixels to the arrow's original position
	$(".arrow").animate(
		{"left": new_height + this.initial_arrow_height + "px"}
	);
	// hmmmm. should be able to fix this positioning issue
	// at it's source...
};

// change height of lives bar depending how many guesses used
Game.prototype.take_lives = function() {	
	var new_height_str = this.lives_increment * (this.start_lives - this.guesses.length) + "px";
	$(".lives2").animate({"height": new_height_str});
	if (this.guesses.length == this.start_lives){
		this.lose();
	}
};


// win animation handler
Game.prototype.win = function() {
	this.winAnimation(function() {
		location.reload();
	});
};

// TODO: crazy animation goes here :)
Game.prototype.winAnimation = function(callback){
	alert("You Win!")
	this.move_arrow(1);
	window.setTimeout(callback, 2000);
};

// lose animation handler
Game.prototype.lose = function() {

	this.loseAnimation(function() {
		location.reload();
	});
};

// TODO: crazy animation goes here :)
Game.prototype.loseAnimation = function(callback) {
	alert("you lose sucker!")
	window.setTimeout(callback, 2000);
};
// ##############################################



// main script
$(document).ready(function() {

	// initalize instance of current game
	var currentGame = new Game(5);

	// print target for testing 
	console.log(currentGame.target_no);

	// Restart Button
	$("a").on('click', function() { 
		location.reload();
	});

	// Defaut input text and clear on focus
	$("input:text.guess_value").val("Enter 1-100"); 
	$("input:text.guess_value").on("focus", function() {
		$( this ).val("");
	});

	// trigger click event on 'Enter' to input guess
	$("input:text.guess_value").keypress(function(e) {
		if (e.which==13) {
			$("button").click();
		};
	});

	//  When 'Guess' button is clicked (or on 'Enter')
	$("button").click(function(){

		var guess = $("input").val(); 
		
		// reset the input
		$("input").val("");
		
		// validate guess
		if (currentGame.validate(guess)) 
		{
			
			// console.log("Target: " + target_no);

			// check it's not in guesses
			if (currentGame.guesses.lastIndexOf(guess)==0) 
			{
				currentGame.flash("Number Guessed Already", "yellow");
			}
			else 
			{
				currentGame.guesses.push(guess);
				currentGame.hotOrNot(guess);
				currentGame.take_lives();
			};
		}
		else 
		{
			currentGame.flash("	Enter a number between 1 & 100!", "red");
		}
	});
 });

