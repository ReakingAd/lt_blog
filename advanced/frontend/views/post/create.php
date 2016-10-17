<?php
use yii\helpers\Html;
?>

<form class="article-form" action="" method="post">
	<div class="form-group">
		<label for="">标题</label>
		<input class="article-title" name='title' type="text" value="title1" />
	</div>
	<div class="form-group">
		<label for="">内容</label>
		<!-- <textarea class="article-content" name="content" type="text" value="content11111111111111111111111"> </textarea> -->
		<!-- demo -->
<div class="editor-container">
    <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
</div>
<!-- /demon -->
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
<script type="text/javascript" charset="utf-8" src="build/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="build/ueditor/ueditor.all.min.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="build/ueditor/lang/zh-cn/zh-cn.js"></script>
<script>
$(document).ready(function(){
	//实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('editor');
	$('.btn-submit').on('click',function(){
		var _title   = $('.article-title').val();
		var _content = UE.getEditor('editor').getContent();
		var _status  = $('.article-status').val();

		$.ajax({
			url:'index.php?r=post/save',
			type:'post',
			dataType:'json',
			data:'title=' + _title + '&content=' + _content + '&status=' +  _status,
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