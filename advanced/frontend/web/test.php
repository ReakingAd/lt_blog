<?php

echo '<br>';
function test(){
	$a = '123';
	echo $a;
	// var_dump($a);
	function inner($pp){
		echo 'inner';
		echo $pp;
	}
	inner($a);
}
test();

?>