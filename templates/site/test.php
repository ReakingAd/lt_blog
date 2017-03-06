
<form id="login" action="">
	<input type="text" name="username" value="aaa" />
	<input type="text" name="password" value="123" />
	<input class="login" type="button" value="login" />
</form>
<button class="btn btn-default">click</button>
<script src="../build/js/lt_libs.min.js"></script>
<script src="../build/js/lt_global.min.js"></script>
<script src="../build/js/lt_test.min.js"></script>
<script>
$(document).ready(function(){
	$('.btn-default').on('click',function(){
		$.ajax({
			url:'http://10.2.48.3:8080/getweather?city=101010100&type=1',
			type:'get',
			dataType:'json',
			success:function(data){
				console.log(data)
			},
			error:function(err){
				console.log(err)
			}
		})
	})
});
</script>