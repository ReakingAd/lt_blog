<?php
	// header('Location:http://192.168.0.106:1130/downloads/test.zip');
	$file_name = 'test.zip';
	$file_dir = 'http://192.168.0.106:1130/downloads/test.zip';
	echo $file_dir . '<br />';

	if( file_exists('./downloads/test.zip') ){
		echo 'true';
	}
	else{
		echo 'false';
	}
?>