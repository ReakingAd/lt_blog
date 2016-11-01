
<form id="login" action="">
	<input type="text" name="username" value="aaa" />
	<input type="text" name="password" value="123" />
	<input class="login" type="button" value="login" />
</form>
<?php
$acc
$kk = '123';
$aa = '123';
echo $kk;
echo '<hr />';
echo md5($kk);
echo '<hr />';
echo md5(md5($aa));
if( md5($kk) === md5($aa)){
	echo 'yes';
}
?>
<script src="build/js/lt_libs.min.js"></script>
<script src="build/js/lt_global.min.js"></script>
<script src="build/js/lt_test.min.js"></script>
<script>
$(document).ready(function(){
	var kk = '123';
	console.log( hex_sha1(kk) )
	console.log( hex_md5(kk) )
	var aa = 123;
	console.log( hex_sha1(aa) )
	console.log( hex_md5(aa) )

	$('.login').on('click',function(){
		var username = $('input[name=username]').val();
		var password = hex_md5( $('input[name=password]').val() );
		var _data = {
			username:username,
			passowrd:password
		};
		console.log(_data);

		$.ajax({
			url:'index.php?r=site/test2',
			type:'post',
			dataType:'json',
			data:_data,
			// data:'aaa=1&bbb=aaaaa',
			success:function(data){
				console.log(1);
				console.log(data);
			}
		})
	});
});
</script>