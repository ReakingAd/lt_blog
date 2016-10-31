
<form id="login" action="">
	<input type="text" name="username" value="aaa" />
	<input type="text" name="password" value="111" />
	<input class="login" type="button" value="login" />
</form>
<script src="build/js/lt_libs.min.js"></script>
<script src="build/js/lt_global.min.js"></script>
<script>
$(document).ready(function(){
	$('.login').on('click',function(){
		$.ajax({
			url:'index.php?r=site/test2',
			type:'post',
			dataType:'json',
			data:$('input[name=username],input[name=password]'),
			// data:'aaa=1&bbb=aaaaa',
			success:function(data){
				console.log(1);
				console.log(data);
			}
		})
	});
});
</script>