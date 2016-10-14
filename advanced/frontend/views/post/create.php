<?php
use yii\helpers\Html;
?>
Create a article here.
<form class="article-form" action="" method="post">
	<div class="form-group">
		<label for="">标题</label>
		<input class="article-title" name='title' type="text" value="title1" />
	</div>
	<div class="form-group">
		<label for="">内容</label>
		<textarea class="article-content" name="content" type="text" value="content11111111111111111111111"> </textarea>
	</div>
	<div class="form-group">
		<label for="">状态</label>
		<select class="article-status" name="status">
			<option value="1">发布</option>
			<option value="2">草稿</option>
			<option value="3">已存档</option>
		</select>
	</div>
	<input class="btn-submit" type="button" value="提交" />
</form>

<script src="build/js/lt_libs.min.js"></script>
<script src="build/js/lt_global.min.js"></script>
<script>
$(document).ready(function(){
	$('.btn-submit').on('click',function(){
		$.ajax({
			url:'index.php?r=post/save',
			type:'post',
			dataType:'json',
			data:$('.article-form input,.article-form select,.article-form textarea'),
			success:function(data){
				if(data.result === 'success'){
					window.location.href = 'index.php?r=post/index';
				}
				else{
					alert(data.result);
				}
			}
		})
	});
});
</script>