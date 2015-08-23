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
	rotation+=50
	$('.arrow').rotate(rotation);
}

$(document).ready(function(){ rotate() })

