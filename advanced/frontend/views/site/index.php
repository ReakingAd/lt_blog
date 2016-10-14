<?php

/* @var $this yii\web\View */

$this->title = '春爬村上树';
?>
<div class="home-container">
	<ul>
		<li><a href="#">Linux 命令行</a></li>
		<li><a href="#">Gulp</a></li>
		<li><a href="#">Javascript中的函数</a></li>
		<li><a href="#">sublime插件</a></li>
		<li><a href="#">javascript中的糟粕</a></li>
	</ul>

</div>
<input type="text" readonly value="123" />
<style>
	.main-container{
		border:1px solid red;
		width:100%;
		height:100%;
	}
</style>

<script src="build/js/lt_libs.min.js"></script>
<script src="build/js/lt_global.min.js"></script>
<script src="build/js/lt_home.min.js"></script>
<script>
	var value = $('input').val();
	console.log(value)
</script>