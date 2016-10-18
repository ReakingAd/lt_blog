
$(document).ready(function(){
	var $container = $('.click');
	var count = 0;

	setInterval(function(){
		count++;
		$container.text(count);
	},10);
});