<?php
// echo 123;
	$secretJSON = file_get_contents('test.json');
	$secret = json_decode( $secretJSON );
	echo $secret -> user;
?>