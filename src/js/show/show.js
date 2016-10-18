
$(document).ready(function(){
	var $container = $('.click');
	var count = 0;

	setInterval(function(){
		count++;
		$container.text(count);
	},10);

	// 编辑文章
	$('.btn-edit').on('click',function(){
		var _id = window.lt_show.id;
		
		window.location.href = 'index.php?r=post/create&id=' + _id;
	});
});