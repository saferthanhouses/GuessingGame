jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

// $(document).ready(function() {
// 	setInterval(console.log("GO!"), 1000);
// });

setInterval(rotate, 1000);

function go() {
	console.log("GO!")
}

var rotation=0

function rotate() {
	rotation+=5
	$('.arrow').rotate(rotation);
}
